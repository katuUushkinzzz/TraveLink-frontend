import { State, Action } from "./LocalTypes";
import { useState } from 'react';

export const initialState: State = {
  isPickerVisible: false,
  isABRouteShown: false,
  isABMultiRouteShown: false,
  isPanelShown: true,
  currentCity: '',
  routeData: undefined,
}

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
    case 'SET_AB_MULTIROUTE_SHOWN':
      return { ...state, isABMultiRouteShown: action.payload };
    case 'SET_ROUTE_DATA':
      return { ...state, routeData: action.payload };
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