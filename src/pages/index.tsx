import { useCallback, useEffect, useState } from "react";

import Map from "@/components/Map";
import Markers from "@/components/Markers";

import StoreBox from "@/components/StoreBox";
import { StoreType } from "@/interface";
import axios from "axios";
import MapSearch from "@/components/MapSearch";
import { useRecoilValue } from "recoil";

import CurrentLocationButton from "@/components/CurrentLocationButton";
import MapContainer from "@/components/MapContainer";
import { keyWordState, locationState, mapState } from "@/atom";

export default function Home({ stores }: { stores: StoreType[] }) {
  const keyword = useRecoilValue(keyWordState);
  return (
    <>
      <div className="w-full h-full min-h-[550px] max-h-[550px] grid md:grid-cols-2 md:p-4">
        <Map />
        <MapContainer />
        <MapSearch />
        {/* <Markers stores={stores} /> */}
      </div>
      <StoreBox />
    </>
  );
}

// export async function getServerSideProps() {
//   const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);

//   return {
//     props: { stores: stores.data },
//   };
// }
