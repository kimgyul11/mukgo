import { mapState } from "@/atom";
import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import FullPageLoader from "./FullPageLoader";

export default function CurrentLocationButton() {
  const [loading, setLoading] = useState<boolean>(false);
  const map = useRecoilValue(mapState);
  const hadnleCurrentPosition = () => {
    setLoading(true);

    //위치 가져오기
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: Infinity, //캐싱과 관련된 옵션
    };
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPosition = new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          if (currentPosition) {
            setLoading(false);
            map.panTo(currentPosition);
            toast.success("현재 위치로 이동합니다!");
          }
        },
        () => {
          setLoading(false);
          toast.error("에러가 발생했습니다.");
        },
        options
      ); //1.성공했을 때, 2.실패했을때 3.옵션
    }
  };
  return (
    <>
      {loading && <FullPageLoader />}
      <button
        type="button"
        onClick={hadnleCurrentPosition}
        className="absolute z-10 p-2 shadow right-2  bottom-5 text-white  bg-blue-600 rounded-md hover:shadow-lg focus:shadow-lg hover:bg-blue-400 bor"
      >
        <CiLocationOn className="w-7 h-7 " />
      </button>
    </>
  );
}
