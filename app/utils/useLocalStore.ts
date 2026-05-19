import { useState } from 'react';

import { State } from "./reducer";

export const initialState: State = {
  isPickerVisible: false,
  isABRouteShown: false,
  isCommentVisible: false,
  isCommentEditorVisible: false,
  isABMultiRouteShown: false,
  isPanelShown: true,
  isAddPanelShown: false,
  isAuthModalShown: false,
  isAuthorized: false,
  currentCity: '',
  searchQuery: '',
  routeData: undefined,
  pointData: undefined,
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
