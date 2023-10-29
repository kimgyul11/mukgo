import Loading from "@/components/Loading";
import Pagenation from "@/components/Pagenation";
import { StoreApiResponse, StoreType } from "@/interface";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useQuery } from "react-query";

export default function StoreListPage() {
  const router = useRouter();
  const { page = "1" }: any = router.query;

  const {
    isLoading,
    isError,
    data: stores,
  } = useQuery(`stores-${page}`, async () => {
    const { data } = await axios(`/api/stores?page=${page}`);
    return data as StoreApiResponse;
  });

  console.log(stores);
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
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <Loading />
        ) : (
          stores?.data?.map((store, idx) => (
            <li className="flex justify-between gap-x-6 py-5" key={idx}>
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
                  {store?.phone || "번호 정보 없음"} | {store?.foodCertifyName}
                  {store?.category}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
      {stores?.totalPage && (
        <Pagenation total={stores?.totalPage} page={page} />
      )}
    </div>
  );
}
