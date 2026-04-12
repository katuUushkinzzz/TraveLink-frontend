import { StaticImport } from "next/dist/shared/lib/get-img-props"

export interface RouteData {
    id: number
    author: string
    authorPfp: string | StaticImport
    creationDate: string
    routeName: string
    likeCount: number
    commentCount: number
    routePanelDescriptionription: string
    routePanelTags: string[]
    points: PointContents[]
    isLiked: boolean
    image: string
}

export interface PointContents {
    pointName: string
    pointType: string
    pointLocation: string
    pointRating: number
    ratingCount: number
    pointDescription: string
    nextDistance?: number
    nextTime?: number
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

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'TOGGLE_PICKER':
      return { ...state, isPickerVisible: action.payload ?? !state.isPickerVisible };
    case 'SET_CITY':
      return { ...state, currentCity: action.payload };
    case 'SET_PANEL_SHOWN':
      return { ...state, isPanelShown: action.payload };
    case 'SET_AB_ROUTE_SHOWN':
      return { ...state, isABRouteShown: action.payload };
    case 'SET_ROUTE_DATA':
      return { ...state, routeData: action.payload };
    default:
      return state;
  }
}
