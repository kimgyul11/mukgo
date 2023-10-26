import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  return (
    <div>
      <h1>Router</h1>
      <button type="button" onClick={() => router.push("/test")}>
        PUSH
      </button>
    </div>
  );
}
