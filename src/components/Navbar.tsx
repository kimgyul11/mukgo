import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

import { BiMenu } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";

export default function Navbar() {
  const [isShow, setIsShow] = useState(false);
  const { data, status } = useSession();

  return (
    <>
      <div className="navbar">
        <Link href="/" className="navbar__logo">
          로고
        </Link>
        <div className="navbar__list">
          <Link href="/stores" className="navbar__list--item">
            가게 목록
          </Link>
          <Link href="/stores/new" className="navbar__list--item">
            기록 하기
          </Link>
          <Link href="/users/likes" className="navbar__list--item">
            찜한 가게
          </Link>
          {status === "authenticated" ? (
            <button type="button" onClick={() => signOut()}>
              로그아웃
            </button>
          ) : (
            <Link href="/api/auth/signin" className="navbar__list--item">
              로그인
            </Link>
          )}
        </div>
        {/* 반응형 버튼 */}
        <div
          role="presentation"
          className="navbar__button"
          onClick={() => setIsShow((prev) => !prev)}
        >
          {isShow ? <ImCancelCircle /> : <BiMenu />}
        </div>
      </div>
      {isShow && (
        <div className="navbar--mobile">
          <div className="navbar__list--mobile">
            <Link href="/stores" className="navbar__list--item--mobile">
              가게 목록
            </Link>
            <Link href="/stores/new" className="navbar__list--item--mobile">
              기록 하기
            </Link>
            <Link href="/users/likes" className="navbar__list--item--mobile">
              찜한 가게
            </Link>
            {status === "authenticated" ? (
              <button type="button" onClick={() => signOut()}>
                로그아웃
              </button>
            ) : (
              <Link href="/api/auth/signin" className="navbar__list--item">
                로그인
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
