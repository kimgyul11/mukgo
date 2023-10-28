import Script from "next/script";

/* global kakao TS */
declare global {
  interface Window {
    kakao: any;
  }
}
export default function Map() {
  const loadKakaoMap = () => {
    //카카오 지도 로드 함수
    window.kakao.maps.load(() => {
      //맵을 담아줄 container el
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), //초기 시작 위치 LatLng(latitude위도 , longitude경도)
        level: 3, //zoom 단계
      };
      // new kakao.maps.Map(node, options); -load doc참조
      new window.kakao.maps.Map(mapContainer, mapOption);
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
