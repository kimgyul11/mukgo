import { Dispatch, SetStateAction } from "react";
import Script from "next/script";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { locationState, mapState } from "@/atom";

/* global kakao TS */
declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

export default function Map({ lat, lng, zoom }: MapProps) {
  const setMap = useSetRecoilState(mapState);
  const location = useRecoilValue(locationState);
  const loadKakaoMap = () => {
    //카카오 지도 로드 함수
    window.kakao.maps.load(() => {
      //맵을 담아줄 container 엘리먼트,옵션을 정의한다.
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(
          lat ?? location.lat,
          lng ?? location.lng
        ), //초기 시작 위치 LatLng(latitude위도 , longitude경도)
        level: zoom ?? location.zoom, //zoom 단계
      };
      // new kakao.maps.Map(node, options)메서드를 통해서 map을 생성한다.
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      //리코일에 map을 담아준다.
      setMap(map);
    });
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        // src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&libraries=services&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-screen"></div>
    </>
  );
}
