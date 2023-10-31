import type { NextApiRequest, NextApiResponse } from "next";
import { StoreApiResponse, StoreType } from "@/interface";
import { PrismaClient } from "@prisma/client";

interface ResponseType {
  page?: string;
  limit?: string;
  q?: string;
  district?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreType[] | StoreType>
) {
  const { page = "", limit = "", q, district }: ResponseType = req.query;
  const prisma = new PrismaClient();

  //page여부에 따라 전체 데이터를 가져와야하는지, 10개씩 가져와야하는지 확인
  if (page) {
    const skipPage = parseInt(page) - 1;
    const count = await prisma.store.count();
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      where: {
        name: q ? { contains: q } : {},
        address: district ? { contains: district } : {},
      },
      take: parseInt(limit),
      skip: skipPage * 10,
    });
    res.status(200).json({
      page: parseInt(page),
      data: stores,
      totalCount: count,
      totalPage: Math.ceil(count / 10),
    });
  } else {
    const { id }: { id?: string } = req.query;
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      where: {
        id: id ? parseInt(id) : {},
      },
    });
    return res.status(200).json(id ? stores[0] : stores);
  }
}
