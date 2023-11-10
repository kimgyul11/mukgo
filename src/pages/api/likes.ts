import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/db";
import { LikeApiResponse, LikeInterface } from "@/interface";

interface ResponseType {
  page?: string;
  limit?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LikeInterface | LikeApiResponse>
) {
  const session = await getServerSession(req, res, authOptions); // 유저 정보를 가져오는 getServerSession
  //로그인된 계정이 없을때
  if (!session?.user) {
    return res.status(401);
  }
  //요청을 받는다.
  if (req.method === "POST") {
    const { storeId, store }: { storeId: number; store: any } = req.body;
    console.log(store);

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
      const userId: any = session.user.id;
      like = await prisma.like.create({
        data: {
          storeId,
          userId,
        },
      });
      return res.status(201).json(like);
    }
  } else {
    const count = await prisma.like.count({
      where: {
        userId: session.user.id,
      },
    }); //전체 페이지구하기 위한 카운트
    const { page = "1", limit = "5" }: ResponseType = req.query;
    const skipPage = parseInt(page) - 1;

    const likes = await prisma.like.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        userId: session.user.id,
      },
      include: {
        store: true,
      },
      skip: skipPage * parseInt(limit),
      take: parseInt(limit),
    });
    return res.status(200).json({
      data: likes,
      page: parseInt(page),
      totalPage: Math.ceil(count / parseInt(limit)),
    });
  }
}
