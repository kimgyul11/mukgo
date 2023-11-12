import LoginForm from "@/components/LoginForm";
import SignInButton from "@/components/SignInButton";
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
    <div className="flex flex-col justify-center px-6 lg:px-8 h-[60vh] mt-16">
      <LoginForm />

      <div className="mt-10 mx-auto w-full max-w-sm">
        <p>소셜 계정으로 3초면 가입완료!</p>
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
