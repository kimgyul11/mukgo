import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoginPage() {
  const { status, data: session } = useSession();
  const router = useRouter();
  console.log(session);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [router, status]);
  return (
    <div className="flex flex-col justify-center px-6 lg:px-8 h-[60vh]">
      <div className="mx-auto w-full max-w-sm">
        <div className="text-blue-800 text-center text-2xl font-semibold italic">
          로그인
        </div>
        <div className="text-center mt-6 text-2xl font-bold">
          소셜 계정으로 간단 로그인✨
        </div>
        <p className="mt-2 text-center text-sm">
          계정이 없다면 자동으로 회원가입
        </p>
      </div>
      <div className="mt-10 mx-auto w-full max-w-sm">
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="border"
          >
            구글 계정으로 로그인
          </button>
          <button
            type="button"
            onClick={() => signIn("kakao", { callbackUrl: "/" })}
            className="border"
          >
            카카오 계정으로 로그인
          </button>
          <button
            type="button"
            onClick={() => signIn("naver", { callbackUrl: "/" })}
            className="border"
          >
            네이버 계정으로 로그인
          </button>
        </div>
      </div>
    </div>
  );
}
