import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function sessionMiddleware(req: Request, res: Response, next: NextFunction) {
  const { path } = req;

  switch (path) {
    case "/signup":
    case "/login":
    case "/logout":
      next();
      return;
  }

  const sid = req.cookies?.sid;

  if (!sid) {
    res.status(401).send("Need to log in firstly.");
    return;
  }

  const session = await prisma.session.findUnique({ where: { id: sid } });
  if (!session) {
    res.status(401).send("You need to log in.");
    return;
  }

  if (session.expires.getTime() <= new Date().getTime()) {
    res.status(401).send("Your session is expired, relogin.");
    return;
  }

  next();
}
