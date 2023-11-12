import { authorState } from "@/atom";
import { ReplyInterface } from "@/interface";
import axios from "axios";

import React from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
interface ReplyProps {
  reply: ReplyInterface;
}
export default function Reply({ reply }: ReplyProps) {
  const author = useRecoilValue(authorState);

  return (
    <div className="flex text-sm text-gray-500  justify-between items-center mt-2">
      <div className="flex w-full m-3">
        <div>
          <img
            src={reply?.user?.image || "/images/profile.png"}
            width={30}
            height={30}
            className="rounded-full bg-gray-10"
            alt="profile"
          ></img>
        </div>
        <div className="flex flex-col items-start">
          <div className="flex">
            <p>{reply?.user?.email}</p>
            {author === reply.user?.id && (
              <div className="bg-blue-500 text-white text-xs p-1 font-medium rounded-md h-6 text-center">
                작성자
              </div>
            )}
          </div>

          <div className="text-xs">
            {new Date(reply?.createdAt)?.toLocaleDateString()}
          </div>
          <div className="text-black font-medium mt-2">{reply?.body}</div>
        </div>
      </div>
    </div>
  );
}
