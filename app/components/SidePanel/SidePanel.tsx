import { ActionDispatch, useEffect, useState } from 'react'
import Image from 'next/image'

import RouteCard from './Cards/RouteCard'
import PointButton from './Cards/PointCard'
import { Action, RouteData, State } from './SidePanelTypes'

import './SidePanel.css'

/**
 * Collapsible main side panel
 *
 * @example
 * ```tsx
 *  <SidePanel/>
 * ```
 */
export default function SidePanel({ state, dispatch, routes, toggleLike }:
  {
    state: State, dispatch: ActionDispatch<[action: Action]>, routes: RouteData[], toggleLike(id: number | undefined): void
  }) {
  const [currentRecTab, setRecTab] = useState(1);

  useEffect(() => {
    if (state.isPanelShown)
      document.getElementById('sidePanelContainer')?.classList.remove('sidePanelHidden')
    else
      document.getElementById('sidePanelContainer')?.classList.add('sidePanelHidden')
  });

  function showRoutePanel(contents: RouteData) {
    dispatch({ type: 'SET_ROUTE_DATA', payload: contents })
    document.getElementById('routePanelContainer')?.classList.remove('sidePanelHidden')
  }

  return (
    <>
      <div id="sidePanelContainer" className="sidePanelContainer">
        <div className='sidePanelScrollArea'>
          {state.isABRouteShown && <div className='sidePanelABRouteContainer'>
            <header>
              <div className='sidePanelABRouteInputs'>
                <h2 className='txt'>Откуда</h2>
                <input type='search' placeholder='Введите адрес' className='txt'></input>
                <h2 className='txt'>Куда</h2>
                <input type='search' placeholder='Введите адрес' className='txt'></input>
              </div>
              <button>
                <Image alt="" src="/search-window/switch.png" width={30} height={30} className='img' />
              </button>
            </header>
            <footer>
              <button className='txt'>
                <Image alt="" src="/search-window/plus.png" width={35} height={35} className='img' />
                Добавить
              </button>
              <button className='txt'>
                Сбросить
              </button>
            </footer>
          </div>}
          <h1 className="h1 txt"><button onClick={() => dispatch({ type: 'TOGGLE_PICKER', payload: true })}>{state.currentCity}</button></h1>
          <h3 className="h3 txt">Категории</h3>
          <div className="sidePanelCategories">
            <CategoryButton categoryId='restaurants' categoryName="Рестораны" image="/search-window/restaurant-cat-icon.png" color="#FE8E43" />
            <CategoryButton categoryId='architechture' categoryName="Архитектура" image="/search-window/architechture-cat-icon.png" color="#FFE898" />
            <CategoryButton categoryId='parks' categoryName="Парки" image="/search-window/park-cat-icon.png" color="#85DB85" />
            <CategoryButton categoryId='medicine' categoryName="Медицина" image="/search-window/medicine-cat-icon.png" color="#FF7070" />
            <CategoryButton categoryId='groceries' categoryName="Продукты" image="/search-window/groceries-cat-icon.png" color="#FE8E43" />
            <CategoryButton categoryId='malls' categoryName="Торговые центры" image="/search-window/mall-cat-icon.png" color="#67999C" />
            <CategoryButton categoryId='rest' categoryName="Отдых" image="/search-window/rest-cat-icon.png" color="#FF7070" />
            <CategoryButton categoryId='laudries' categoryName="Прачечные" image="/search-window/laudry-cat-icon.png" color="#67999C" />
            <CategoryButton categoryId='ent' categoryName="Развлечения" image="/search-window/ent-cat-icon.png" color="#CB3466" />
            <CategoryButton categoryId='cafes' categoryName="Кофейни" image="/search-window/cafe-cat-icon.png" color="#BE8667" />
            <CategoryButton categoryId='beaches' categoryName="Пляжи" image="/search-window/beach-cat-icon.png" color="#FFE897" />
            <CategoryButton categoryId='beauty' categoryName="Салоны красоты" image="/search-window/beauty-cat-icon.png" color="#FF7070" />
          </div>
          <h1 className="h1 txt">Рекомендации</h1>
          <div className="recommendsContainer">
            <div className='recommendsTabs'>
              <input onChange={() => setRecTab(1)} id='recommendsTabRoutes' type='radio' name='tabs' defaultChecked={true}></input>
              <label htmlFor='recommendsTabRoutes' className='txt recommendsTab'>Маршруты</label>
              <input onChange={() => setRecTab(2)} id='recommendsTabPoints' type='radio' name='tabs'></input>
              <label htmlFor='recommendsTabPoints' className='txt recommendsTab'>Точки</label>
            </div>
            <div className='recommendsCards' style={{ display: currentRecTab === 1 ? 'flex' : 'none' }}>
              {routes.map(route => (
                <RouteCard
                  key={route.id}
                  routeData={route}
                  onLiked={() => toggleLike(route.id)}
                  onClick={() => showRoutePanel(route)}
                />
              ))}
            </div>
            <div className='recommendsCards' style={{ display: currentRecTab === 2 ? 'flex' : 'none' }}>
              <PointButton
                pointName='Placeholder Point'
                pointDescription='Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
                pointType='Placeholder'
                pointLocation='Placeholder st. 1'
                rating={4.9}
                rateCount={10223}
                image='/search-window/checker.png'
                isFav={true} />
            </div>
          </div>
        </div>
      </div>
    </>
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
