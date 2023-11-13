/* eslint-disable @next/next/no-img-element */
import Pagenation from "@/components/Pagenation";
import { DATE_OPTIONS } from "@/data/store";
import { CommentApiResponse, KakaoStoreType } from "@/interface";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function Mypage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { page = "1" }: any = router.query;
  const fetchComments = async () => {
    const { data } = await axios(
      `/api/stores?&limit=10&page=${page}&user=${true}`
    );
    return data as CommentApiResponse;
  };

  const { data: posts } = useQuery(`comments-${page}`, fetchComments);

  return (
    <div className="md:max-w-5xl mx-auto px-4 py-8">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          마이페이지
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          사용자 기본정보
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              이름
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {session?.user.name ?? "사용자"}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              이메일
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {session?.user.email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              이미지
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <img
                alt="프로필 이미지"
                width={48}
                height={48}
                className="rounded-full"
                src={session?.user.image || "/images/profile.png"}
              />
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              설정
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <button
                type="button"
                className="underline hover:text-gray-500"
                onClick={() => signOut()}
              >
                로그아웃
              </button>
            </dd>
          </div>
        </dl>
      </div>
      <div className="mt-2 flex-col">
        <p className="text-l font-bold">내가 작성한 게시글</p>
      </div>
      <ul className="md:max-w-5xl ">
        {posts && posts?.data.length > 0 ? (
          posts.data.map((post: KakaoStoreType) => {
            return (
              <li
                key={post.id}
                className="flex justify-between gap-x-6 mt-2 border-b hover:bg-gray-200 cursor-pointer"
                onClick={() => router.push(`/stores/${post.id}`)}
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {post.place_name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {post.category_name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {new Date(post?.createdAt)?.toLocaleDateString(
                        "ko-KR",
                        DATE_OPTIONS as any
                      )}
                    </p>
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <p className="mt-2 text-sm text-gray-500">
            작성한 게시글이 없습니다.
          </p>
        )}
      </ul>
      <Pagenation
        total={posts?.totalPage}
        page={page}
        pathname="/users/mypage"
      />
    </div>
  );
}
