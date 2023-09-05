import express from "express";
import { PrismaClient } from "@prisma/client";
import { uid } from "uid";

import type { TFormElement } from "../../common/types";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { username, form } = req.body;

  if (!username) {
    res.status(400).json("Username is not provided.");
    return;
  }

  if (!form) {
    res.status(400).json("Form object is not provided.");
    return;
  }

  if (!(form instanceof Object)) {
    res.status(400).json("Form field has to be object.");
    return;
  }

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    res.status(400).json("Such user is not found.");
    return;
  }

  await prisma.form.create({
    data: {
      id: uid(24),
      title: form.title,
      user_id: user.id,
      elements: {
        create: form.elements.map((el: TFormElement) => {
          return {
            id: uid(24),
            question: el.question,
            type: el.type,
            answer_variants:
              el.type !== "text_field"
                ? {
                    create: el.variants.map((variant) => {
                      return {
                        id: uid(24),
                        text: variant,
                      };
                    }),
                  }
                : { create: [] },
          };
        }),
      },
    },
  });

  res.json("Form created.");
});

router.get("/", async (req, res) => {
  const sid = req.cookies.sid;
  const session = await prisma.session.findUnique({ where: { id: sid } });

  if (!session) {
    res.status(400).json("User is not found.");
    return;
  }

  const forms = await prisma.form.findMany({
    where: { user_id: session.user_id },
    include: {
      elements: {
        include: {
          answer_variants: true,
        },
      },
    },
  });

  res.json({ forms });
});

export default router;
