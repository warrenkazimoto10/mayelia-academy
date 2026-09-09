import { Router } from "express";
import { prisma } from "../db";

export const participantsRouter = Router();

participantsRouter.get("/", async (req, res) => {
  const q = (req.query.q as string | undefined)?.trim();
  const participants = await prisma.participant.findMany({
    where: q ? { fullName: { contains: q } } : undefined,
    orderBy: { fullName: "asc" },
    include: { _count: { select: { certificates: true } } },
  });
  res.json(participants);
});

participantsRouter.post("/", async (req, res) => {
  const { civility, fullName } = req.body;
  if (!fullName || !String(fullName).trim()) {
    return res.status(400).json({ error: "fullName est requis" });
  }
  const participant = await prisma.participant.create({
    data: { civility: civility || "M.", fullName: String(fullName).trim() },
  });
  res.status(201).json(participant);
});

participantsRouter.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { civility, fullName } = req.body;
  const participant = await prisma.participant.update({
    where: { id },
    data: {
      ...(civility !== undefined ? { civility } : {}),
      ...(fullName !== undefined ? { fullName: String(fullName).trim() } : {}),
    },
  });
  res.json(participant);
});

participantsRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.participant.delete({ where: { id } });
  res.status(204).end();
});
