import { Router } from "express";
import archiver from "archiver";
import { prisma } from "../db";
import { generateRef } from "../refGenerator";
import { generateCertificatePdf } from "../certificatePdf";

export const certificatesRouter = Router();

const PUBLIC_BASE_URL = process.env.CERT_PUBLIC_BASE_URL || "http://localhost:5173";

function verifyUrlFor(ref: string) {
  return `${PUBLIC_BASE_URL}/verify/${encodeURIComponent(ref)}`;
}

function safeFileName(name: string) {
  return name.replace(/[^a-z0-9-_]+/gi, "_");
}

certificatesRouter.get("/", async (req, res) => {
  const trainingId = req.query.trainingId ? Number(req.query.trainingId) : undefined;
  const participantId = req.query.participantId ? Number(req.query.participantId) : undefined;
  const certificates = await prisma.certificate.findMany({
    where: {
      ...(trainingId ? { trainingId } : {}),
      ...(participantId ? { participantId } : {}),
    },
    include: { participant: true, training: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(certificates);
});

certificatesRouter.get("/verify/:ref", async (req, res) => {
  const certificate = await prisma.certificate.findUnique({
    where: { ref: req.params.ref },
    include: { participant: true, training: true },
  });
  if (!certificate) return res.status(404).json({ error: "Certificat introuvable" });
  res.json(certificate);
});

async function createCertificate(participantId: number, trainingId: number) {
  const existing = await prisma.certificate.findUnique({
    where: { participantId_trainingId: { participantId, trainingId } },
  });
  if (existing) return existing;

  const training = await prisma.training.findUnique({ where: { id: trainingId } });
  if (!training) throw new Error("Formation introuvable");

  const ref = await generateRef(training.issueDate);
  return prisma.certificate.create({ data: { participantId, trainingId, ref } });
}

certificatesRouter.post("/", async (req, res) => {
  const { participantId, trainingId } = req.body;
  if (!participantId || !trainingId) {
    return res.status(400).json({ error: "participantId et trainingId sont requis" });
  }
  try {
    const certificate = await createCertificate(Number(participantId), Number(trainingId));
    res.status(201).json(certificate);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

certificatesRouter.post("/bulk", async (req, res) => {
  const { trainingId, participantIds } = req.body;
  if (!trainingId || !Array.isArray(participantIds) || participantIds.length === 0) {
    return res.status(400).json({ error: "trainingId et participantIds[] sont requis" });
  }
  const results = [];
  for (const pid of participantIds) {
    try {
      results.push(await createCertificate(Number(pid), Number(trainingId)));
    } catch (err: any) {
      results.push({ participantId: pid, error: err.message });
    }
  }
  res.status(201).json(results);
});

certificatesRouter.delete("/:id", async (req, res) => {
  await prisma.certificate.delete({ where: { id: Number(req.params.id) } });
  res.status(204).end();
});

async function buildPdfForCertificateId(id: number) {
  const certificate = await prisma.certificate.findUnique({
    where: { id },
    include: { participant: true, training: true },
  });
  if (!certificate) return null;

  const pdfBytes = await generateCertificatePdf({
    civility: certificate.participant.civility,
    fullName: certificate.participant.fullName,
    trainingTitle: certificate.training.title,
    periodStart: certificate.training.startDate,
    periodEnd: certificate.training.endDate,
    issuePlace: certificate.training.issuePlace,
    issueDate: certificate.training.issueDate,
    ref: certificate.ref,
    verifyUrl: verifyUrlFor(certificate.ref),
  });
  return { certificate, pdfBytes };
}

certificatesRouter.get("/:id/pdf", async (req, res) => {
  const result = await buildPdfForCertificateId(Number(req.params.id));
  if (!result) return res.status(404).json({ error: "Certificat introuvable" });
  const fileName = `Certificat_${safeFileName(result.certificate.participant.fullName)}_${result.certificate.ref}.pdf`;
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename="${fileName}"`);
  res.send(Buffer.from(result.pdfBytes));
});

certificatesRouter.get("/training/:trainingId/zip", async (req, res) => {
  const trainingId = Number(req.params.trainingId);
  const certificates = await prisma.certificate.findMany({
    where: { trainingId },
    include: { participant: true, training: true },
  });
  if (certificates.length === 0) {
    return res.status(404).json({ error: "Aucun certificat pour cette formation" });
  }

  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", `attachment; filename="certificats_formation_${trainingId}.zip"`);

  const archive = archiver("zip");
  archive.pipe(res);

  for (const certificate of certificates) {
    const pdfBytes = await generateCertificatePdf({
      civility: certificate.participant.civility,
      fullName: certificate.participant.fullName,
      trainingTitle: certificate.training.title,
      periodStart: certificate.training.startDate,
      periodEnd: certificate.training.endDate,
      issuePlace: certificate.training.issuePlace,
      issueDate: certificate.training.issueDate,
      ref: certificate.ref,
      verifyUrl: verifyUrlFor(certificate.ref),
    });
    const fileName = `${safeFileName(certificate.participant.fullName)}_${certificate.ref}.pdf`;
    archive.append(Buffer.from(pdfBytes), { name: fileName });
  }

  await archive.finalize();
});
