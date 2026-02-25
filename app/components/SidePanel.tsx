'use client';

import Image from 'next/image';
import './SidePanel.css';
import './SearchBar.css'
import './Card.css'
import './PointCard.css'
import './RouteCard.css'
import { useEffect, useRef, useState } from 'react';
import FavSvg from '@/public/search-window/fav.svg'

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

function RouteButton({ routeName, routeDescription, routeTags, image, likeCount, commCount }: 
                     { routeName: string, 
                       routeDescription: string, 
                       routeTags: string[], 
                       image: string, 
                       likeCount: number, 
                       commCount: number }) {
    return (
        <div className='txt card'>
            <Image className='cardThumbnail' alt="" src={image} width={200} height={200} />
            <div className='cardContent'>
                <h1 className='cardName'>{routeName}</h1>
                <span className='cardDesc'>{routeDescription}</span>
                <div className='cardFooter'>
                    <div className='routeTagContainer'>
                        {routeTags.map((e, i) => (<span key={i} className='routeTag'>{e}</span>))}
                    </div>
                    <div className='interactContainer'>
                        <span className='txt interactTxt'>
                            {likeCount}
                            <Image alt="" src='/search-window/like.svg' width={18.9} height={16.23}></Image>
                        </span>
                        <span className='txt interactTxt'>
                            {commCount}
                            <Image alt="" src='/search-window/comm.png' width={18} height={18}></Image>
                        </span>
                    </div>
                </div>
                <label className='favButton'>
                    <input type='checkbox'></input>
                    <FavSvg width={17} height={21}/>
                </label>
            </div>
            <div className='cardTint'/>
        </div>
    )
}

function PointButton({ pointName, pointType, pointLocation, pointDescription, image, rating, rateCount }: 
                     { pointName: string, 
                       pointType: string, 
                       pointLocation: string, 
                       pointDescription: string, 
                       image: string, 
                       rating: number, 
                       rateCount: number, }) {
    return (
        <div className='txt card'>
            <Image className='cardThumbnail' alt="" src={image} width={200} height={200} />
            <div className='cardContent'>
                <h1 className='cardName'>{pointName}</h1>
                <h2 className='pointType'>{pointType}</h2>
                <span className='pointLocation'>{pointLocation}</span>
                <span className='cardDesc pointDesc'>
                    О месте:<br/>
                    {pointDescription}
                </span>
                <div className='cardFooter'>
                    <div className='interactContainer'>
                        <span className='txt interactTxt'>
                            {rating}
                            <Image alt="" src='/search-window/star.svg' width={18.9} height={16.23}></Image>
                            ({rateCount})
                        </span>
                    </div>
                </div>
                <label className='favButton'>
                    <input type='checkbox'></input>
                    <FavSvg width={17} height={21}/>
                </label>
            </div>
            <div className='cardTint'/>
        </div>
    )
}

export default function SidePanel() {
    const [isPanelShown, setPanelShown] = useState(true);
    const [currentRecTab, setRecTab] = useState(0);
    const sidePanelRef = useRef<HTMLDivElement>(null);

    const lorem = 
    `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, ducimus pariatur. Quod odit totam rem, vitae voluptatibus cum nostrum 
     consectetur placeat soluta quaerat dolore iste deleniti similique! Dolorem, minima cumque. Reprehenderit labore eius corrupti incidunt 
     cupiditate neque, dolorum impedit consectetur numquam facilis, fugit porro, blanditiis obcaecati error dignissimos ipsam dicta officia 
     laboriosam debitis ipsum deserunt. Excepturi reiciendis neque aperiam nihil recusandae dicta assumenda inventore vel voluptatem officia 
     odio delectus ipsum ipsam exercitationem incidunt beatae illo, ad explicabo a architecto. Delectus autem porro beatae ipsam. Odio provident 
     consequuntur numquam vel nisi fugit iusto, repellendus itaque suscipit, similique accusantium cum aliquid non, magnam nihil. Nesciunt 
     quaerat eius, cumque illo quisquam aut repudiandae, fuga nostrum consequuntur quae facilis optio repellat nihil, dicta modi qui! Aspernatur, 
     eaque recusandae praesentium voluptate illum similique at tempora labore numquam culpa voluptatum illo eius id vel veniam itaque dolore ad 
     ex necessitatibus iste deserunt accusamus rerum. Modi at molestias quae, facere culpa quaerat? Perferendis sequi ut beatae dignissimos 
     officiis ducimus repellendus corrupti doloribus nisi vel recusandae esse provident, obcaecati magnam itaque, repudiandae aut. Labore eum 
     corrupti excepturi repellat architecto libero quis nesciunt? Eius autem laborum itaque eum error molestiae, commodi vero cum deleniti iure 
     ab dolore aliquam incidunt inventore tenetur recusandae quisquam cumque. Sapiente, laborum. Vel quo expedita obcaecati voluptate iure 
     ratione. Magnam excepturi numquam esse explicabo possimus dolorum quae. Voluptate laborum autem atque facilis vitae pariatur debitis 
     eligendi, aspernatur laboriosam tempore, id illo iure distinctio obcaecati rem harum necessitatibus sunt quidem deleniti excepturi 
     consequatur vero dolores sequi. Totam adipisci eius nobis saepe facilis?`

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
                            <input id='recTabRoutes' type='radio' name='tabs' defaultChecked={true}></input>
                            <label htmlFor='recTabRoutes' className='txt recTab' onClick={() => setRecTab(0)}>Маршруты</label>
                            <input id='recTabPoints' type='radio' name='tabs'></input>
                            <label htmlFor='recTabPoints' className='txt recTab' onClick={() => setRecTab(1)}>Точки</label>
                        </div>
                        <div className='recRoutes' style={{display: currentRecTab === 0 ? 'flex' : 'none'}}>
                            {['a','b','c','d','e','f'].map((e, i) => (
                                <RouteButton 
                                    key={i} 
                                    routeName={e} 
                                    routeDescription={lorem} 
                                    routeTags={['test', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2']} 
                                    likeCount={1337} 
                                    commCount={420} 
                                    image='/search-window/checker.png'/>))}
                        </div>
                        <div className='recRoutes' style={{display: currentRecTab === 1 ? 'flex' : 'none'}}>
                            {['g','h','i','j','k','l'].map((e, i) => (
                                <PointButton 
                                    key={i} 
                                    pointName={e} 
                                    pointDescription={lorem} 
                                    pointType='Restaurant' 
                                    pointLocation='Пушкина 1' 
                                    rating={4.9} 
                                    rateCount={10223} 
                                    image='/search-window/checker.png'/>))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='searchContainer'>
                <div className='searchBar'>
                    <Image alt="" src="/search-window/search-route.png" width={30} height={30} />
                    <input type='search' className='searchField' placeholder='Поиск'></input>
                    <div className='searchButton'>
                        <button className='barButton' onClick={() => {
                            // TODO: Make search implementation
                        }}>
                            <Image alt="" src="/search-window/search.png" width={30} height={30} />
                        </button>
                        <div className='separator' />
                        <button className='barButton' onClick={() => {
                            // TODO: Make routing implementation
                        }}>
                            <Image alt="" src="/search-window/route.png" width={30} height={30} />
                        </button>
                    </div>
                </div>
                <div className='collapseContainer'>
                    <button className='collapseButton' onClick={() => setPanelShown(!isPanelShown)}>
                        <Image alt='' src='/search-window/collapse-button.svg' width={25} height={25}/>
                    </button>
                </div>
            </div>
        </>
    )
}