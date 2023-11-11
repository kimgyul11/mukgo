/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { KakaoStoreType } from "@/interface";
import axios from "axios";
import Loader from "@/components/Loader";
import React from "react";
import Map from "@/components/Map";
import Marker from "@/components/Maker";
import Comments from "@/components/comments";
import PostContent from "@/components/post/PostContent";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authorState } from "@/atom";

export default function StoreDetailPage() {
  const map = useRecoilValue;
  const router = useRouter();
  const { id } = router.query;
  const setAuthor = useSetRecoilState(authorState);
  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${id}`);
    return data as KakaoStoreType;
  };

  const {
    data: store,
    isFetching,
    isSuccess,
    isError,
  } = useQuery(`store-${id}`, fetchStore, {
    enabled: !!id, //id만 있는 경우에만 쿼리를 날리도록만드는 옵션
    refetchOnWindowFocus: false, //윈도우를 나갔다 들어올때마다 리페칭되는걸 막아줌
  });
  setAuthor(store?.userId as number);
  if (isError) {
    return (
      <div className="flex justify-center items-center w-full h-screen mt-[-52px] text-red-600 flex-col ">
        <p>문제가 발생했습니다!</p>
        <button>다시시도</button>
      </div>
    );
  }
  if (isFetching) {
    return <Loader className="mt-[20%]" />;
  }

  return (
    <>
      <PostContent store={store} />
      {isSuccess && (
        <>
          <div className="w-full mb-20 max-w-5xl h-[350px] mx-auto ">
            <Map lat={store?.lat} lng={store.lng} zoom={1} />
            <Marker map={map} store={store} />
          </div>
        </>
      )}
      <Comments storeId={store?.id} />
    </>
  );
}
