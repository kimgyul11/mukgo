import Loading from "@/components/Loading";
import Pagenation from "@/components/Pagenation";
import StoreList from "@/components/StoreListBox";
import { LikeApiResponse, LikeInterface } from "@/interface";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

export default function LikesPage() {
  const router = useRouter();
  const { page = "1" }: any = router.query;
  //좋아요한 가게를 가져오는 함수
  const fetchLikes = async () => {
    const { data } = await axios(`/api/likes?limit=5&page=${page}`);
    return data as LikeApiResponse;
  };

  const { data: likes, isLoading } = useQuery(`likes-${page}`, fetchLikes);

  return (
    <div className="px-4 md:max-w-5xl mx-auto py-8">
      <h3 className="text-lg font-semibold">좋아요한 가게</h3>
      <div className="mt-1 text-gray-500 text-sm">리스트를 표시</div>
      <ul role="list" className="divide-y divide-gray-100 mt-10">
        {isLoading ? (
          <Loading />
        ) : (
          likes?.data.map((like: LikeInterface, index) => (
            <StoreList i={index} store={like.store} key={index} />
          ))
        )}
      </ul>
      {likes?.totalPage && likes?.totalPage > 0 && (
        <Pagenation
          total={likes?.totalPage}
          page={page}
          pathname="/users/likes"
        />
      )}
    </div>
  );
}
