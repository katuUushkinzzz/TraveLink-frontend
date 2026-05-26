import { RouteData, PointData } from "@/types/localTypes";

export interface State {
  currentCity: string;
  searchQuery: string;
  isPanelShown: boolean;
  isABRouteShown: boolean;
  isPickerVisible: boolean;
  isCommentVisible: boolean;
  isCommentEditorVisible: boolean;
  isABMultiRouteShown: boolean;
  isAddPanelShown: number;
  isAuthModalShown: boolean;
  isAuthorized: boolean;
  isSearching: boolean;
  routeData?: RouteData;
  pointData?: PointData;
  activePointId: number | undefined;
}

export const initialState: State = {
  isPickerVisible: false,
  isABRouteShown: false,
  isCommentVisible: false,
  isCommentEditorVisible: false,
  isABMultiRouteShown: false,
  isPanelShown: true,
  isAddPanelShown: 0,
  isAuthModalShown: false,
  isAuthorized: false,
  isSearching: false,
  currentCity: '',
  searchQuery: '',
  routeData: undefined,
  pointData: undefined,
  activePointId: undefined,
}

export type Action =
  | { type: 'SET_CITY'; payload: string }
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_PANEL_SHOWN'; payload: boolean }
  | { type: 'SET_ADD_PANEL_SHOWN'; payload: 0 | 1 | 2 }
  | { type: 'SET_COMMENT_SHOWN'; payload: boolean }
  | { type: 'SET_COMMENT_EDITOR'; payload: boolean }
  | { type: 'SET_AB_ROUTE_SHOWN'; payload: boolean }
  | { type: 'TOGGLE_PICKER'; payload: boolean }
  | { type: 'SET_AB_MULTIROUTE_SHOWN'; payload: boolean }
  | { type: 'SET_ROUTE_DATA'; payload: RouteData | undefined }
  | { type: 'SET_POINT_DATA'; payload: PointData }
  | { type: 'SET_AUTH_SHOWN'; payload: boolean }
  | { type: 'SET_AUTHORIZED'; payload: boolean }
  | { type: 'SET_SEARCHING'; payload: boolean }
  | { type: 'SET_ACTIVE_POINT'; payload: number | undefined }

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'TOGGLE_PICKER':
      return { ...state, isPickerVisible: action.payload ?? !state.isPickerVisible };
    case 'SET_CITY':
      return { ...state, currentCity: action.payload };
    case 'SET_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_PANEL_SHOWN':
      return { ...state, isPanelShown: action.payload };
    case 'SET_ADD_PANEL_SHOWN':
      return { ...state, isAddPanelShown: action.payload };
    case 'SET_COMMENT_SHOWN':
      return { ...state, isCommentVisible: action.payload };
    case 'SET_COMMENT_EDITOR':
      return { ...state, isCommentEditorVisible: action.payload }
    case 'SET_AB_ROUTE_SHOWN':
      return { ...state, isABRouteShown: action.payload };
    case 'SET_AB_MULTIROUTE_SHOWN':
      return { ...state, isABMultiRouteShown: action.payload };
    case 'SET_ROUTE_DATA':
      return { ...state, routeData: action.payload };
    case 'SET_POINT_DATA':
      return { ...state, pointData: action.payload };
    case 'SET_AUTH_SHOWN':
      return { ...state, isAuthModalShown: action.payload };
    case 'SET_AUTHORIZED':
      return { ...state, isAuthorized: action.payload };
    case 'SET_SEARCHING':
      return { ...state, isSearching: action.payload };
    case 'SET_ACTIVE_POINT':
      return { ...state, activePointId: action.payload };
    default:
      return state;
  }
}