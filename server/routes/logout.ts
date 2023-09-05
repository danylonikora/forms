import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const sid = req.cookies?.sid;

  if (!sid) {
    res.status(401).send("Session cookie is not found.");
    return;
  }

  const session = await prisma.session.findUnique({
    where: { id: sid },
  });

  if (!session) {
    res.status(500).send("Session is not found.");
    return;
  }

  await prisma.session.delete({ where: { id: sid } });
  res.send("Loged out.");
});

export default router;
