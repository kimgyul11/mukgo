import {
  currentStoreState,
  keyWordState,
  mapState,
  markersState,
  placesState,
} from "@/atom";
import React, { useCallback, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export default function MapSearch() {
  const [keyword, setKeyWord] = useRecoilState(keyWordState);
  const setCurrentStore = useSetRecoilState(currentStoreState);
  const placeList = useRecoilValue(placesState);
  const inputRef = useRef<HTMLInputElement>(null);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let inputValue = inputRef.current?.value;
    if (!inputValue?.replace(/^\s+|\s+$/g, "")) {
      alert("키워드를 입력해주세요!");
      return false;
    }
    setKeyWord(inputValue);
    inputValue = "";
  };

  return (
    <div id="menu_wrap" className="w-full h-full ">
      <div className="flex justify-center items-center h-8 ">
        <form onSubmit={onSubmit} className="h-full">
          <input
            type="text"
            ref={inputRef}
            className="focus:outline-none border border-gray-200 rounded-tl-xl rounded-bl-xl h-full text-sm placeholder:text-sm p-2 w-[200px]"
            placeholder="키워드를 입력해주세요!"
          />
          <button
            type="submit"
            className="h-full bg-blue-400 hover:bg-blue-500 text-sm p-1 text-white font-semibold shadow-sm float-right rounded-tr-xl rounded-br-xl"
          >
            검색하기
          </button>
        </form>
      </div>

      <ul id="placesList" className="border p-2 m-2 h-full">
        {placeList?.length > 0 ? (
          placeList?.map((item: any) => {
            return (
              <li
                key={item.id}
                className="mt-2 border-b cursor-pointer "
                onClick={() => {
                  setCurrentStore(item);
                }}
              >
                <div>{item.place_name}</div>
                <div className="text-xs text-zinc-600">
                  {item.category_name}
                </div>
              </li>
            );
          })
        ) : (
          <p>방문한 가게를 입력해보세요!</p>
        )}
        <div className="w-full flex justify-center">
          <div id="pagination"></div>
        </div>
      </ul>
    </div>
  );
}
