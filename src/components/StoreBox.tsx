import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import {
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
  AiOutlinePhone,
} from "react-icons/ai";
import { GrMap } from "react-icons/gr";
import { GiCook } from "react-icons/gi";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { currentStoreState } from "@/atom";
import { KakaoStoreType } from "@/interface";

export default function StoreBox() {
  const router = useRouter();
  const [store, setStore] = useRecoilState<KakaoStoreType | null>(
    currentStoreState
  );
  console.log(store);

  return (
    <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white">
      {store && (
        <>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <Image
                  src={
                    store?.category_group_name
                      ? `/images/markers/${
                          store?.category_group_name && "default"
                        }.png`
                      : `/images/markers/default.png`
                  }
                  width={40}
                  height={40}
                  alt="icon image"
                />
                <div>
                  <div className="font-semibold">{store?.place_name}</div>
                  <div className="text-sm">{store?.category_group_name}</div>
                </div>
              </div>
              <button type="button" onClick={() => setStore(null)}>
                <AiOutlineCloseCircle />
              </button>
            </div>
            <div className="flex justify-between">
              <div className="mt-2 flex gap-2 items-center col-span-3">
                <GrMap />
                {store?.road_address_name || "등록된 주소가 없습니다."}
              </div>
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlinePhone />
              {store?.phone || "등록된 번호가 없습니다."}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlineInfoCircle />
              <a href={`${store.place_url} `} target="_blank">
                {store?.place_url || "등록된 정보가 없습니다."}
              </a>
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <GiCook />
              {store?.category_group_name || "등록된 정보가 없습니다."}
            </div>
          </div>
          <button
            type="button"
            onClick={
              // () => router.push(`/stores/${store.id}`)
              () =>
                router.push(
                  {
                    pathname: `/stores/new`,
                    query: {
                      name: store?.place_name,
                      url: store?.place_url,
                      categoty: store?.category_group_name,
                    },
                  },
                  `/stores/new`
                )
            }
            className="w-full bg-blue-700 hover:bg-blue-500 py-3 text-white font-semibold rounded-b-lg"
          >
            기록하기
          </button>
        </>
      )}
    </div>
  );
}
