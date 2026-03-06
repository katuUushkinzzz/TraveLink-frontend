'use client'

import { RefObject, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import './RoutePanel.css'
import './SidePanel.css'

import RouteButton from './RouteCard'
import PointButton from './PointCard'

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

function RoutePanel({ sidePanelRef }: 
                    { sidePanelRef: RefObject<HTMLDivElement | null> }) {
    return (
        <div className='routeSideContainer sideHidden' id='routeSideContainer'>
            <div className='routeHeader'>
                <div className='routeProfile'></div>
                <div className='routeInfo'></div>
            </div>
            <div className='routeDesc'>
                <div className='routeTags'></div>
            </div>
            <div className='routePoints'></div>
            <button onClick={() => {
                if (sidePanelRef.current) {
                    sidePanelRef.current.classList.add('sideHidden')
                    sidePanelRef.current =  document.getElementById('sideContainer') as HTMLDivElement; 
                    sidePanelRef.current.classList.remove('sideHidden')
                }
            }}>X</button>
        </div>
    )
}

/**
 * Collapsible main side panel
 * @param isPanelShown - `useState` `boolean` component for checking collapse state
 * 
 * @example
 * ```tsx
 *  // Create stateful value to control collapsible state 
 *  const [isPanelShown, setPanelShown] = useState(true);
 *  
 *  // Pass it to SidePanel to allow for collapsing by changing stateful value
 *  <SidePanel isPanelShown={isPanelShown}></SidePanel>
 * ```
 */
export default function SidePanel({ isPanelShown }: 
                                  { isPanelShown: boolean }) {
    const [currentRecTab, setRecTab] = useState(1);
    const sidePanelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (sidePanelRef.current) {
            if (isPanelShown)
                sidePanelRef.current.classList.remove('sideHidden')
            else
                sidePanelRef.current.classList.add('sideHidden')
        }
    }, [isPanelShown]);

    return (
        <>
            <div id="sideContainer" className="sideContainer" ref={sidePanelRef}>
                <div className='scrollArea'>
                    <h1 className="txt">Таганрог</h1>
                    <h3 className="txt">Категории</h3>
                    <div className="categoryContainer">
                        <CategoryButton categoryId='restaurants' categoryName="Рестораны" image="/search-window/restaurant-cat-icon.png" color="#FE8E43"/>
                        <CategoryButton categoryId='architechture' categoryName="Архитектура" image="/search-window/architechture-cat-icon.png" color="#FFE898"/>
                        <CategoryButton categoryId='parks' categoryName ="Парки" image="/search-window/park-cat-icon.png" color="#85DB85"/>
                        <CategoryButton categoryId='medicine' categoryName ="Медицина" image="/search-window/medicine-cat-icon.png" color="#FF7070"/>
                        <CategoryButton categoryId='groceries' categoryName ="Продукты" image="/search-window/groceries-cat-icon.png" color="#FE8E43"/>
                        <CategoryButton categoryId='malls' categoryName ="Торговые центры" image="/search-window/mall-cat-icon.png" color="#67999C"/>
                        <CategoryButton categoryId='rest' categoryName ="Отдых" image="/search-window/rest-cat-icon.png" color="#FF7070"/>
                        <CategoryButton categoryId='laudries' categoryName ="Прачечные" image="/search-window/laudry-cat-icon.png" color="#67999C"/>
                        <CategoryButton categoryId='ent' categoryName ="Развлечения" image="/search-window/ent-cat-icon.png" color="#CB3466"/>
                        <CategoryButton categoryId='cafes' categoryName ="Кофейни" image="/search-window/cafe-cat-icon.png" color="#BE8667"/>
                        <CategoryButton categoryId='beaches' categoryName ="Пляжи" image="/search-window/beach-cat-icon.png" color="#FFE897"/>
                        <CategoryButton categoryId='beauty' categoryName ="Салоны красоты" image="/search-window/beauty-cat-icon.png" color="#FF7070"/>
                    </div>
                    <h1 className="txt">Рекомендации</h1>
                    <div className="recContainer">
                        <div className='recTabContainer'>
                            <input onChange={() => setRecTab(1)} id='recTabRoutes' type='radio' name='tabs' defaultChecked={true}></input>
                            <label htmlFor='recTabRoutes' className='txt recTab'>Маршруты</label>
                            <input onChange={() => setRecTab(2)} id='recTabPoints' type='radio' name='tabs'></input>
                            <label htmlFor='recTabPoints' className='txt recTab'>Точки</label>
                        </div>
                        <div className='recRoutes' style={{display: currentRecTab === 1 ? 'flex' : 'none'}}>
                            <RouteButton 
                                routeName='Placeholder Route' 
                                routeDescription='Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
                                routeTags={['test1', 'test2', 'test3', 'test4']} 
                                likeCount={1337} 
                                commCount={420} 
                                image='/search-window/checker.png'
                                isFav={false}
                                onClick={() => { 
                                    if (sidePanelRef.current) {
                                        sidePanelRef.current.classList.add('sideHidden')
                                        sidePanelRef.current = document.getElementById('routeSideContainer') as HTMLDivElement; 
                                        sidePanelRef.current.classList.remove('sideHidden')
                                    }
                                }}/>
                        </div>
                        <div className='recRoutes' style={{display: currentRecTab === 2 ? 'flex' : 'none'}}>
                            <PointButton 
                                pointName='Placeholder Point' 
                                pointDescription='Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
                                pointType='Placeholder' 
                                pointLocation='Placeholder st. 1' 
                                rating={4.9} 
                                rateCount={10223} 
                                image='/search-window/checker.png'
                                isFav={false}/>
                        </div>
                    </div>
                </div>
            </div>
            <RoutePanel sidePanelRef={sidePanelRef}></RoutePanel>
        </>
    )
}