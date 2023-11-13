import { authorState } from "@/atom";
import { DATE_OPTIONS } from "@/data/store";
import { ReplyInterface } from "@/interface";
import axios from "axios";
import { useSession } from "next-auth/react";

import React from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
interface ReplyProps {
  reply: ReplyInterface;
}
export default function Reply({ reply }: ReplyProps) {
  const author = useRecoilValue(authorState);
  const { status, data: session } = useSession();
  const handleDeleteComment = async (id: number) => {
    const ok = window.confirm("정말 댓글을 삭제하시겠습니까?");
    if (ok) {
      try {
        const result = await axios.delete(`/api/comments?replyId=${reply.id}`);
        if (result.status === 200) {
          toast.success("삭제완료");
        } else {
          toast.error("에러");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div className="flex text-sm text-gray-500  justify-between items-center mt-2">
      <div className="flex w-full m-3">
        <div>
          <img
            src={reply?.user?.image || "/images/profile.png"}
            width={30}
            height={30}
            className="rounded-full bg-gray-10"
            alt="profile"
          ></img>
        </div>
        <div className="flex flex-col items-start">
          <div className="flex">
            <p>{reply?.user?.email}</p>
            {author === reply.user?.id && (
              <div className="bg-blue-500 text-white text-xs p-1 font-medium rounded-md h-6 text-center">
                작성자
              </div>
            )}
          </div>
          <div className="text-xs">
            {new Date(reply?.createdAt)?.toLocaleDateString(
              "ko-KR",
              DATE_OPTIONS as any
            )}
          </div>
          <div>
            {reply.userId === session?.user.id && (
              <button
                type="button"
                onClick={() => handleDeleteComment(reply.id)}
                className="w-8"
              >
                삭제
              </button>
            )}
          </div>
          <div className="text-black font-medium mt-2">{reply?.body}</div>
        </div>
      </div>
    </div>
  );
}
