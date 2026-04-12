'use client'

import { useReducer, useState } from "react";

import SidePanel from "./components/SidePanel/SidePanel";
import CityPicker from "./components/CityPicker/CityPicker";
import SearchBar from "./components/SearchBar/SearchBar";
import { reducer, RouteData } from "./components/SidePanel/SidePanelTypes";
import { initialState, TestRoutes } from "./components/SidePanel/TestContent";
import { RoutePanel } from "./components/SidePanel/RoutePanel";

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [routes, setRoutes] = useState<RouteData[]>(TestRoutes);

  function toggleLike(id: number | undefined) {
    if (id !== undefined) {
      setRoutes(routes.map(route => {
        if (route.id === id) {
          const isNowLiked = !route.isLiked;
          const updatedRoute = {
            ...route,
            isLiked: isNowLiked,
            likeCount: isNowLiked ? route.likeCount + 1 : route.likeCount - 1
          };

          if (state.routeData?.id === id) {
            dispatch({ type: 'SET_ROUTE_DATA', payload: updatedRoute })
          }

          return updatedRoute;
        }
        return route;
      }));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <SidePanel state={state} dispatch={dispatch} routes={routes} toggleLike={toggleLike}/>
      <CityPicker state={state} dispatch={dispatch} />
      <SearchBar state={state} dispatch={dispatch} />
      <RoutePanel state={state} toggleLike={toggleLike} />
    </div>
  );
}
