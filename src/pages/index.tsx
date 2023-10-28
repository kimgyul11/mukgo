import Layout from "@/compornent/Layout";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <h1 className="font-bold">START페이지</h1>
      <ul>
        <li>
          <Link href="/stores">가게 목록</Link>
        </li>
        <li>
          <Link href="/stores/new">기록 하기</Link>
        </li>
        <li>
          <Link href="/stores/1">상세페이지</Link>
        </li>
        <li>
          <Link href="/stores/1/edit">수정 페이지</Link>
        </li>
        <li>
          <Link href="/users/login">로그인 페이지</Link>
        </li>
        <li>
          <Link href="/users/mypage">마이 페이지</Link>
        </li>
        <li>
          <Link href="/users/likes">찜한 목록</Link>
        </li>
      </ul>
    </>
  );
}
