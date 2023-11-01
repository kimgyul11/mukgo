import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import {
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
  AiOutlinePhone,
} from "react-icons/ai";
import { GrMap } from "react-icons/gr";
import { GiCook } from "react-icons/gi";
import { StoreType } from "@/interface";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { currentStoreState } from "@/atom";

export default function StoreBox() {
  const router = useRouter();
  const [store, setStore] = useRecoilState(currentStoreState);
  return (
    <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white">
      {store && (
        <>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <Image
                  src={
                    store?.category
                      ? `/images/markers/${store?.category}.png`
                      : `images/markers/default.png`
                  }
                  width={40}
                  height={40}
                  alt="icon image"
                />
                <div>
                  <div className="font-semibold">{store?.name}</div>
                  <div className="text-sm">{store?.storeType}</div>
                </div>
              </div>
              <button type="button" onClick={() => setStore(null)}>
                <AiOutlineCloseCircle />
              </button>
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <GrMap />
              {store?.address}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlinePhone />
              {store?.phone}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlineInfoCircle />
              {store?.storeType}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <GiCook />
              {store?.category}
            </div>
          </div>
          <button
            type="button"
            onClick={() => router.push(`/stores/${store.id}`)}
            className="w-full bg-blue-700 hover:bg-blue-500 py-3 text-white font-semibold rounded-b-lg"
          >
            상세보기
          </button>
        </>
      )}
    </div>
  );
}
