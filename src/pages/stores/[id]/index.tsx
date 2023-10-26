import { useRouter } from "next/router";

export default function StoreDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h1>디테일 페이지 현재 디테일 : {id}</h1>
    </div>
  );
}
