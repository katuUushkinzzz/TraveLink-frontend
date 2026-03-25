'use client'

import SearchBar from "./components/SearchBar/SearchBar";
import { RouteData, RoutePanel } from "./components/SidePanel/RoutePanel";
import SidePanel from "./components/SidePanel/SidePanel";
import { useRef, useState } from "react";

export default function Home() {
  const [isPanelShown, setPanelShown] = useState(true);
  const [routeData, setRouteData] = useState<RouteData>();
  const sidePanelRef = useRef<HTMLDivElement>(null);
  const [routes, setRoutes] = useState<RouteData[]>([
      {
          id: 0,
          author: 'Jonh Doe',
          authorPfp: '/search-window/checker.png',
          creationDate: '01 января 1970',
          routeName: 'Placeholder Route' ,
          routeDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
          routeTags: ['test1', 'test2', 'test3', 'test4'],
          likeCount: 1337,
          commentCount: 420,
          points: [{
            pointName: 'Парк Альпак Пача Мама',
            pointType: 'Парк',
            pointLocation: 'пр-кт Сельмаш, 1А Парк культуры и отдыха им. Николая Островского, Ростов-на-Дону',
            pointRating: 4.9,
            ratingCount: 912,
            pointDescription: 'Пача Мама - уютный уголок природы в Ростове-на-Дону, где обитают милые альпаки из Перу, ласковые кролики и ручные козы. Ко всем животным можно зайти в вольеры, покормить, погладить и даже обнять! Зарядитесь альпакотерапией и порцией позитива!',
            nextDistance: 1160,
            nextTime: 13
          },
          {
            pointName: 'Парк Альпак Пача Мама',
            pointType: 'Парк',
            pointLocation: 'пр-кт Сельмаш, 1А Парк культуры и отдыха им. Николая Островского, Ростов-на-Дону',
            pointRating: 4.9,
            ratingCount: 912,
            pointDescription: 'Пача Мама - уютный уголок природы в Ростове-на-Дону, где обитают милые альпаки из Перу, ласковые кролики и ручные козы. Ко всем животным можно зайти в вольеры, покормить, погладить и даже обнять! Зарядитесь альпакотерапией и порцией позитива!',
            nextDistance: 1160,
            nextTime: 13
          },
          {
            pointName: 'Парк Альпак Пача Мама',
            pointType: 'Парк',
            pointLocation: 'пр-кт Сельмаш, 1А Парк культуры и отдыха им. Николая Островского, Ростов-на-Дону',
            pointRating: 4.9,
            ratingCount: 912,
            pointDescription: 'Пача Мама - уютный уголок природы в Ростове-на-Дону, где обитают милые альпаки из Перу, ласковые кролики и ручные козы. Ко всем животным можно зайти в вольеры, покормить, погладить и даже обнять! Зарядитесь альпакотерапией и порцией позитива!',
          }],
          isLiked: false,
          image: '/search-window/checker.png'
      },
      {
          id: 1,
          author: 'Jane Doe',
          authorPfp: '/search-window/checker.png',
          creationDate: '02 января 1970',
          routeName: 'New Placeholder Route' ,
          routeDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
          routeTags: ['test4', 'test3', 'test2', 'test1'],
          likeCount: 228,
          commentCount: 413,
          points: [],
          isLiked: false,
          image: '/search-window/checker.png'
      }
  ]);

  const toggleLike = (id: number) => {
      setRoutes(routes.map(route => {
          if (route.id === id) {
              const isNowLiked = !route.isLiked;
              const updatedRoute = {
                  ...route,
                  isLiked: isNowLiked,
                  likeCount: isNowLiked ? route.likeCount + 1 : route.likeCount - 1
              };

              if (routeData?.id === id) {
                  setRouteData(updatedRoute)
              }

              return updatedRoute;
          }
          return route;
      }));
    };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <SidePanel
        isPanelShown={isPanelShown}
        setRouteData={setRouteData}
        sidePanelRef={sidePanelRef}
        routes={routes}
        onLiked={toggleLike} />
      <SearchBar setPanelShown={setPanelShown} isPanelShown={isPanelShown}/>
      <RoutePanel sidePanelRef={sidePanelRef} routeData={routeData} onLiked={() => toggleLike(routeData?.id as number)}/>
    </div>
  );
}
