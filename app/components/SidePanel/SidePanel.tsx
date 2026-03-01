'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import './SidePanel.css'

import SearchBar from './SearchBar'
import RouteButton from './RouteCard'
import PointButton from './PointCard'

function CategoryButton({ categoryName, image, color }: { categoryName: string, image: string, color: string }) {
    return (
        <button className="categoryButton" onClick={() => {
            // TODO: Make category sorting work
        }}>
            <div className="categoryImage" style={{ backgroundColor: color }}>
                <Image alt="" src={image} width={45} height={45} />
            </div>
            <span>{categoryName}</span>
        </button>
    )
}

export default function SidePanel() {
    const [isPanelShown, setPanelShown] = useState(true);
    const [currentRecTab, setRecTab] = useState(1);
    const sidePanelRef = useRef<HTMLDivElement>(null);

    const lorem = 
    `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, ducimus pariatur. Quod odit totam rem, vitae voluptatibus cum nostrum 
     consectetur placeat soluta quaerat dolore iste deleniti similique! Dolorem, minima cumque. Reprehenderit labore eius corrupti incidunt 
     cupiditate neque, dolorum impedit consectetur numquam facilis, fugit porro, blanditiis obcaecati error dignissimos ipsam dicta officia 
     laboriosam debitis ipsum deserunt. Excepturi reiciendis neque aperiam nihil recusandae dicta assumenda inventore vel voluptatem officia 
     odio delectus ipsum ipsam exercitationem incidunt beatae illo, ad explicabo a architecto. Delectus autem porro beatae ipsam. Odio provident 
     consequuntur numquam vel nisi fugit iusto, repellendus itaque suscipit, similique accusantium cum aliquid non, magnam nihil. Nesciunt 
     quaerat eius, cumque illo quisquam aut repudiandae, fuga nostrum consequuntur quae facilis optio repellat nihil, dicta modi qui!`

    useEffect(() => {
        if (sidePanelRef.current) {
            if (isPanelShown)
                sidePanelRef.current.classList.remove('sideHiden')
            else
                sidePanelRef.current.classList.add('sideHiden')
        }
    }, [isPanelShown]);

    return (
        <>
            <div id="sideContainer" className="sideContainer" ref={sidePanelRef}>
                <div className='scrollArea'>
                    <h1 className="txt">Таганрог</h1>
                    <h3 className="txt">Категории</h3>
                    <div className="categoryContainer">
                        <CategoryButton categoryName="Рестораны" image="/search-window/restaurant-cat-icon.png" color="#FE8E43"/>
                        <CategoryButton categoryName="Архитектура" image="/search-window/architechture-cat-icon.png" color="#FFE898"/>
                        <CategoryButton categoryName="Парки" image="/search-window/park-cat-icon.png" color="#85DB85"/>
                        <CategoryButton categoryName="Медицина" image="/search-window/medicine-cat-icon.png" color="#FF7070"/>
                        <CategoryButton categoryName="Продукты" image="/search-window/groceries-cat-icon.png" color="#FE8E43"/>
                        <CategoryButton categoryName="Торговые центры" image="/search-window/mall-cat-icon.png" color="#67999C"/>
                        <CategoryButton categoryName="Отдых" image="/search-window/rest-cat-icon.png" color="#FF7070"/>
                        <CategoryButton categoryName="Прачечные" image="/search-window/laudry-cat-icon.png" color="#67999C"/>
                        <CategoryButton categoryName="Развлечения" image="/search-window/ent-cat-icon.png" color="#CB3466"/>
                        <CategoryButton categoryName="Кофейни" image="/search-window/cafe-cat-icon.png" color="#BE8667"/>
                        <CategoryButton categoryName="Пляжи" image="/search-window/beach-cat-icon.png" color="#FFE897"/>
                        <CategoryButton categoryName="Салоны красоты" image="/search-window/beauty-cat-icon.png" color="#FF7070"/>
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
                            {['a','b','c','d','e','f'].map((e, i) => (
                                <RouteButton 
                                    key={i} 
                                    routeName={e} 
                                    routeDescription={lorem} 
                                    routeTags={['test', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2']} 
                                    likeCount={1337} 
                                    commCount={420} 
                                    image='/search-window/checker.png'
                                    isFav={true}/>))}
                        </div>
                        <div className='recRoutes' style={{display: currentRecTab === 2 ? 'flex' : 'none'}}>
                            {['g','h','i','j','k','l'].map((e, i) => (
                                <PointButton 
                                    key={i} 
                                    pointName={e} 
                                    pointDescription={lorem} 
                                    pointType='Restaurant' 
                                    pointLocation='Пушкина 1' 
                                    rating={4.9} 
                                    rateCount={10223} 
                                    image='/search-window/checker.png'
                                    isFav={true}/>))}
                        </div>
                    </div>
                </div>
            </div>
            <SearchBar setPanelShown={setPanelShown} isPanelShown={isPanelShown}/>
        </>
    )
}