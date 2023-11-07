import { useCallback, useEffect, useState } from "react";

import Map from "@/components/Map";
import Markers from "@/components/Markers";

import StoreBox from "@/components/StoreBox";
import { StoreType } from "@/interface";
import axios from "axios";
import MapSearch from "@/components/MapSearch";
import { useRecoilValue } from "recoil";
import { keyWord, mapState } from "@/atom";
import CurrentLocationButton from "@/components/CurrentLocationButton";

export default function Home({ stores }: { stores: StoreType[] }) {
  // const [markers, setMarkers] = useState<any>([]);
  // const keyword = useRecoilValue(keyWord);

  // const map = useRecoilValue(mapState);

  // const searchMap = useCallback(() => {
  //   let markers: any = [];
  //   if (map) {
  //     const ps = new window.kakao.maps.services.Places();
  //     ps.keywordSearch(
  //       keyword, //키워드를 동적으로 받아야함
  //       (data: any, status: any, _pagination: any) => {
  //         if (status === window.kakao.maps.services.Status.OK) {
  //           // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
  //           // LatLngBounds 객체에 좌표를 추가합니다
  //           const bounds = new window.kakao.maps.LatLngBounds();
  //           console.log(markers?.length);

  //           for (var i = 0; i < data.length; i++) {
  //             // @ts-ignore
  //             markers.push({
  //               position: {
  //                 lat: data[i].y,
  //                 lng: data[i].x,
  //               },

  //               content: data[i].place_name,
  //               category: data[i].category_group_name,
  //               phone: data[i].phone,
  //               url: data[i].place_url,
  //               road_address_name: data[i].road_address_name,
  //             });
  //             // @ts-ignore
  //             bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
  //           }

  //           setMarkers(markers);

  //           // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  //           map.setBounds(bounds);
  //         }
  //       }
  //     );
  //   }
  // }, [keyword, map]);
  // useEffect(() => {
  //   searchMap();
  // }, [searchMap, keyword]);

  return (
    <>
      {/* <MapSearch /> */}
      <Map />
      <Markers stores={stores} />
      <StoreBox />
      <CurrentLocationButton />
    </>
  );
}

export async function getServerSideProps() {
  const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);

  return {
    props: { stores: stores.data },
  };
}
