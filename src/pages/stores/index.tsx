import Loader from "@/components/Loader";
import Loading from "@/components/Loading";
import Pagenation from "@/components/Pagenation";
import SearchFilter from "@/components/SearchFilter";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { StoreApiResponse, StoreType } from "@/interface";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { useInfiniteQuery, useQuery } from "react-query";

export default function StoreListPage() {
  const router = useRouter();
  const { page = "1" }: any = router.query;
  const ref = useRef<HTMLDivElement | null>(null); //타겟을 지정하기 위한 useRef
  const pageRef = useIntersectionObserver(ref, {}); //감시하기위한 observerHook
  const isPageEnd = !!pageRef?.isIntersecting; // 페이지의 끝인지 확인하는 변수
  const [q, setQ] = useState<string | null>(null);
  const [district, setDistrict] = useState<string | null>(null);

  const searchParams = {
    q: q,
    district: district,
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
      <SearchFilter setQ={setQ} setDistrict={setDistrict} />
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <Loading />
        ) : (
          stores?.pages?.map((page, idx) => (
            <React.Fragment key={idx}>
              {page.data.map((store: StoreType, i: any) => (
                <li className="flex justify-between gap-x-6 py-5" key={i}>
                  <div className="flex gap-x-4">
                    <Image
                      src={
                        store?.category
                          ? `/images/markers/${store?.category}.png`
                          : `/images/markers/default`
                      }
                      width={60}
                      height={60}
                      alt="list img"
                    />
                    <div>
                      <div className="text-sm font-semibold leading-9 text-gray-900">
                        {store?.name}
                      </div>
                      <div className="mt-1 text-xs truncate font-semibold leading-9 text-gray-900">
                        {store?.storeType}
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <div className="text-sm font-semibold leading-9 text-gray-900">
                      {store?.address}
                    </div>
                    <div className="mt-1 text-xs truncate font-semibold leading-9 text-gray-900">
                      {store?.phone || "번호 정보 없음"} |{" "}
                      {store?.foodCertifyName}
                      {store?.category}
                    </div>
                  </div>
                </li>
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
