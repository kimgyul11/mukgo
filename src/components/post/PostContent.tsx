/* eslint-disable @next/next/no-img-element */
import { KakaoStoreType } from "@/interface";
import Star from "../Star";
import Like from "../Like";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";

interface PostContentProps {
  store?: KakaoStoreType;
}

export default function PostContent({ store }: PostContentProps) {
  const { status, data: session } = useSession();
  const router = useRouter();
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
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="md:flex justify-between items-center py-4 md:py-0">
        <div className="px-4 sm:px-0 flex">
          <h3 className="text-xl font-semibold leading-7 text-gray-900 mx-2">
            {store?.place_name}
          </h3>
          {store && <Like storeId={store.id} />}
        </div>
        <div className="flex items-center gap-x-6 ">
          <img
            className="h-10 w-10 rounded-full"
            src={`${store?.user?.image || "/images/profile.png"}`}
            alt="profile"
          />
          <div>
            <h3 className="text-sm  font-semibold  tracking-tight text-gray-900 ">
              작성자 / {store?.user?.email}
            </h3>
            <p className="text-xs font-semibold leading-2 text-gray-400 float-right">
              {store &&
                new Date(store?.createdAt)?.toLocaleDateString(
                  "ko-KR",
                  options as any
                )}
            </p>
          </div>
        </div>
      </div>
      <div className="md:flex justify-end items-center md:py-0">
        {status === "authenticated" &&
          store?.userId === session?.user.id &&
          store && (
            <div className="flex items-center gap-4 px-4 py-3">
              <Link className="underline" href={`/stores/${store?.id}/edit`}>
                수정
              </Link>
              <button className="underline" onClick={handleDelete}>
                삭제
              </button>
            </div>
          )}
      </div>

      <div className="mt-2 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm leading-6 text-gray-900 font-bold">
              카테고리
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {store?.category_name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-bold leading-6 text-gray-900">주소</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {store?.road_address_name}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-bold leading-6 text-gray-900">
              연락처
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {store?.phone}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">URL</dt>
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
            <dt className="text-sm font-bold leading-6 text-gray-900">평점</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <Star star={store?.star} />
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-bold leading-6 text-gray-900">후기</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div>
                <pre className="whitespace-pre-line">{store?.content}</pre>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
