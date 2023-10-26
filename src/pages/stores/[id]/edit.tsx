import { useRouter } from "next/router";

export default function StoreEditPage() {
  const router = useRouter();
  const { id } = router.query;
  return <div>수정페이지 현재 위치 : {id}</div>;
}
