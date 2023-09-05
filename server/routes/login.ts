import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { uid } from "uid";

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res
      .status(400)
      .json("This combination of username and password is invalid.");
    return;
  }
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    res.status(400).json("User with such username is not found.");
    return;
  }

  if (user.password !== password) {
    res.status(400).json("Wrong password.");
    return;
  }

  const sid = uid(24);
  // expires after 7 days
  const cookieExpires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  await prisma.session.create({
    data: {
      id: sid,
      user_id: user.id,
      expires: cookieExpires,
    },
  });

  res.cookie("sid", sid, {
    expires: cookieExpires,
    sameSite: "none",
    secure: true,
  });
  res.json("Authorized.");
});

export default router;
