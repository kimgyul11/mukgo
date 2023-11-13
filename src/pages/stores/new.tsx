import { KakaoStoreType } from "@/interface";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ImStarFull } from "react-icons/im";
import { useSession } from "next-auth/react";

export default function StoreNewPage() {
  const { data: session } = useSession();

  const router = useRouter();
  const {
    id, //
    place_name,
    place_url,
    category_name,
    category_group_name,
    phone,
    road_address_name,
    x: lng,
    y: lat,
  }: any = router.query;
  console.log(router.query);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<KakaoStoreType>();
  const [clicked, setClicked] = useState([true, true, true, true, true]);
  const handleStarClick = (index: number) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
    setValue("star", clickStates.filter(Boolean).length);
  };
  const array = [0, 1, 2, 3, 4];

  useEffect(() => {
    setValue("place_name", place_name);
    setValue("place_url", place_url || "URL정보가 없습니다.");
    setValue("category_name", category_name);
    setValue("phone", phone || "연락처 정보가 없습니다.");
    setValue("road_address_name", road_address_name);
    setValue("lat", lat);
    setValue("lng", lng);
    setValue("star", 5);
    setValue("category_group_name", category_group_name);
  }, [
    category_group_name,
    category_name,
    lat,
    lng,
    phone,
    place_name,
    place_url,
    road_address_name,
    setValue,
  ]);
  return (
    <form
      className="px-4 md:max-w-4xl mx-auto py-8"
      onSubmit={handleSubmit(async (data) => {
        try {
          const result = await axios.post("/api/stores", { ...data });
          console.log(result);
          if (result.status === 200) {
            //성공
            toast.success("기록 완료!");
            router.replace(`/stores/${result?.data?.id}`);
          } else {
            //실패
            toast.error("에러가 발생했습니다. 다시 시도해주세요");
          }
        } catch (e) {
          console.log(e);
          toast.error("데이터 생성중 오류가 발생했습니다.다시 시도해주세요");
        }
      })}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            기록하기
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            방문한 곳을 기록해보세요!
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                가게명
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  readOnly
                  {...register("place_name", { required: true })}
                  className="block w-full outline-none rounded-md border-none py-1.5 px-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                카테고리
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  readOnly
                  {...register("category_name", { required: true })}
                  className="block w-full outline-none rounded-md border-none py-1.5 px-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                연락처
              </label>
              <div className="mt-2">
                <input
                  {...register("phone")}
                  className="block w-full outline-none rounded-md border-none py-1.5 px-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  readOnly
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                가게 URL
              </label>
              <div className="mt-2">
                <input
                  readOnly
                  {...register("place_url", { required: true })}
                  className="block w-full outline-none rounded-md border-none py-1.5 px-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="email"
                className="block text-sm font-bold leading-6 text-gray-900 "
              >
                후기
              </label>
              <div className="mt-2">
                <textarea
                  className="w-full h-[250px]  py-1.5 px-1.5 resize-none focus:outline-none border shadow-sm rounded-md"
                  wrap="hard"
                  cols={100}
                  {...register("content", { required: true })}
                />
              </div>
              {errors?.content?.type === "required" && (
                <div className="pt-2 text-xs text-red-600">
                  후기를 입력해주세요!
                </div>
              )}
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                별점
              </label>
              <div className="mt-2 flex">
                {array.map((el) => (
                  <ImStarFull
                    key={el}
                    onClick={() => handleStarClick(el)}
                    size="35"
                    className={
                      clicked[el]
                        ? "text-yellow-300 cursor-pointer"
                        : "text-zinc-100 cursor-pointer"
                    }
                  />
                ))}
              </div>
              <input {...register("star", { required: true })} type="hidden" />
              {errors?.star?.type === "required" && (
                <div className="pt-2 text-xs text-red-600">
                  별점을 선택해주세요!
                </div>
              )}
            </div>
            <input
              {...register("road_address_name", { required: true })}
              type="hidden"
            />
            <input {...register("lat", { required: true })} type="hidden" />
            <input {...register("lng", { required: true })} type="hidden" />
            <input
              {...register("category_group_name", { required: true })}
              type="hidden"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => router.back()}
        >
          뒤로가기
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          저장하기
        </button>
      </div>
    </form>
  );
}
