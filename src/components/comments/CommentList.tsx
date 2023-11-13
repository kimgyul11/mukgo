/* eslint-disable @next/next/no-img-element */
import { CommentApiResponse, ReplyInterface } from "@/interface";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import CommentForm from "./CommentForm";
import { useRecoilValue } from "recoil";
import { authorState, currentStoreState } from "@/atom";
import Reply from "./Reply";
import { DATE_OPTIONS } from "@/data/store";

interface CommentListProps {
  comments?: CommentApiResponse;
  refetch: () => void;
  displayStore?: boolean;
}

export default function CommentList({
  comments,
  displayStore,
  refetch,
}: CommentListProps) {
  const [commentForms, setCommentForms] = useState<any>({});
  const author = useRecoilValue(authorState);
  const { status, data: session } = useSession();
  const handleDeleteComment = async (id: number) => {
    const ok = window.confirm("정말 댓글을 삭제하시겠습니까?");
    if (ok) {
      try {
        const result = await axios.delete(`/api/comments?id=${id}`);
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
  const handleToggleForm = (commentId: any) => {
    setCommentForms((prevForms: any) => ({
      ...prevForms,
      [commentId]: !prevForms[commentId],
    }));
  };
  return (
    <div className="my-16">
      {comments?.data && comments?.data?.length > 0 ? (
        comments?.data?.map((comment) => (
          <div
            key={comment.id}
            className="flex space-x-4 text-sm text-gray-500  justify-between mt-2 border-b pb-3"
          >
            {/* 맨왼쪽 */}
            <div>
              <img
                src={comment?.user?.image || "/images/profile.png"}
                width={40}
                height={40}
                className="rounded-full bg-gray-10"
                alt="profile"
              ></img>
            </div>
            <div className="flex flex-col  w-full ">
              <div className="flex items-center">
                <p>{comment?.user?.email}</p>
                {author === comment.userId && (
                  <div className="bg-blue-500 text-white text-xs p-1 font-medium rounded-md mx-1">
                    작성자
                  </div>
                )}
              </div>
              <div className="text-xs">
                {new Date(comment?.createdAt)?.toLocaleDateString(
                  "ko-KR",
                  DATE_OPTIONS as any
                )}
              </div>
              <div className="text-black font-medium mt-2">{comment?.body}</div>
              {displayStore && (
                <div className="mt-2">
                  <Link
                    href={`/stores/${comment?.store?.id}`}
                    className="text-gray-900 underline font-medium"
                  >
                    {comment.store?.name}
                  </Link>
                </div>
              )}
              <div>
                <div>
                  <button
                    onClick={() => handleToggleForm(comment.id)}
                    className="text-xs "
                  >
                    답글 쓰기
                  </button>
                </div>
                {commentForms[comment.id] && (
                  <CommentForm
                    commentId={comment.id}
                    refetch={refetch}
                    handleToggleForm={handleToggleForm}
                  />
                )}
              </div>

              <div className="border-l-4">
                {comment.replies &&
                  comment.replies?.length > 0 &&
                  comment.replies?.map((item) => {
                    return <Reply reply={item} />;
                  })}
              </div>
            </div>

            <div>
              {comment.userId === session?.user.id && (
                <button
                  type="button"
                  onClick={() => handleDeleteComment(comment.id)}
                  className="w-8"
                >
                  삭제
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 border border-gray-200 rounded-md text-sm text-gray-400">
          아직 작성된 댓글이 없습니다.
        </div>
      )}
    </div>
  );
}
