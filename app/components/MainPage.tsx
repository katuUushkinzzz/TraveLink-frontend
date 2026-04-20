'use client'

import { useReducer, useState, useEffect } from "react";

import CityPicker from "./CityPicker/CityPicker";
import SearchBar from "./SearchBar/SearchBar";
import SidePanel from "./SidePanel/SidePanel";
import { RoutePanel } from "./SidePanel/RoutePanel";
import { TestPoints, TestRoutes } from "./SidePanel/TestContent";
import { reducer, initialState, useLocalStorage } from "./LocalStore";
import { PointData, RouteData } from "./LocalTypes";
import { PointPanel } from "./SidePanel/PointPanel";

export default function MainPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [routes, setRoutes] = useState<RouteData[]>(TestRoutes);
  const [points, setPoints] = useState<PointData[]>(TestPoints);
  const [cityName, setCityName] = useLocalStorage('city', 'Москва');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function getRoutes(page: number, token: string) {
    return fetch(`http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/route/cards/${page}`, {
      headers: {
        "Authorization": 'Bearer ' + token
      }
    }).then(r => r.json().then(j => setRoutes(j)))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function getPoints(page: number, token: string) {
    return fetch(`http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/point/cards/${page}`, {
      headers: {
        "Authorization": 'Bearer ' + token
      }
    }).then(r => r.json().then(j => setPoints(j)))
  }

  function toggleLike(id: number) {
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
  };

  useEffect(() => {
    // getRoutes(2, NEXT_PUBLIC_TEST_KEY)
    dispatch({ type: 'SET_CITY', payload: cityName })
  }, [cityName])

  return (
    <>
      <SidePanel state={state} dispatch={dispatch} routes={routes} points={points} toggleLike={toggleLike} />
      <SearchBar state={state} dispatch={dispatch} />
      <RoutePanel state={state} dispatch={dispatch} toggleLike={toggleLike} />
      <PointPanel state={state} />
      <CityPicker state={state} dispatch={dispatch} setCityName={setCityName} />
    </>
  )
}