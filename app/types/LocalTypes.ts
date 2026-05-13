import { LatLngTuple } from "leaflet";
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

export interface State {
  currentCity: string;
  searchQuery: string;
  isPanelShown: boolean;
  isABRouteShown: boolean;
  isPickerVisible: boolean;
  isCommentVisible: boolean;
  isCommentEditorVisible: boolean;
  isABMultiRouteShown: boolean;
  isAddPanelShown: boolean;
  isAuthModalShown: boolean;
  routeData?: RouteData;
  pointData?: PointData;
  mapCenter: LatLngTuple;
  mapZoom: number
}

export type Action =
  | { type: 'SET_CITY'; payload: string }
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_PANEL_SHOWN'; payload: boolean }
  | { type: 'SET_ADD_PANEL_SHOWN'; payload: boolean }
  | { type: 'SET_COMMENT_SHOWN'; payload: boolean }
  | { type: 'SET_COMMENT_EDITOR'; payload: boolean }
  | { type: 'SET_AB_ROUTE_SHOWN'; payload: boolean }
  | { type: 'TOGGLE_PICKER'; payload: boolean }
  | { type: 'SET_AB_MULTIROUTE_SHOWN'; payload: boolean }
  | { type: 'SET_ROUTE_DATA'; payload: RouteData }
  | { type: 'SET_POINT_DATA'; payload: PointData }
  | { type: 'SET_MAP_CENTER'; payload: LatLngTuple }
  | { type: 'SET_MAP_SIZE'; payload: number }
  | { type: 'SET_AUTH_SHOWN'; payload: boolean }
