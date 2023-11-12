import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
interface CommentProps {
  storeId?: number;
  commentId?: number;
  handleToggleForm?: any;
  refetch: () => void;
}
export default function CommentForm({
  storeId,
  commentId,
  refetch,
  handleToggleForm,
}: CommentProps) {
  const { status, data: session } = useSession();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  return (
    <div className="w-full relative flex p-2">
      {status === "unauthenticated" && (
        <div className="w-full h-full absolute top-0 left-0 z-10 opacity-75 bg-gray-300 flex items-center justify-center">
          <p className="z-20 text-gray-800 text-lg font-extrabold">
            로그인 후 사용가능합니다!
          </p>
        </div>
      )}
      <img
        src={`${session?.user.image || "/images/profile.png"}`}
        alt="profile"
        className="w-10 h-10 rounded-full mx-2 "
      />
      <form
        className="w-full"
        onSubmit={handleSubmit(async (data) => {
          if (commentId) {
            const result = await axios.post("/api/comments", {
              ...data,
              commentId,
            });
            if (result.status === 200) {
              toast.success("답글을 작성했습니다!");
              resetField("body");
              refetch?.();
            } else {
              toast.error("다시 시도해주세요!");
            }
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
        {commentId && (
          <p
            className="bg-red-400 hover:bg-red-300 text-white px-4 py-2 text-sm font-semibold shadow-sm float-right mt-2 rounded-md cursor-pointer m-2"
            onClick={() => handleToggleForm(commentId)}
          >
            작성취소
          </p>
        )}
      </form>
    </div>
  );
}
