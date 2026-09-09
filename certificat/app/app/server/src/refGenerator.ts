import { prisma } from "./db";

/**
 * Generates a unique sequential reference like "MAY-2026-0001".
 * The sequence is per-year, based on how many certificates already
 * exist for that year. Retries on collision (e.g. concurrent requests).
 */
export async function generateRef(issueDate: Date): Promise<string> {
  const year = issueDate.getFullYear();
  const prefix = `MAY-${year}-`;

  for (let attempt = 0; attempt < 5; attempt++) {
    const count = await prisma.certificate.count({
      where: { ref: { startsWith: prefix } },
    });
    const candidate = `${prefix}${String(count + 1 + attempt).padStart(4, "0")}`;
    const existing = await prisma.certificate.findUnique({ where: { ref: candidate } });
    if (!existing) return candidate;
  }

  throw new Error("Impossible de générer une référence unique, réessayez.");
}
