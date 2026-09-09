import "dotenv/config";
import express from "express";
import cors from "cors";
import { participantsRouter } from "./routes/participants";
import { trainingsRouter } from "./routes/trainings";
import { certificatesRouter } from "./routes/certificates";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/participants", participantsRouter);
app.use("/api/trainings", trainingsRouter);
app.use("/api/certificates", certificatesRouter);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`Academy API listening on http://localhost:${PORT}`);
});
