import { searchState } from "@/atom";
import Loader from "@/components/Loader";
import Loading from "@/components/Loading";
import Pagenation from "@/components/Pagenation";
import SearchFilter from "@/components/SearchFilter";
import StoreList from "@/components/StoreListBox";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { KakaoStoreType, StoreApiResponse, StoreType } from "@/interface";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { useInfiniteQuery, useQuery } from "react-query";
import { useRecoilValue } from "recoil";

export default function StoreListPage() {
  const router = useRouter();
  const { page = "1" }: any = router.query;
  const ref = useRef<HTMLDivElement | null>(null); //타겟을 지정하기 위한 useRef
  const pageRef = useIntersectionObserver(ref, {}); //io훅을 통해서 entry를 받아온다.
  const isPageEnd = !!pageRef?.isIntersecting; // 페이지의 끝인지 확인 - inintersecting:교차상태인지 아닌지 Boolean값으로 반환해줌
  const searchValue = useRecoilValue(searchState);

  //atom값이 변경되면 atom을 참조하는 컴포넌트들의 리렌더링이 발생 -> API요청
  const searchParams = {
    q: searchValue?.q,
    district: searchValue?.district,
    starScore: searchValue?.starScore,
  };

  const fetchStores = async ({ pageParam = 1 }) => {
    //페이지가 시작될 값
    const { data } = await axios("/api/stores?page=" + pageParam, {
      params: {
        limit: 10,
        page: pageParam,
        ...searchParams,
      },
    });
    return data;
  };

  const {
    data: stores,
    isLoading,
    isError,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(["stores", searchParams], fetchStores, {
    getNextPageParam: (lastPage: any) =>
      lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 500);
      // fetchNextPage();
    }
    return () => clearTimeout(timerId);
  }, [fetchNext, isPageEnd, hasNextPage]);

  if (isError) {
    return (
      <div className="flex justify-center items-center w-full h-screen mt-[-52px] text-red-600 flex-col ">
        <p>문제가 발생했습니다!</p>
        <button>다시시도</button>
      </div>
    );
  }
  return (
    <div className="px-4 md:max-w-5xl mx-auto py-8">
      <SearchFilter />
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <Loading />
        ) : (
          stores?.pages?.map((page, idx) => (
            <React.Fragment key={idx}>
              {page.data.map((store: KakaoStoreType, i: any) => (
                <StoreList store={store} i={i} key={i} />
              ))}
            </React.Fragment>
          ))
        )}
      </ul>
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10 " ref={ref} />
    </div>
  );
}
