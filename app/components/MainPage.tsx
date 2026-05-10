'use client'

import { useReducer, useState, useEffect } from "react";

import CityPicker from "./CityPicker/CityPicker";
import SearchBar from "./SearchBar/SearchBar";
import SidePanel from "./SidePanel/SidePanel";
import { RoutePanel } from "./SidePanel/RoutePanel";
import { TestPoints, TestRoutes } from "./SidePanel/TestContent";
import { reducer, initialState, useLocalStorage, useRoutes } from "./LocalStore";
import { PointData } from "./LocalTypes";
import { PointPanel } from "./SidePanel/PointPanel";
import CommentSection from "./CommentSection/CommentSection";
import CommentEditor from "./CommentSection/CommentEditor";

export default function MainPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { routes, setRoutes, fetchRoutes } = useRoutes(TestRoutes);
  const [points, setPoints] = useState<PointData[]>(TestPoints);
  const [cityName, setCityName] = useLocalStorage('city', 'Москва');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function getPoints(page: number, token: string) {
    return fetch(`http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/point/cards/${page}`, {
      headers: {
        "Authorization": 'Bearer ' + token
      }
    })
      .then(r => { console.log(r); return r.json() })
      .then(j => setPoints(j))
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
    fetchRoutes(0, process.env.NEXT_PUBLIC_TEST_KEY as string)
    // getRoutes(0, process.env.NEXT_PUBLIC_TEST_KEY as string)
    dispatch({ type: 'SET_CITY', payload: cityName })
  }, [cityName, fetchRoutes])

  return (
    <>
      <SidePanel state={state} dispatch={dispatch} routes={routes} points={points} toggleLike={toggleLike} />
      <SearchBar state={state} dispatch={dispatch} />
      <RoutePanel state={state} dispatch={dispatch} toggleLike={toggleLike} />
      <PointPanel state={state} dispatch={dispatch} />
      <CityPicker state={state} dispatch={dispatch} setCityName={setCityName} />
      <CommentSection state={state} dispatch={dispatch} />
      <CommentEditor state={state} dispatch={dispatch} />
    </>
  )
}