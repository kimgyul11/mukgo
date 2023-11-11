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
  id: number;
  place_name?: string | null;
  lat?: string | null;
  lng?: string | null;
  category_group_name?: string | null;
  road_address_name?: string | null;
  address_name?: string | null;
  phone?: string | null;
  place_url?: string | null;
  category_name?: string | null;
  content?: string | null;
  userId: number;
  star?: number | null;
  user?: UserType;
}
export interface LikeInterface {
  id: number;
  storeId: number;
  userId: number;
  store?: KakaoStoreType;
}
export interface LikeApiResponse {
  data: LikeInterface[];
  totalPage?: number;
  totalCount?: number;
  page?: number;
}

export interface CommentInterface {
  id: number;
  storeId?: number;
  userId: number;
  store?: StoreType;
  body: string;
  user?: UserType;
  createdAt: Date;
  replies?: CommentInterface[];
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
  starScore?: string;
}
