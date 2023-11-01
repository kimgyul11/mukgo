import { mapState } from "@/atom";
import { StoreType } from "@/interface";
import { useEffect, useCallback } from "react";
import { useRecoilValue } from "recoil";

interface MarkerProps {
  map: any;
  store: StoreType;
}
export default function Marker({ store }: MarkerProps) {
  const map = useRecoilValue(mapState); //전역객체에서 가져와서 사용
  const loadKakaoMarker = useCallback(() => {
    //지도가 있는 경우에만 수행해야한다.
    if (map && store) {
      //1.현재 선택한 식당 데이터 마커 띄우기
      var imageSrc = store?.category
          ? `/images/markers/${store?.category}.png`
          : "/images/markers/default.png",
        imageSize = new window.kakao.maps.Size(40, 40), // 마커이미지 크기
        imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다

      //2.마커의 이미지정보를 가지고 있는 마커이미지를 생성
      var markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      //3.마커가 표시될 위치 정의
      var markerPosition = new window.kakao.maps.LatLng(store?.lat, store?.lng);

      //4. 마커를 생성
      var marker = new window.kakao.maps.Marker({
        position: markerPosition, //마커의 위치
        image: markerImage, //마커 이미지 설정
      });

      //5. 마커가 지도 위에 표시되도록 설정
      marker.setMap(map);

      //6.오버레이 구성하기
      //마커 커서 오버시 마커 위에 표시할 인포 윈도우를 생성
      var content = `<div class="infowindow">${store?.name}</div>`;

      //커스텀 오버레이 생성
      var customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: content,
        xAnchor: 0.6,
        yAnchor: 0.91,
      });
      // 마커에 마우스오버 이벤트를 등록합니다
      window.kakao.maps.event.addListener(marker, "mouseover", function () {
        // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
        customOverlay.setMap(map);
      });

      // 마커에 마우스아웃 이벤트를 등록합니다
      window.kakao.maps.event.addListener(marker, "mouseout", function () {
        // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
        customOverlay.setMap(null);
      });
    }
  }, [map, store]);

  useEffect(() => {
    loadKakaoMarker();
  }, [loadKakaoMarker, map]);

  return <></>;
}
