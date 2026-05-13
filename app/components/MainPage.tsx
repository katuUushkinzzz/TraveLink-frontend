'use client'

import { useReducer, useState, useEffect } from "react";
import dynamic from "next/dynamic";

import CityPicker from "./CityPicker/CityPicker";
import SearchBar from "./SearchBar/SearchBar";
import SidePanel from "./SidePanel/SidePanel";
import { RoutePanel } from "./SidePanel/RoutePanel";
import { TestPoints, TestRoutes } from "../data/TestContent";
import { reducer, initialState, useLocalStorage, useRoutes } from "../data/LocalStore";
import { PointData } from "../types/LocalTypes";
import { PointPanel } from "./SidePanel/PointPanel";
import CommentSection from "./CommentSection/CommentSection";
import CommentEditor from "./CommentSection/CommentEditor";
import AuthModal from "./Login/Login";

const Map = dynamic(() => import('./Map/Map'), {
  ssr: false
});

export default function MainPage({ authToken }: { authToken: string | null }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { routes, setRoutes, fetchRoutes } = useRoutes(TestRoutes);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [points, setPoints] = useState<PointData[]>(TestPoints);
  const [cityName, setCityName] = useLocalStorage('city', 'Москва');

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
    console.log(authToken)

    if (authToken) {
      fetchRoutes(0, authToken)
    }
    else {
      dispatch({ type: 'SET_AUTH_SHOWN', payload: true })
    }

    dispatch({ type: 'SET_CITY', payload: cityName })
  }, [authToken, cityName, fetchRoutes])

  return (
    <>
      <Map state={state} dispatch={dispatch} />
      <SidePanel state={state} dispatch={dispatch} routes={routes} points={points} toggleLike={toggleLike} />
      <SearchBar state={state} dispatch={dispatch} />
      <RoutePanel state={state} dispatch={dispatch} toggleLike={toggleLike} />
      <PointPanel state={state} dispatch={dispatch} />
      <CityPicker state={state} dispatch={dispatch} setCityName={setCityName} />
      <CommentSection state={state} dispatch={dispatch} />
      <CommentEditor state={state} dispatch={dispatch} />
      <AuthModal state={state} dispatch={dispatch} />
    </>
  )
}