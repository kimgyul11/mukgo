import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions); // 유저 정보를 가져오는 getServerSession
  //로그인된 계정이 없을때
  if (!session?.user) {
    return res.status(401);
  }
  //요청을 받는다.
  if (req.method === "POST") {
    const { storeId }: { storeId: number } = req.body;

    //Like 데이터를 확인 - 하나의 like는 하나의 유저만 갖기때문에 findFirst
    let like = await prisma.like.findFirst({
      where: { storeId, userId: session?.user?.id },
    });
    //like가 이미 있다면 삭제
    if (like) {
      like = await prisma.like.delete({
        where: {
          id: like.id,
        },
      });
      return res.status(204).json(like);
    } else {
      //like의 추가
      like = await prisma.like.create({
        data: {
          storeId,
          userId: session?.user?.id,
        },
      });
      return res.status(201).json(like);
    }

    //like가 없다면 추가
  }
}
