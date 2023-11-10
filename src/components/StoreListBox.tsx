import { KakaoStoreType, StoreType } from "@/interface";
import Image from "next/image";
import { useRouter } from "next/router";
import Star from "./Star";

interface StoreListProps {
  store?: KakaoStoreType;
  i: number;
}

export default function StoreList({ store, i }: StoreListProps) {
  const router = useRouter();
  return (
    <li
      className="flex justify-between gap-x-6 py-5 cursor-pointer hover:bg-gray-50"
      key={i}
      onClick={() => router.push(`/stores/${store?.id}`)}
    >
      <div className="flex gap-x-4">
        <Image
          src={`/images/markers/${store?.category_group_name || "defalt"}.png`}
          width={48}
          height={48}
          alt="아이콘 이미지"
        />
        <div>
          <div className="text-sm font-semibold leading-6 text-gray-900">
            {store?.place_name}
          </div>
          <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
            {store?.category_name}
          </div>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-col sm:items-end">
        <div className="text-sm font-semibold leading-6 text-gray-900">
          {store?.road_address_name}
        </div>
        <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
          <Star star={store?.star} />
        </div>
      </div>
    </li>
  );
}
