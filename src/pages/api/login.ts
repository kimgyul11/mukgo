import prisma from "@/db";
import * as bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

interface RequestBody {
  username: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body: RequestBody = req.body;

    // 유저가 있는지 확인
    const user = await prisma.user.findFirst({
      where: {
        email: body.username,
      },
    });
    console.log(user);
    if (user) {
      // Compare the passwords
      const passwordMatch = await bcrypt.compare(
        body.password,
        user.password as string
      );

      if (passwordMatch) {
        return res.status(200).json(user);
      }
    }

    return res.status(401).json(null);
  }
}
