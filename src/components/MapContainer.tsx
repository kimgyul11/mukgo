import {
  currentStoreState,
  keyWordState,
  locationState,
  mapState,
  placesState,
} from "@/atom";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

let markersList: any = [];
const MapContainer = () => {
  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([]);
  const [map, setMap] = useRecoilState(mapState);
  const location = useRecoilValue(locationState);
  const keyword = useRecoilValue(keyWordState);
  const setCurrentStore = useSetRecoilState(currentStoreState);
  const setLocation = useSetRecoilState(locationState);
  const setPlaceState = useSetRecoilState(placesState);

  const removeMarker = useCallback((markersList: any) => {
    for (let i = 0; i < markersList.length; i++) {
      markersList[i].setMap(null);
    }
    markersList = [];
  }, []);
  const displayMarker = useCallback(
    (place: any) => {
      var imageSrc = `/images/markers/pin.png`,
        imageSize = new window.kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
        imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      let marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
        image: markerImage,
      });
      markersList.push(marker);

      //오버레이 구성하기 -- hover할 경우 인포 윈도우 생성
      var content = `<div class="infowindow">${place.place_name}</div>`;
      var markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
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
      window.kakao.maps.event.addListener(marker, "click", function () {
        setCurrentStore(place);
        setLocation({
          lat: place?.x,
          lng: place?.y,
        });
      });
    },
    [map, setCurrentStore, setLocation]
  );
  useEffect(() => {
    if (!map) {
      return;
    }

    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(keyword, placesSearchCB);

    function placesSearchCB(data: any, status: any, pagination: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaceState(data);
        let bounds = new window.kakao.maps.LatLngBounds();
        if (markersList.length > 0) {
          removeMarker(markersList);
          markersList = [];
        }
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination);
        setPlaces(data);
      }
    }

    // 페이지네이션 만드는 함수
    function displayPagination(pagination: any) {
      var paginationEl: any = document.getElementById("pagination"),
        fragment = document.createDocumentFragment(),
        i;

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl?.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        var el: any = document.createElement("a");
        el.href = "#";
        el.innerHTML = i;
        el.className = "paginationBTN";
        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl?.appendChild(fragment);
    }
    return () => {
      setPlaces([]);
    };
  }, [map, keyword, setPlaceState, removeMarker, displayMarker]);

  return <></>;
};

export default MapContainer;
