import { StaticImport } from "next/dist/shared/lib/get-img-props"

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
    points: PointContents[]
    isLiked: boolean
    image: string
}

export interface PointContents {
    pointName: string
    pointType: string
    pointLocation: string
    pointDescription: string
    image: string,
    pointRating: number
    ratingCount: number
    nextDistance?: number
    nextTime?: number
    isFav?: boolean
}

export interface State {
    isPickerVisible: boolean;
    currentCity: string;
    isPanelShown: boolean;
    isABRouteShown: boolean;
    routeData?: RouteData;
}

export type Action =
    | { type: 'TOGGLE_PICKER'; payload?: boolean }
    | { type: 'SET_CITY'; payload: string }
    | { type: 'SET_PANEL_SHOWN'; payload: boolean }
    | { type: 'SET_AB_ROUTE_SHOWN'; payload: boolean }
    | { type: 'SET_ROUTE_DATA'; payload?: RouteData };
