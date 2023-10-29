import Link from "next/link";
import React from "react";

interface Pagination {
  total: number;
  page: string;
}

export default function Pagenation({ total, page }: Pagination) {
  return (
    <div className="py-6 w-full px-10 flex justify-center gap-4 bg-white my-10 flex-wrap">
      {total <= 10 ? (
        [...Array(total)].map((_, i) => (
          <Link href={{ pathname: "/stores", query: { page: i + 1 } }} key={i}>
            <span
              className={`px-3 py-2 rounded border shadow-sm bg-white ${
                i + 1 === parseInt(page, 10)
                  ? "text-gray-700 font-bold"
                  : "text-gray-300"
              }`}
            >
              {i + 1}
            </span>
          </Link>
        ))
      ) : (
        <>
          {parseInt(page) > 1 && (
            <Link
              href={{
                pathname: "/stores",
                query: { page: parseInt(page) - 1 },
              }}
            >
              <span className={`px-3 py-2 rounded border shadow-sm bg-white`}>
                이전
              </span>
            </Link>
          )}

          <Link href={{ pathname: "/stores", query: { page: page } }}>
            <span
              className={`px-3 py-2 rounded border shadow-sm text-gray-700`}
            >
              {page}
            </span>
          </Link>
          {total > parseInt(page) && (
            <Link
              href={{
                pathname: "/stores",
                query: { page: parseInt(page) + 1 },
              }}
            >
              <span className={`px-3 py-2 rounded border shadow-sm bg-white`}>
                다음
              </span>
            </Link>
          )}
        </>
      )}
    </div>
  );
}
