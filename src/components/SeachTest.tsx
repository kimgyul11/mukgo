import {
  currentStoreState,
  keyWord,
  locationState,
  mapState,
  markersState,
} from "@/atom";
import { StoreType } from "@/interface";

import { useEffect, useCallback, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

interface MarkerProps {
  stores: StoreType[];
}

export default function Markers({ stores }: MarkerProps) {
  const map = useRecoilValue(mapState);
  // const setMarkers = useSetRecoilState(markersState);
  const setCurrentStore = useSetRecoilState(currentStoreState);
  const [location, setLocation] = useRecoilState(locationState);
  // const [markers, setMarkers] = useState([]);
  const keyword = useRecoilValue(keyWord);

  const loadKakaoMarkers = useCallback(() => {
    //지도가 있는 경우에만 수행해야한다.

    if (map) {
      // const ps = new window.kakao.maps.services.Places();
      // ps.keywordSearch(
      //   keyword, //키워드를 동적으로 받아야함
      //   (data: any, status: any, _pagination: any) => {
      //     if (status === window.kakao.maps.services.Status.OK) {
      //       // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      //       // LatLngBounds 객체에 좌표를 추가합니다
      //       const bounds = new window.kakao.maps.LatLngBounds();

      //       let markers: any = [];
      //       console.log(markers);
      //       setMarkers([]);
      //       removeMarker(markers);
      //       for (var i = 0; i < data.length; i++) {
      //         // @ts-ignore
      //         markers.push({
      //           position: {
      //             lat: data[i].y,
      //             lng: data[i].x,
      //           },
      //           content: data[i].place_name,
      //           category: data[i].category_group_name,
      //           phone: data[i].phone,
      //           url: data[i].place_url,
      //           road_address_name: data[i].road_address_name,
      //         });
      //         // @ts-ignore
      //         bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      //       }

      //       setMarkers(markers);
      //       console.log(markers);
      //       // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      //       map.setBounds(bounds);
      //     }
      //   }
      // );

      //분리--------------
      //이전 검색기록 현재 검색기록이 다를경우..

      stores?.map((marker: any) => {
        var markerPosition = new window.kakao.maps.LatLng(
          marker?.position?.lat,
          marker?.position?.lng
        );
        //4. 마커를 생성
        var markerPin = new window.kakao.maps.Marker({
          position: markerPosition, //마커의 위치
        });

        //5. 마커가 지도 위에 표시되도록 설정
        markerPin.setMap(map);

        
        //6.오버레이 구성하기
        //마커 커서 오버시 마커 위에 표시할 인포 윈도우를 생성
        var content = `<div class="infowindow">${marker.content}</div>`;

        //커스텀 오버레이 생성
        var customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          xAnchor: 0.6,
          yAnchor: 0.91,
        });
        // 마커에 마우스오버 이벤트를 등록합니다
        window.kakao.maps.event.addListener(
          markerPin,
          "mouseover",
          function () {
            // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
            customOverlay.setMap(map);
          }
        );
        // 마커에 마우스아웃 이벤트를 등록합니다
        window.kakao.maps.event.addListener(markerPin, "mouseout", function () {
          // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
          customOverlay.setMap(null);
        });
        window.kakao.maps.event.addListener(markerPin, "click", function () {
          setCurrentStore(marker);
          setLocation({
            ...location,
            lat: marker?.position?.lat,
            lng: marker?.position?.lng,
          });
        });
      });
    }

    // if (map) {
    //   const ps = new window.kakao.maps.services.Places()

    //   stores?.map((store) => {
    //     //1.이미지 마커를 생성하기 위한 기본 이미지 정보 정의
    //     var imageSrc = store?.category
    //         ? `/images/markers/${store?.category}.png`
    //         : "/images/markers/default.png",
    //       imageSize = new window.kakao.maps.Size(40, 40), // 마커이미지 크기
    //       imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다

    //     //2.마커의 이미지정보를 가지고 있는 마커이미지를 생성
    //     var markerImage = new window.kakao.maps.MarkerImage(
    //       imageSrc,
    //       imageSize,
    //       imageOption
    //     );

    //     //3.마커가 표시될 위치 정의
    //     var markerPosition = new window.kakao.maps.LatLng(
    //       store?.lat,
    //       store?.lng
    //     );

    //     //4. 마커를 생성
    //     var marker = new window.kakao.maps.Marker({
    //       position: markerPosition, //마커의 위치
    //       image: markerImage, //마커 이미지 설정
    //     });

    //     //5. 마커가 지도 위에 표시되도록 설정
    //     marker.setMap(map);

    //     //6.오버레이 구성하기
    //     //마커 커서 오버시 마커 위에 표시할 인포 윈도우를 생성
    //     var content = `<div class="infowindow">${store?.name}</div>`;

    //     //커스텀 오버레이 생성
    //     var customOverlay = new window.kakao.maps.CustomOverlay({
    //       position: markerPosition,
    //       content: content,
    //       xAnchor: 0.6,
    //       yAnchor: 0.91,
    //     });
    //     // 마커에 마우스오버 이벤트를 등록합니다
    //     window.kakao.maps.event.addListener(marker, "mouseover", function () {
    //       // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
    //       customOverlay.setMap(map);
    //     });

    //     // 마커에 마우스아웃 이벤트를 등록합니다
    //     window.kakao.maps.event.addListener(marker, "mouseout", function () {
    //       // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
    //       customOverlay.setMap(null);
    //     });

    //     //클릭 했을 때 선택한 가게를 저장 & 새로운 마커를추가
    //     window.kakao.maps.event.addListener(marker, "click", function () {
    //       setCurrentStore(store);
    //       setLocation({ ...location, lat: store.lat, lng: store.lng });
    //     });
    //   });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, stores, keyword]);

  useEffect(() => {
    loadKakaoMarkers();
    return () =>{
      stores?.map((marker)=>{
        marker.
      })
    }
  }, [loadKakaoMarkers, map]);

  return <></>;
}
