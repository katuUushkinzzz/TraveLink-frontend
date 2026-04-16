'use client'

import { useEffect, useReducer, useState } from "react";

import SidePanel from "./components/SidePanel/SidePanel";
import CityPicker from "./components/CityPicker/CityPicker";
import SearchBar from "./components/SearchBar/SearchBar";
import { RouteData } from "./components/SidePanel/SidePanelTypes";
import { TestRoutes } from "./components/SidePanel/TestContent";
import { RoutePanel } from "./components/SidePanel/RoutePanel";
import { useLocalStorage, initialState, reducer } from "./components/LocalStore";

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [routes, setRoutes] = useState<RouteData[]>(TestRoutes);
  const [cityName, setCityName] = useLocalStorage('city', 'Москва');

  function getRoutes(page: number, token: string) {
    return fetch(`http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/route/cards/${page}`, {
      headers: {
        "Authorization": 'Bearer ' + token
      }
    }).then(r => r.json().then(j => setRoutes(j)))
  }

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

  useEffect(() => {
    getRoutes(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzYzNDYxNzUsImV4cCI6MTc3NjQzMjU3NX0.3uFt-9N-UH_QHVHjQ2szNFqCHx3NBmnv1aeV-CK_Nx4')
    dispatch({ type: 'SET_CITY', payload: cityName })
  }, [cityName])

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <SidePanel state={state} dispatch={dispatch} routes={routes} toggleLike={toggleLike} />
      <CityPicker state={state} dispatch={dispatch} setCityName={setCityName} />
      <SearchBar state={state} dispatch={dispatch} />
      <RoutePanel state={state} toggleLike={toggleLike} />
    </div>
  );
}
