import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
interface CommentProps {
  storeId?: number;
  commentId?: number;
  refetch?: () => void;
}
export default function CommentForm({
  storeId,
  commentId,
  refetch,
}: CommentProps) {
  const { status } = useSession();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  return (
    <>
      {status ? (
        <form
          onSubmit={handleSubmit(async (data) => {
            if (commentId) {
            } else {
              const result = await axios.post("/api/comments", {
                ...data,
                storeId,
              });

              if (result.status === 200) {
                toast.success("댓글을 작성했습니다!");
                resetField("body");
                refetch?.();
              } else {
                toast.error("다시 시도해주세요!");
              }
            }
          })}
        >
          {errors?.body?.type === "required" && (
            <div className="text-xs text-red-600">내용을 입력해주세요!</div>
          )}
          <textarea
            rows={3}
            placeholder="댓글을 작성해주세요"
            {...register("body", { required: true })}
            className="block w-full min-h-[120px] resize-none border rounded-md bg-transparent py-2.5 px-4 text-black placeholder:text-gray-400 text-sm focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 text-sm font-semibold shadow-sm float-right mt-2 rounded-md"
          >
            작성하기
          </button>
        </form>
      ) : (
        <p>로그인 유저만 댓글을 작성할 수 있습니다!</p>
      )}
    </>
  );
}
