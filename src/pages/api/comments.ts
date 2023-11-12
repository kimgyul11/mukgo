import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/db";
import {
  CommentApiResponse,
  CommentInterface,
  ReplyInterface,
} from "@/interface";

interface ResponseType {
  id?: string;
  page?: string;
  limit?: string;
  storeId?: string;
  user?: boolean;
  commentId?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    CommentInterface | CommentApiResponse | ReplyInterface[] | any
  >
) {
  const session = await getServerSession(req, res, authOptions);
  const {
    id = "",
    page = "1",
    limit = "10",
    storeId = "",
    user = false,
    commentId = "",
  }: ResponseType = req.query;

  if (req.method === "POST") {
    //1.유저있는지 확인
    if (!session?.user) {
      return res.status(401);
    }

    const userId: any = session.user.id;
    const {
      commentId,
      body,
      storeId,
    }: { commentId: number; body: string; storeId: number } = req.body;
    console.log(storeId, commentId, body, userId);

    //2.commentId가 있다면 reply
    if (commentId) {
      const result = await prisma.reply.create({
        data: {
          commentId,
          body,
          userId,
        },
      });
      return res.status(200).json(result);
    } else {
      //3.commentID가 없으면 post 답글작성
      // const { storeId, body }: { storeId: number; body: string } = req.body;
      const comment = await prisma.comment.create({
        data: {
          storeId,
          body,
          userId,
        },
      });
      return res.status(200).json(comment);
    }
  } else if (req.method === "DELETE") {
    //댓글 삭제
    if (!session?.user) {
      return res.status(401);
    }
    const result = await prisma.comment.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json(result);
  } else {
    //CommentList요청
    const skipPage = parseInt(page) - 1; //처음 시작 페이지가 1이므로 첫 번째 페이지가 스킵되지 않게하려고 -1을 한다.

    //1.총 댓글 수 가져오기
    const count = await prisma.comment.count({
      where: {
        storeId: storeId ? parseInt(storeId) : {},
        userId: user ? session?.user.id : {},
      },
    });
    //2.댓글 가져오기
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        storeId: storeId ? parseInt(storeId) : {},
        userId: user ? session?.user.id : {},
      },
      skip: skipPage * parseInt(limit),
      take: parseInt(limit),
      include: {
        user: true,
        store: true,
        replies: { include: { user: true } },
      },
    });

    return res.status(200).json({
      data: comments,
      page: parseInt(page),
      totalPage: Math.ceil(count / parseInt(limit)),
    });
  }
}
