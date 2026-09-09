import { Router } from "express";
import { prisma } from "../db";

export const trainingsRouter = Router();

trainingsRouter.get("/", async (req, res) => {
  const trainings = await prisma.training.findMany({
    orderBy: { startDate: "desc" },
    include: { _count: { select: { certificates: true } } },
  });
  res.json(trainings);
});

trainingsRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const training = await prisma.training.findUnique({
    where: { id },
    include: { certificates: { include: { participant: true } } },
  });
  if (!training) return res.status(404).json({ error: "Formation introuvable" });
  res.json(training);
});

trainingsRouter.post("/", async (req, res) => {
  const { title, client, startDate, endDate, issuePlace, issueDate } = req.body;
  if (!title || !startDate || !endDate || !issueDate) {
    return res.status(400).json({ error: "title, startDate, endDate et issueDate sont requis" });
  }
  const training = await prisma.training.create({
    data: {
      title: String(title).trim(),
      client: client ? String(client).trim() : null,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      issuePlace: issuePlace ? String(issuePlace).trim() : "Abidjan",
      issueDate: new Date(issueDate),
    },
  });
  res.status(201).json(training);
});

trainingsRouter.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { title, client, startDate, endDate, issuePlace, issueDate } = req.body;
  const training = await prisma.training.update({
    where: { id },
    data: {
      ...(title !== undefined ? { title: String(title).trim() } : {}),
      ...(client !== undefined ? { client: client ? String(client).trim() : null } : {}),
      ...(startDate !== undefined ? { startDate: new Date(startDate) } : {}),
      ...(endDate !== undefined ? { endDate: new Date(endDate) } : {}),
      ...(issuePlace !== undefined ? { issuePlace: String(issuePlace).trim() } : {}),
      ...(issueDate !== undefined ? { issueDate: new Date(issueDate) } : {}),
    },
  });
  res.json(training);
});

trainingsRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.training.delete({ where: { id } });
  res.status(204).end();
});
