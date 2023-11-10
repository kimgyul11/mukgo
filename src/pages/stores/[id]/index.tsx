import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { KakaoStoreType, StoreType } from "@/interface";
import axios from "axios";
import Loader from "@/components/Loader";
import React, { useState } from "react";
import Map from "@/components/Map";
import Marker from "@/components/Maker";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";
import Like from "@/components/Like";
import Comments from "@/components/comments";
import Star from "@/components/Star";

export default function StoreDetailPage() {
  const [map, setMap] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { status, data: session } = useSession();

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
  const handleDelete = async () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (ok && store) {
      try {
        const result = await axios.delete(`/api/stores?id=${store?.id}`);
        if (result.status === 200) {
          toast.success("삭제되었습니다");
          router.replace("/");
        } else {
          toast.error("잠시 후 다시 시도해주세요");
        }
      } catch (e) {
        console.log(e);
        toast.error("다시 시도해주세요");
      }
    }
  };
  console.log(store?.userId === session?.user.id);
  return (
    <React.Fragment>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="md:flex justify-between items-center py-4 md:py-0">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              {store?.place_name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              {store?.road_address_name}
            </p>
          </div>
          {status === "authenticated" &&
            store?.userId === session?.user.id &&
            store && (
              <div className="flex items-center gap-4 px-4 py-3">
                <Like storeId={store.id} />
                <Link className="underline" href={`/stores/${store?.id}/edit`}>
                  수정
                </Link>
                <button className="underline" onClick={handleDelete}>
                  삭제
                </button>
              </div>
            )}
        </div>

        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                카테고리
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.category_name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                주소
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.road_address_name}
              </dd>
            </div>
            {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                위도
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.lat}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                경도
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.lng}
              </dd>
            </div> */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                연락처
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.phone}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                URL
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <a
                  href={`${store?.place_url}`}
                  target="_blank"
                  className="text-sky-600 underline"
                >
                  {store?.place_url}
                </a>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                평점
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <Star star={store?.star} />
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                후기
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <div>
                  <pre>{store?.content}</pre>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {isSuccess && (
        <>
          <div className="overflow-hidden w-full mb-20 max-w-5xl mx-auto max-h-[600px]">
            <Map lat={store?.lat} lng={store.lng} zoom={1} />
            <Marker map={map} store={store} />
          </div>
          <Comments storeId={store.id} />
        </>
      )}
    </React.Fragment>
  );
}
