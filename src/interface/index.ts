export interface StoreType {
  id: number;
  phone?: string | null;
  address?: string | null;
  lat?: string | null;
  lng?: string | null;
  name?: string | null;
  category?: string | null;
  storeType?: string | null;
  foodCertifyName?: string | null;
  likes?: LikeInterface[];
}
export interface KakaoStoreType {
  id: string;
  place_name?: string;
  lat?: string;
  lng?: string;
  category_group_name?: string;
  road_address_name?: string;
  address_name?: string;
  phone?: string;
  place_url?: string;
  category_name?: string;
}
export interface LikeInterface {
  id: number;
  storeId: number;
  userId: number;
  store?: StoreType;
}
export interface LikeApiResponse {
  data: LikeInterface[];
  totalPage?: number;
  totalCount?: number;
  page?: number;
}

export interface CommentInterface {
  id: number;
  storeId: number;
  userId: number;
  store?: StoreType;
  body: string;
  user?: UserType;
  createdAt: Date;
}
export interface UserType {
  id: number;
  email: string;
  name?: string | null;
  image?: string | null;
}
export interface CommentApiResponse {
  data: CommentInterface[];
  totalPage?: number;
  totalCount?: number;
  page?: number;
}

export interface StoreApiResponse {
  data: StoreType[];
  totalPage?: number;
  totalCount?: number;
  page?: number;
}

export interface LocationType {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

export interface SearchType {
  q?: string;
  district?: string;
}
