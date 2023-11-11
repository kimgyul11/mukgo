import {
  KakaoStoreType,
  LocationType,
  SearchType,
  StoreType,
} from "@/interface";
import { atom } from "recoil";

const DEFAULT_LAT = "37.497625203";
const DEFAULT_LNG = "127.03088379";
const DEFAULT_ZOOM = 4;

export const mapState = atom<any>({
  key: "map",
  default: null,
  dangerouslyAllowMutability: true,
});

export const currentStoreState = atom<KakaoStoreType | null>({
  key: "store",
  default: null,
  dangerouslyAllowMutability: true,
});

export const locationState = atom<LocationType>({
  key: "location",
  default: {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
    zoom: DEFAULT_ZOOM,
  },
  dangerouslyAllowMutability: true,
});

//검색을 위한 atom
export const searchState = atom<SearchType | null>({
  key: "search",
  default: null,
});

//지도 검색 위한 키워드
export const keyWordState = atom<string | null>({
  key: "keyword",
  default: "",
});

export const markersState = atom<any>({
  key: "markers",
  default: [],
});

export const placesState = atom<any>({
  key: "places",
  default: [],
});

//게시글 작성자 확인을 위한 아톰
export const authorState = atom<number>({
  key: "author",
  default: 0,
});
