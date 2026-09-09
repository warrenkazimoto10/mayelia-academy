import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb, RGB } from "pdf-lib";
import * as fs from "fs";
import * as path from "path";
import * as QRCode from "qrcode";
import { formatFrenchDate, formatPeriod } from "./dateUtils";

const BG_PATH = path.join(__dirname, "..", "assets", "certificate-bg.png");
let cachedBgBytes: Buffer | null = null;
function getBgBytes(): Buffer {
  if (!cachedBgBytes) cachedBgBytes = fs.readFileSync(BG_PATH);
  return cachedBgBytes;
}

// Page size matches the original A4-landscape template (11.69271in x 8.26736in).
const PAGE_WIDTH = 11.69271 * 72;
const PAGE_HEIGHT = 8.26736 * 72;
const IN = 72;

const BLACK = rgb(0, 0, 0);
const REF_BLUE = rgb(8 / 255, 79 / 255, 106 / 255);

interface Box {
  x: number; // inches from left
  y: number; // inches from top
  w: number; // inches
  h: number; // inches
}

// Coordinates extracted from the original certificate template (ODP source).
const INTRO_BOX: Box = { x: 3.8151, y: 2.675, w: 4.0625, h: 0.40391 };
const NAME_BOX: Box = { x: 3.04635, y: 3.4375, w: 5.67865, h: 0.70684 };
const FORMATION_BOX: Box = { x: 1.9875, y: 4.425, w: 7.8, h: 1.00977 };
const DATE_BOX: Box = { x: 4.05, y: 5.6375, w: 3.525, h: 0.40391 };
const REF_BOX: Box = { x: 3.3151, y: 6.57778, w: 3.525, h: 0.37025 };

function boxLeftPt(box: Box) {
  return box.x * IN;
}
function boxCenterXPt(box: Box) {
  return (box.x + box.w / 2) * IN;
}
function boxCenterYPt(box: Box) {
  // svg:y is measured from the top of the page; PDF y is measured from the bottom.
  return PAGE_HEIGHT - (box.y + box.h / 2) * IN;
}
function boxWidthPt(box: Box) {
  return box.w * IN;
}

interface Token {
  text: string;
  font: PDFFont;
  size: number;
  color: RGB;
  width: number;
}

function tokenize(
  segments: { text: string; font: PDFFont; size: number; color: RGB }[]
): Token[] {
  const tokens: Token[] = [];
  for (const seg of segments) {
    for (const word of seg.text.split(/\s+/).filter(Boolean)) {
      tokens.push({
        text: word,
        font: seg.font,
        size: seg.size,
        color: seg.color,
        width: seg.font.widthOfTextAtSize(word, seg.size),
      });
    }
  }
  return tokens;
}

function spaceWidthOf(token: Token) {
  return token.font.widthOfTextAtSize(" ", token.size);
}

function wrapTokens(tokens: Token[], maxWidthPt: number): Token[][] {
  const lines: Token[][] = [];
  let current: Token[] = [];
  let currentWidth = 0;
  for (const token of tokens) {
    const sw = current.length > 0 ? spaceWidthOf(current[current.length - 1]) : 0;
    if (current.length > 0 && currentWidth + sw + token.width > maxWidthPt) {
      lines.push(current);
      current = [];
      currentWidth = 0;
    }
    currentWidth += (current.length > 0 ? spaceWidthOf(token) : 0) + token.width;
    current.push(token);
  }
  if (current.length > 0) lines.push(current);
  return lines;
}

function lineWidth(line: Token[]) {
  let w = 0;
  for (let i = 0; i < line.length; i++) {
    if (i > 0) w += spaceWidthOf(line[i]);
    w += line[i].width;
  }
  return w;
}

function drawLine(page: PDFPage, line: Token[], centerXPt: number, baselineYPt: number) {
  const w = lineWidth(line);
  let x = centerXPt - w / 2;
  for (const token of line) {
    page.drawText(token.text, { x, y: baselineYPt, size: token.size, font: token.font, color: token.color });
    x += token.width + spaceWidthOf(token);
  }
}

function drawCenteredBlock(
  page: PDFPage,
  lines: Token[][],
  centerXPt: number,
  centerYPt: number,
  lineHeightPt: number
) {
  const blockHeight = lines.length * lineHeightPt;
  let baselineY = centerYPt + blockHeight / 2 - lineHeightPt * 0.78;
  for (const line of lines) {
    drawLine(page, line, centerXPt, baselineY);
    baselineY -= lineHeightPt;
  }
}

export interface CertificateData {
  civility: string;
  fullName: string;
  trainingTitle: string;
  periodStart: Date;
  periodEnd: Date;
  issuePlace: string;
  issueDate: Date;
  ref: string;
  verifyUrl: string;
}

export async function generateCertificatePdf(data: CertificateData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

  const bgImage = await pdfDoc.embedPng(getBgBytes());
  page.drawImage(bgImage, { x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT });

  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // --- Intro line (static) ---
  const introTokens = tokenize([
    { text: "Le présent document atteste que", font: regular, size: 18, color: BLACK },
  ]);
  drawCenteredBlock(page, [introTokens], boxCenterXPt(INTRO_BOX), boxCenterYPt(INTRO_BOX), 22);

  // --- Name (auto-wraps to 2 lines if too long, same font size) ---
  const nameText = `${data.civility} ${data.fullName.toUpperCase()}`;
  const nameTokens = tokenize([{ text: nameText, font: bold, size: 28, color: BLACK }]);
  const nameMaxWidth = boxWidthPt(NAME_BOX);
  let nameLines = wrapTokens(nameTokens, nameMaxWidth);
  if (nameLines.length > 2) {
    // Extremely long names: fall back to a smaller size to keep at most 2 lines.
    const smallerTokens = tokenize([{ text: nameText, font: bold, size: 22, color: BLACK }]);
    nameLines = wrapTokens(smallerTokens, nameMaxWidth);
  }
  drawCenteredBlock(page, nameLines, boxCenterXPt(NAME_BOX), boxCenterYPt(NAME_BOX), 34);

  // --- Formation sentence + period (two stacked, centered lines/blocks) ---
  const formationTokens = tokenize([
    { text: "a suivi avec succès la formation intitulée", font: regular, size: 18, color: BLACK },
    { text: data.trainingTitle, font: bold, size: 18, color: BLACK },
  ]);
  const formationLines = wrapTokens(formationTokens, boxWidthPt(FORMATION_BOX));

  const periodTokens = tokenize([
    {
      text: `dans la période du ${formatPeriod(data.periodStart, data.periodEnd)}.`,
      font: regular,
      size: 18,
      color: BLACK,
    },
  ]);

  const allLines = [...formationLines, periodTokens];
  drawCenteredBlock(page, allLines, boxCenterXPt(FORMATION_BOX), boxCenterYPt(FORMATION_BOX), 24);

  // --- Issue date ---
  const dateTokens = tokenize([
    {
      text: `Fait à ${data.issuePlace}, le ${formatFrenchDate(data.issueDate)}.`,
      font: regular,
      size: 18,
      color: BLACK,
    },
  ]);
  drawCenteredBlock(page, [dateTokens], boxCenterXPt(DATE_BOX), boxCenterYPt(DATE_BOX), 22);

  // --- REF line ---
  const refTokens = tokenize([
    { text: `REF : ${data.ref}`, font: regular, size: 16, color: REF_BLUE },
  ]);
  drawCenteredBlock(page, [refTokens], boxCenterXPt(REF_BOX), boxCenterYPt(REF_BOX), 20);

  // --- QR code, placed immediately to the left of the REF box ---
  const qrSize = 42;
  const qrGap = 14;
  const qrDataUrl = await QRCode.toDataURL(data.verifyUrl, { margin: 0, width: 256 });
  const qrPngBytes = Buffer.from(qrDataUrl.split(",")[1], "base64");
  const qrImage = await pdfDoc.embedPng(qrPngBytes);
  const qrX = boxLeftPt(REF_BOX) - qrGap - qrSize;
  const qrY = boxCenterYPt(REF_BOX) - qrSize / 2;
  page.drawImage(qrImage, { x: qrX, y: qrY, width: qrSize, height: qrSize });

  return pdfDoc.save();
}
