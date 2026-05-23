'use client'

import { useReducer, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import CityPicker from "./CityPicker/CityPicker";
import SearchBar from "./SearchBar/SearchBar";
import SidePanel from "./SidePanel/SidePanel";
import RoutePanel from "./SidePanel/RoutePanel";
import PointPanel from "./SidePanel/PointPanel";
import CommentSection from "./CommentSection/CommentSection";
import CommentEditor from "./CommentSection/CommentEditor";
import AuthModal from "./Login/Login";

import { useLocalStorage } from "@/utils/useLocalStore";
import { initialState, reducer } from "@/utils/reducer";
import usePoints from "@/utils/usePoints";
import useRoutes from "@/utils/useRoutes";

const Map = dynamic(() => import('./Map/Map'), {
  ssr: false
});

export default function MainPage({ authToken }: { authToken: string | null }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { routes, setRoutes, fetchRoutes, isLoading: isRoutesLoading } = useRoutes();
  const pointUtils = usePoints([], state, dispatch);
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

  const { fetchPoints } = pointUtils;

  useEffect(() => {
    if (authToken) {
      fetchRoutes(0, authToken)
      fetchPoints(0)

      dispatch({ type: 'SET_AUTHORIZED', payload: true })
    }
    else {
      dispatch({ type: 'SET_AUTH_SHOWN', payload: true })
    }
  }, [authToken, fetchPoints, fetchRoutes])

  useEffect(() => {
    dispatch({ type: 'SET_CITY', payload: cityName })
  }, [cityName])

  return (
    <>
      <Map state={state} dispatch={dispatch} />

      <button className="authButton" onClick={() => { if (!state.isAuthorized) dispatch({ type: 'SET_AUTH_SHOWN', payload: true }) }}>
        <Image src={'/auth-window/person.svg'} width={28} height={34} alt="" />
      </button>

      <SidePanel state={state} dispatch={dispatch}
        routes={routes} isRoutesLoading={isRoutesLoading}
        pointUtils={pointUtils}
        toggleLike={toggleLike} />
      <SearchBar state={state} dispatch={dispatch} pointUtils={pointUtils} />
      <RoutePanel state={state} dispatch={dispatch} toggleLike={toggleLike} />
      <PointPanel state={state} dispatch={dispatch} />
      <CityPicker state={state} dispatch={dispatch} setCityName={setCityName} />
      <CommentSection state={state} dispatch={dispatch} />
      <CommentEditor state={state} dispatch={dispatch} />
      <AuthModal state={state} dispatch={dispatch} />
    </>
  )
}