import { Dispatch, SetStateAction } from "react";
import Script from "next/script";

/* global kakao TS */
declare global {
  interface Window {
    kakao: any;
  }
}
const DEFAULT_LAT = 37.497625203;
const DEFAULT_LAN = 127.03088379;
const DEFAULT_ZOOM = 3;

interface MapProps {
  setMap: Dispatch<SetStateAction<any>>;
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

export default function Map({ lat, lng, zoom, setMap }: MapProps) {
  const loadKakaoMap = () => {
    //카카오 지도 로드 함수
    window.kakao.maps.load(() => {
      //맵을 담아줄 container 엘리먼트,옵션을 정의한다.
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(
          lat ?? DEFAULT_LAT,
          lng ?? DEFAULT_LAN
        ), //초기 시작 위치 LatLng(latitude위도 , longitude경도)
        level: zoom ?? DEFAULT_ZOOM, //zoom 단계
      };
      // new kakao.maps.Map(node, options)메서드를 통해서 map을 생성한다.
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(map);
    });
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-screen"></div>
    </>
  );
}
