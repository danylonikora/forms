import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { uid } from "uid";

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (
    !username ||
    !password ||
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    res.status(400).json("Invalid combination of username and password.");
    return;
  }

  if (username.length > 20) {
    res.status(400).json("Username can not contain more than 20 characters.");
    return;
  }

  if (password.length > 24) {
    res.status(400).json("Password can not contain more than 24 characters.");
    return;
  }

  const user = { id: uid(24), username, password };
  await prisma.user.create({ data: user });
  res.json("User was successfully created.");
});

export default router;
