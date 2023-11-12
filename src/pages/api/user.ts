import type { NextApiRequest, NextApiResponse } from "next";
import { KakaoStoreType, StoreApiResponse, StoreType } from "@/interface";
import prisma from "@/db";
import * as bcrypt from "bcrypt";
import axios from "axios";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const body = req.body;
    console.log(body);
    const check = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (check) {
      return res
        .status(400)
        .json({ errorMessage: "Email is associated with another account" });
    } else {
      const result = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: await bcrypt.hash(body.password, 10),
        },
      });
      return res.status(200).json(result);
    }
  }
}
