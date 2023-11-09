import {
  currentStoreState,
  keyWordState,
  locationState,
  mapState,
  markersState,
} from "@/atom";
import { StoreType } from "@/interface";

import { useEffect, useCallback } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

interface MarkerProps {
  stores: StoreType[];
}
var markers: any = [];
//검색 결과 목록과 마커를 표출하는 함수

export default function Markers({ stores }: MarkerProps) {
  const map = useRecoilValue(mapState);
  const keyword = useRecoilValue(keyWordState);
  const [markersAtom, setMarkersAtom] = useRecoilState(markersState);
  const setCurrentStore = useSetRecoilState(currentStoreState);
  const setLocation = useSetRecoilState(locationState);
  const loadKakaoMarkers = useCallback(
    () => {
      if (map) {
        const ps = new window.kakao.maps.services.Places();
        ps.keywordSearch(
          keyword,
          (data: any, status: any, _pagination: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
              console.log(data);
              // LatLngBounds 객체에 좌표를 추가합니다
              const bounds = new window.kakao.maps.LatLngBounds();

              for (var i = 0; i < data.length; i++) {
                // @ts-ignore
                markers?.push({
                  position: {
                    lat: data[i].y,
                    lng: data[i].x,
                  },
                  content: data[i].place_name,
                  category: data[i].category_group_name,
                  phone: data[i].phone,
                  url: data[i].place_url,
                  road_address_name: data[i].road_address_name,
                });
                // @ts-ignore
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
              }
              console.log(markers);

              setMarkersAtom(markers);
              console.log(markersAtom);
              addMarkers(markersAtom);
              // markers?.map((marker: any) => {
              //   var markerPosition = new window.kakao.maps.LatLng(
              //     marker?.position?.lat,
              //     marker?.position?.lng
              //   );

              //   //1. 마커객체생성
              //   var markerPin = new window.kakao.maps.Marker({
              //     position: markerPosition, //마커의 위치
              //   });

              //   //2. 마커가 지도에 표시되도록 map을 setting
              //   markerPin.setMap(map);

              //   //3.오버레이 구성하기 -- hover할 경우 인포 윈도우 생성
              //   var content = `<div class="infowindow">${marker.content}</div>`;

              //   //커스텀 오버레이 생성
              //   var customOverlay = new window.kakao.maps.CustomOverlay({
              //     position: markerPosition,
              //     content: content,
              //     xAnchor: 0.6,
              //     yAnchor: 0.91,
              //   });

              //   // 마커에 마우스오버 이벤트를 등록합니다
              //   window.kakao.maps.event.addListener(
              //     markerPin,
              //     "mouseover",
              //     function () {
              //       // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
              //       customOverlay.setMap(map);
              //     }
              //   );
              //   // 마커에 마우스아웃 이벤트를 등록합니다
              //   window.kakao.maps.event.addListener(
              //     markerPin,
              //     "mouseout",
              //     function () {
              //       // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
              //       customOverlay.setMap(null);
              //     }
              //   );
              //   //클릭 이벤트 등록
              //   window.kakao.maps.event.addListener(
              //     markerPin,
              //     "click",
              //     function () {
              //       setCurrentStore(marker);
              //       setLocation({
              //         ...location,
              //         lat: marker?.position?.lat,
              //         lng: marker?.position?.lng,
              //       });
              //     }
              //   );
              // });

              // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
              map.setBounds(bounds);
            }
          }
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [map, stores, keyword]
  );
  const removeMarkers = useCallback(() => {
    if (markers) {
      markers.map((marker: any) => {
        var markerPosition = new window.kakao.maps.LatLng(
          marker?.position?.lat,
          marker?.position?.lng
        );

        //1. 마커객체생성
        var markerPin = new window.kakao.maps.Marker({
          position: markerPosition, //마커의 위치
        });

        //2. 마커가 지도에 표시되도록 map을 setting
        markerPin.setMap();
      });
      markers = [];
    }
  }, []);
  const addMarkers = (markers: any) => {
    markers?.map((marker: any) => {
      var markerPosition = new window.kakao.maps.LatLng(
        marker?.position?.lat,
        marker?.position?.lng
      );

      //1. 마커객체생성
      var markerPin = new window.kakao.maps.Marker({
        position: markerPosition, //마커의 위치
      });

      //2. 마커가 지도에 표시되도록 map을 setting
      markerPin.setMap(map);

      //3.오버레이 구성하기 -- hover할 경우 인포 윈도우 생성
      var content = `<div class="infowindow">${marker.content}</div>`;

      //커스텀 오버레이 생성
      var customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: content,
        xAnchor: 0.6,
        yAnchor: 0.91,
      });

      // 마커에 마우스오버 이벤트를 등록합니다
      window.kakao.maps.event.addListener(markerPin, "mouseover", function () {
        // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
        customOverlay.setMap(map);
      });
      // 마커에 마우스아웃 이벤트를 등록합니다
      window.kakao.maps.event.addListener(markerPin, "mouseout", function () {
        // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
        customOverlay.setMap(null);
      });
      //클릭 이벤트 등록
      window.kakao.maps.event.addListener(markerPin, "click", function () {
        setCurrentStore(marker);
        setLocation({
          ...location,
          lat: marker?.position?.lat,
          lng: marker?.position?.lng,
        });
      });
    });
  };
  useEffect(() => {
    removeMarkers();
    loadKakaoMarkers();
  }, [map, keyword, loadKakaoMarkers, removeMarkers]);

  return <></>;
}
