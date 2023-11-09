import { StoreType } from "@/interface";
import axios from "axios";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface LikeProps {
  storeId: number;
}

export default function Like({ storeId }: LikeProps) {
  const { data: session, status } = useSession();
  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${storeId}`);
    return data as StoreType;
  };

  const { data: store, refetch } = useQuery(
    `like-store-${storeId}`,
    fetchStore,
    {
      enabled: !!storeId, //id만 있는 경우에만 쿼리를 날리도록만드는 옵션
      refetchOnWindowFocus: false, //윈도우를 나갔다 들어올때마다 리페칭되는걸 막아줌
    }
  );

  const toggleLike = async () => {
    //좋아요버튼
    if (session?.user && store) {
      try {
        const like = await axios.post("/api/likes", {
          storeId: storeId,
          store, //내가 좋아요할 가게의 아이디를 바디에 담아서 보낸다.
        });
        console.log(like);
        if (like.status === 201) {
          toast.success("저장완료!");
        } else {
          toast.warn("취소 완료");
        }
        refetch();
      } catch (e) {
        console.log(e);
      }
    } else if (status === "unauthenticated") {
      toast.warn("로그인 후 이용해 주세요");
    }
  };
  return (
    <button type="button" onClick={toggleLike}>
      {status === "authenticated" && store?.likes?.length ? (
        <HiHeart className="hover:text-red-600 focus:text-red-600 text-red-500" />
      ) : (
        <HiOutlineHeart className="hover:text-red-600 focus:text-red-600" />
      )}
    </button>
  );
}
