import { ActionDispatch, useEffect, useState } from 'react'
import Image from 'next/image'
import React from 'react'

import RouteCard from '../Cards/RouteCard'
import PointCard from '../Cards/PointCard'
import Loader from '../Loading/Loading'

import { State, Action } from '@/utils/reducer'
import { PointUtils } from '@/utils/usePoints'
import { PointData, RouteData } from '@/types/localTypes'

import './SidePanel.css'
import { RouteUtils } from '@/app/utils/useRoutes'

export default function SidePanel({ state, dispatch, routeUtils, pointUtils, toggleLike }:
  {
    state: State, dispatch: ActionDispatch<[action: Action]>,
    routeUtils: RouteUtils, pointUtils: PointUtils, toggleLike(id: number | undefined): void
  }) {
  const [currentRecTab, setRecTab] = useState(0);
  const [lastScrollTop, setlastScrollTop] = useState(0);
  const [nextPage, setNextPage] = useState([1, 1]);
  const [multiPoints, setMultiPoints] = useState(['', '', '']);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  function showRoutePanel(contents: RouteData) {
    dispatch({ type: 'SET_ROUTE_DATA', payload: contents })
    dispatch({ type: 'SET_ADD_PANEL_SHOWN', payload: 1 })
  }

  function showPointPanel(contents: PointData) {
    dispatch({ type: 'SET_POINT_DATA', payload: contents })
    dispatch({ type: 'SET_ADD_PANEL_SHOWN', payload: 2 })
  }

  function showCommentSection(contents: PointData) {
    dispatch({ type: 'SET_POINT_DATA', payload: contents })
    dispatch({ type: 'SET_COMMENT_SHOWN', payload: true })
  }

  function addSearchPoint() {
    if (!state.isABMultiRouteShown) dispatch({ type: 'SET_AB_MULTIROUTE_SHOWN', payload: true })
    else {
      const newPoints = [...multiPoints];
      newPoints.splice(multiPoints.length - 1, 0, '');
      setMultiPoints(newPoints);
    }
  }

  function resetSearchPoints() {
    if (state.isABMultiRouteShown) dispatch({ type: 'SET_AB_MULTIROUTE_SHOWN', payload: false });
    else {
      (document.getElementById('fromPoint') as HTMLInputElement).value = '';
      (document.getElementById('toPoint') as HTMLInputElement).value = ''
    }

    setMultiPoints(['', '', ''])
  }

  function swapSearchPoints() {
    const newPoints = [...multiPoints];
    const fromPoint = newPoints[0];

    newPoints[0] = newPoints[newPoints.length - 1];
    newPoints[newPoints.length - 1] = fromPoint;

    setMultiPoints(newPoints);
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>, index: number) {
    e.preventDefault();
    if (draggedItemIndex === index || draggedItemIndex === null) return;

    const newPoints = [...multiPoints];
    const draggedItem = newPoints[draggedItemIndex];

    newPoints.splice(draggedItemIndex, 1);
    newPoints.splice(index, 0, draggedItem);

    setDraggedItemIndex(index);
    setMultiPoints(newPoints);
  };

  function onScrollEnd(event: React.UIEvent<HTMLDivElement, UIEvent>) {
    if (event.currentTarget.scrollTop < lastScrollTop) {
      return;
    }
    setlastScrollTop(event.currentTarget.scrollTop <= 0 ? 0 : event.currentTarget.scrollTop);
    console.log(event.currentTarget.scrollTop, event.currentTarget.offsetHeight, event.currentTarget.scrollHeight)
    if (event.currentTarget.scrollTop + event.currentTarget.offsetHeight >= event.currentTarget.scrollHeight) {
      if (currentRecTab === 0) {
        if (state.isSearching) {
          // TODO: Searching by pages
        }
        else {
          routeUtils.fetchRoutes(nextPage[0])
        }
        setNextPage([nextPage[0] + 1, nextPage[1]])
      }
      else {
        if (state.isSearching) {
          // TODO: Searching by pages
        }
        else {
          pointUtils.fetchPoints(nextPage[1])
        }
        setNextPage([nextPage[0], nextPage[1] + 1])
      }
    }
  }

  useEffect(/* Show pannel */() => {
    if (state.isPanelShown)
      document.getElementById('sidePanelContainer')?.classList.remove('sidePanelHidden')
    else
      document.getElementById('sidePanelContainer')?.classList.add('sidePanelHidden')

    if (state.isAddPanelShown === 1) {
      document.getElementById('pointPanelContainer')?.classList.add('sidePanelHidden')
      document.getElementById('routePanelContainer')?.classList.remove('sidePanelHidden')
    }
    else if (state.isAddPanelShown === 2) {
      document.getElementById('routePanelContainer')?.classList.add('sidePanelHidden')
      document.getElementById('pointPanelContainer')?.classList.remove('sidePanelHidden')
    }
    else {
      document.getElementById('routePanelContainer')?.classList.add('sidePanelHidden')
      document.getElementById('pointPanelContainer')?.classList.add('sidePanelHidden')
    }
  }, [state.isAddPanelShown, state.isPanelShown]);

  useEffect(/* Get user profile */() => {
    const baseUrl = `http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}`;
    const url = `${baseUrl}/user/get/${state.userId}`;

    if (state.isProfileShown) {
      console.log({
        method: "GET",
        headers: {
          "Authorization": `Bearer ${state.authToken}`,
          "Content-Type": "application/json",
        },
      })

      fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${state.authToken}`,
          "Content-Type": "application/json",
        },
      })
        .then(r => r.json())
        .then(j => console.log(j));
    }
  }, [state.authToken, state.isProfileShown, state.userId])

  return (
    <div id="sidePanelContainer" className="sidePanelContainer">
      <div className='sidePanelScrollArea' onScrollEnd={e => onScrollEnd(e)} style={{ paddingTop: state.isSearching ? '0px' : '10px' }}>
        {!state.isSearching && <>
          {state.isABRouteShown && <div className='sidePanelABRouteContainer'>
            <header>
              {!state.isABMultiRouteShown &&
                <ABSearchSection multiPoints={multiPoints} setMultiPoints={setMultiPoints} swapSearchPoints={swapSearchPoints} />
              }
              {state.isABMultiRouteShown &&
                <ABMultiSearchSection multiPoints={multiPoints} setMultiPoints={setMultiPoints}
                  setDraggedItemIndex={setDraggedItemIndex} onDragOver={onDragOver} />
              }
            </header>
            <footer>
              <button className='txt' onClick={() => addSearchPoint()}>
                <Image alt="" src="/search-window/plus.png" width={35} height={35} className='img' />
                Добавить
              </button>
              <button className='txt' onClick={() => resetSearchPoints()}>
                Сбросить
              </button>
            </footer>
          </div>}

          <h1 className="h1 txt"><button onClick={() => dispatch({ type: 'TOGGLE_PICKER', payload: true })}>{state.currentCity}</button></h1>
          <h3 className="h3 txt">Категории</h3>
          <CategoryButtonSection />

          <h1 className="h1 txt">Рекомендации</h1>
        </>}

        <div className="recommendsContainer">
          <div className='recommendsTabs'>
            <input onChange={() => setRecTab(0)} id='recommendsTabRoutes' type='radio' name='tabs' defaultChecked={currentRecTab === 0} />
            <label htmlFor='recommendsTabRoutes' className='txt recommendsTab'>Маршруты</label>

            <input onChange={() => setRecTab(1)} id='recommendsTabPoints' type='radio' name='tabs' defaultChecked={currentRecTab === 1} />
            <label htmlFor='recommendsTabPoints' className='txt recommendsTab'>Места</label>
          </div>
          {currentRecTab === 0 && <div className='recommendsCards'>
            {routeUtils.routes.map(route => (
              <RouteCard
                key={route.id}
                routeData={route}
                onClick={() => showRoutePanel(route)}
                onLiked={() => toggleLike(route.id)}
                dispatch={dispatch}
              />
            ))}
            {routeUtils.isLoading && <Loader />}
          </div>}
          {currentRecTab === 1 && <div className='recommendsCards'>
            {pointUtils.points.map(point => (
              <PointCard
                key={point.id}
                pointData={point}
                onClick={() => { showPointPanel(point); dispatch({ type: 'SET_ACTIVE_POINT', payload: point.id }) }}
                onComment={() => showCommentSection(point)}
              />
            ))}
            {pointUtils.isLoading && <Loader />}
          </div>}
        </div>
      </div>
    </div>
  )
}

function CategoryButton({ categoryName, image, color, categoryId }: { categoryName: string, image: string, color: string, categoryId: string }) {
  return (
    <button className="categoryButton" onClick={() => {
      // TODO: Make category sorting work
      console.log(`[Debug] Sorted search results by category '${categoryId}'`)
    }}>
      <div className="categoryImage" style={{ backgroundColor: color }}>
        <Image alt="" src={image} width={45} height={45} />
      </div>
      <span>{categoryName}</span>
    </button>
  )
}

function CategoryButtonSection() {
  return (
    <div className="sidePanelCategories">
      <CategoryButton categoryId='restaurants' categoryName="Рестораны" image="/search-window/category-icons/restaurant-cat-icon.png" color="#FE8E43" />
      <CategoryButton categoryId='architechture' categoryName="Архитектура" image="/search-window/category-icons/architechture-cat-icon.png" color="#FFE898" />
      <CategoryButton categoryId='parks' categoryName="Парки" image="/search-window/category-icons/park-cat-icon.png" color="#85DB85" />
      <CategoryButton categoryId='medicine' categoryName="Медицина" image="/search-window/category-icons/medicine-cat-icon.png" color="#FF7070" />
      <CategoryButton categoryId='groceries' categoryName="Продукты" image="/search-window/category-icons/groceries-cat-icon.png" color="#FE8E43" />
      <CategoryButton categoryId='malls' categoryName="Торговые центры" image="/search-window/category-icons/mall-cat-icon.png" color="#67999C" />
      <CategoryButton categoryId='rest' categoryName="Отдых" image="/search-window/category-icons/rest-cat-icon.png" color="#FF7070" />
      <CategoryButton categoryId='laudries' categoryName="Отели" image="/search-window/category-icons/hotel-cat-icon.png" color="#67999C" />
      <CategoryButton categoryId='ent' categoryName="Развлечения" image="/search-window/category-icons/ent-cat-icon.png" color="#CB3466" />
      <CategoryButton categoryId='cafes' categoryName="Кофейни" image="/search-window/category-icons/cafe-cat-icon.png" color="#BE8667" />
      <CategoryButton categoryId='beaches' categoryName="Пляжи" image="/search-window/category-icons/beach-cat-icon.png" color="#FFE897" />
      <CategoryButton categoryId='beauty' categoryName="Салоны красоты" image="/search-window/category-icons/beauty-cat-icon.png" color="#FF7070" />
    </div>
  )
}

function ABSearchSection({ multiPoints, setMultiPoints, swapSearchPoints }:
  {
    multiPoints: string[], setMultiPoints: (points: string[]) => void, swapSearchPoints: () => void
  }) {
  return (<>
    <div className='sidePanelABRouteInputs'>
      <h2 className='txt'>Откуда</h2>
      <input id='fromPoint' type='search' placeholder='Введите адрес' className='txt' value={multiPoints[0]}
        onChange={(e) => {
          const newPoints = [...multiPoints];
          newPoints[0] = e.target.value;
          setMultiPoints(newPoints);
        }}
      />
      <h2 className='txt'>Куда</h2>
      <input id='toPoint' type='search' placeholder='Введите адрес' className='txt' value={multiPoints[multiPoints.length - 1]}
        onChange={(e) => {
          const newPoints = [...multiPoints];
          newPoints[newPoints.length - 1] = e.target.value;
          setMultiPoints(newPoints);
        }}
      />
    </div>
    <button onClick={() => swapSearchPoints()}>
      <Image alt="" src="/search-window/switch.png" width={30} height={30} className='img' />
    </button>
  </>)
}

function ABMultiSearchSection({ multiPoints, setMultiPoints, setDraggedItemIndex, onDragOver }:
  {
    multiPoints: string[], setMultiPoints: (points: string[]) => void,
    setDraggedItemIndex: (index: number | null) => void, onDragOver: (e: React.DragEvent<HTMLDivElement>, index: number) => void,
  }) {
  return (
    <div className='sidePanelABRouteInputs'>
      <h2 className='txt'>Откуда</h2>
      {multiPoints.map((point, index) => {
        return (
          <React.Fragment key={index}>
            {index === multiPoints.length - 1 && <h2 className='txt'>Куда</h2>}
            <div className='sidePanelABRouteInput'>
              <input id='fromPoint' type='search' placeholder='Введите адрес' className='txt'
                value={point}
                onChange={(e) => {
                  const newPoints = [...multiPoints];
                  newPoints[index] = e.target.value;
                  setMultiPoints(newPoints);
                }}
              />
              <div draggable
                onDragStart={() => setDraggedItemIndex(index)}
                onDragOver={(e) => onDragOver(e, index)}
                onDragEnd={() => setDraggedItemIndex(null)}
              >
                <Image src='/search-window/handle.png' alt='' width={30} height={30} draggable={false} />
              </div>
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}
