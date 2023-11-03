import { keyWord, mapState, markersState } from "@/atom";
import React, { useCallback, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export default function MapSearch() {
  const setKeyWord = useSetRecoilState(keyWord);

  const inputRef = useRef<HTMLInputElement>(null);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let inputValue = inputRef.current?.value;
    if (!inputValue) {
      alert("검색어를 입력해주세요!");
    }

    if (inputValue) {
      setKeyWord(inputValue);
    }
  };

  return (
    <div id="menu_wrap" className="z-10 w-full bg-red-600">
      <div>
        <div>
          <form onSubmit={onSubmit}>
            키워드 : <input type="text" ref={inputRef} />
            <button type="submit">검색하기</button>
          </form>
        </div>
      </div>

      <ul id="placesList"></ul>
      <div id="pagination"></div>
    </div>
  );
}
