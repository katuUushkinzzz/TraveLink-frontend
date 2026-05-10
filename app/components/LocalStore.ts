import { State, Action, RouteData } from "./LocalTypes";
import { useCallback, useState } from 'react';

export const initialState: State = {
  isPickerVisible: false,
  isABRouteShown: false,
  isCommentVisible: false,
  isCommentEditorVisible: false,
  isABMultiRouteShown: false,
  isPanelShown: true,
  currentCity: '',
  searchQuery: '',
  routeData: undefined,
  pointData: undefined
}

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
    default:
      return state;
  }
}

export function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  function setValue(value: string) {
    try {
      setStoredValue(value);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) { }
  };

  return [storedValue, setValue];
}

export function useRoutes(initialValue: RouteData[] = []) {
  const [routes, setRoutes] = useState<RouteData[]>(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchRoutes = useCallback(async (page: number, token: string) => {
    const baseUrl = `http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}`;
    const url = `${baseUrl}/route/cards/${page}`;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();

      setRoutes((prev) => (page === 1 ? json : [...prev, ...json]));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { routes, setRoutes, isLoading, error, fetchRoutes };
}