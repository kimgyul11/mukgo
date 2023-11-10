import type { NextApiRequest, NextApiResponse } from "next";
import { KakaoStoreType, StoreApiResponse, StoreType } from "@/interface";
import prisma from "@/db";
import axios from "axios";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

interface ResponseType {
  page?: string;
  limit?: string;
  q?: string;
  district?: string;
  id?: string;
  user?: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreType[] | StoreType | null>
) {
  const {
    page = "",
    limit = "",
    q,
    district,
    id,
    user = false,
  }: ResponseType = req.query;
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    //Post요청
    //1.변수 선언
    const formData = req.body; //new컴포넌트에서 작성해서 보낸 input data
    // const headers = {
    //   Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`, //주소 API로 받은 주소로 위도 경도를 얻기 위해필요한 헤더정보
    // };
    // //2.axios로 get요청 주소를 보내서 위도,경도 가져옴
    // const { data } = await axios.get(
    //   `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
    //     formData.address
    //   )}`,
    //   { headers }
    // );
    //form data =phone , place_name,category_name , place_url id=fromID,content,star
    const result = await prisma.post.create({
      data: { ...formData, userId: session?.user.id },
    });
    return res.status(200).json(result);
  } else if (req.method === "PUT") {
    //데이터 수정을 처리한다.
    const formData = req.body; //new컴포넌트에서 작성해서 보낸 input data
    const headers = {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`, //주소 API로 받은 주소로 위도 경도를 얻기 위해필요한 헤더정보
    };
    //2.axios로 get요청 주소를 보내서 위도,경도 가져옴
    const { data } = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
        formData.address
      )}`,
      { headers }
    );

    const result = await prisma.store.update({
      where: { id: formData.id },
      data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
    });
    return res.status(200).json(result);
  } else if (req.method === "DELETE") {
    //데이터 삭제
    if (id) {
      const result = await prisma.post.delete({
        where: { id: parseInt(id) },
      });
      return res.status(200).json(result);
    }
    return res.status(500).json(null);
  } else {
    //Get요청
    //page여부에 따라 전체 데이터를 가져와야하는지, 10개씩 가져와야하는지 확인
    if (page) {
      //주소가 있는지,쿼리가 있는지에 따라 조건부 렌더링
      const skipPage = parseInt(page) - 1;
      const count = await prisma.post.count();
      const stores = await prisma.post.findMany({
        orderBy: { id: "asc" },
        where: {
          place_name: q ? { contains: q } : {},
          road_address_name: district ? { contains: district } : {},
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
      //로그인이 되어있는지 값을 가져옴
      const { id }: { id?: string } = req.query; //3

      const stores = await prisma.post.findMany({
        orderBy: { id: "asc" },
        where: {
          id: id ? parseInt(id) : {},
          userId: user ? session?.user.id : {},
        },
        include: {
          likes: {
            where: session ? { userId: session.user.id } : {},
          },
          user: true,
        },
      });

      return res.status(200).json(id ? stores[0] : stores);
    }
  }
}
