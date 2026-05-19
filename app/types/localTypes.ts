import { StaticImport } from "next/dist/shared/lib/get-img-props"

export type Category =
  | 'architecture'
  | 'restaurants'
  | 'parks'
  | 'medicine'
  | 'products'
  | 'shopping'
  | 'leisure'
  | 'hotels'
  | 'entertainment'
  | 'coffee'
  | 'beach'
  | 'beauty';

interface RawPinData {
  id: number;
  lat: number;
  lng: number;
}

export interface PinData extends RawPinData {
  category: Category;
};

export interface StopData extends RawPinData {
  order: number
}

export interface RouteData {
  id: number
  author: string
  authorPfp: string | StaticImport
  creationDate: string
  routeName: string
  likeCount: number
  commentCount: number
  routeDescription: string
  routeTags: string[]
  points: PointData[]
  stops: StopData[]
  isLiked: boolean
  image: string
}

export interface PointData {
  id: number
  pointName: string
  pointType: string
  pointLocation: string
  pointDescription: string
  image: string,
  pointRating: number
  ratingCount: number
  imageCarousel?: string[]
  nextDistance?: number
  nextTime?: number
}
