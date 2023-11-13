import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

import { BiMenu, BiLogOut } from "react-icons/bi";
import { GrContactInfo } from "react-icons/gr";
import { BsBookmarkHeart, BsSearch } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";

export default function Navbar() {
  const [isShow, setIsShow] = useState(false);
  const { status } = useSession();

  return (
    <>
      <nav className="navbar">
        <Link href="/" className="navbar__logo">
          MUKGO
        </Link>
        <div className="navbar__list">
          <Link href="/stores" className="navbar__list--item">
            <BsSearch className="text-xl" />
          </Link>
          <Link href="/users/likes" className="navbar__list--item">
            <BsBookmarkHeart className="text-xl" />
          </Link>

          {status === "authenticated" ? (
            <>
              <Link href="/users/mypage" className="navbar__list--item">
                <GrContactInfo className="text-xl" />
              </Link>
              <button type="button" onClick={() => signOut()}>
                <BiLogOut className="text-red-400 text-xl" />
              </button>
            </>
          ) : (
            <Link href="/api/auth/signin" className="navbar__list--item">
              Login
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
      </nav>
      {/* 반응형 navbar */}
      {isShow && (
        <div className="navbar--mobile z-10">
          <div className="navbar__list--mobile">
            <Link
              href="/stores"
              className="navbar__list--item--mobile"
              onClick={() => setIsShow(false)}
            >
              가게 목록
            </Link>
            <Link
              href="/stores/new"
              className="navbar__list--item--mobile"
              onClick={() => setIsShow(false)}
            >
              기록 하기
            </Link>
            <Link
              href="/users/likes"
              className="navbar__list--item--mobile"
              onClick={() => setIsShow(false)}
            >
              찜한 가게
            </Link>
            <Link
              href="/users/mypage"
              className="navbar__list--item--mobile"
              onClick={() => setIsShow(false)}
            >
              마이페이지
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
