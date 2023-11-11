/* eslint-disable @next/next/no-img-element */
import { CommentApiResponse } from "@/interface";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import CommentForm from "./CommentForm";

interface CommentListProps {
  comments?: CommentApiResponse;
  displayStore?: boolean;
}

export default function CommentList({
  comments,
  displayStore,
}: CommentListProps) {
  const [commentForms, setCommentForms] = useState<any>({});
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
            className="flex space-x-4 text-sm text-gray-500 bg-blue-100"
          >
            <div>
              <img
                src={comment?.user?.image || "/images/profile"}
                width={40}
                height={40}
                className="rounded-full bg-gray-10"
                alt="profile"
              ></img>
            </div>
            <div className="flex flex-col space-y-1 w-full bg-red-500">
              <p>{comment?.user?.email}</p>
              <div className="text-xs">
                {new Date(comment?.createdAt)?.toLocaleDateString()}
              </div>
              <div className="text-black font-medium mt-1">{comment?.body}</div>

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
                  <button onClick={() => handleToggleForm(comment.id)}>
                    답글 쓰기
                  </button>
                </div>
                {commentForms[comment.id] && (
                  <CommentForm commentId={comment.id} />
                )}
              </div>
            </div>

            <div>
              {comment.userId === session?.user.id && (
                <button
                  type="button"
                  onClick={() => handleDeleteComment(comment.id)}
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
