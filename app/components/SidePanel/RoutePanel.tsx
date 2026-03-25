import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { ChangeEventHandler, RefObject } from 'react'
import LikeSvg from '@/public/search-window/like.svg'
import Image from 'next/image'

import './RoutePanel.css'
import './Cards/Card.css'

export interface RouteData {
    id: number
    author: string
    authorPfp: string | StaticImport
    creationDate: string
    routeName: string
    likeCount: number
    commentCount: number
    routeDescription: string
    routeTags: string[]
    points: PointContents[]
    isLiked: boolean
    image: string
}

export interface PointContents {
    pointName: string
    pointType: string
    pointLocation: string
    pointRating: number
    ratingCount: number
    pointDescription: string
}

export function RoutePanel({ sidePanelRef, routeData, onLiked}:
                           { sidePanelRef: RefObject<HTMLDivElement | null>
                             routeData: RouteData | undefined,
                             onLiked: ChangeEventHandler<HTMLInputElement> }) {

    return (
        <div className='routeSideContainer sideHidden' id='routeSideContainer'>
            <div className='routeHeader'>
                <div className='routeProfile'>
                    <Image src={routeData?.authorPfp ? routeData?.authorPfp : '/search-window/checker.png'} alt='' width={50} height={50}/>
                    <div>
                        <h2 className='txt'>{routeData?.author}</h2>
                        <h3 className='txt'>{routeData?.creationDate}</h3>
                    </div>
                </div>
                <div className='routeInfo'>
                    <h1 className='txt'>{routeData?.routeName}</h1>
                    <div className='interactContainer'>
                        <label className='txt interactTxt likeButton'>
                            {routeData?.likeCount}
                            <input type='checkbox' checked={routeData?.isLiked || false} onChange={onLiked}/>
                            <LikeSvg width={20.4} height={17.7}/>
                        </label>
                        <span className='txt interactTxt'>
                            {routeData?.commentCount}
                            <Image alt="" src='/search-window/comm.png' width={18} height={18}></Image>
                        </span>
                    </div>
                </div>
            </div>
            <div className='routeDesc'>
                <span className='txt'>{routeData?.routeDescription}</span>
                <div className='routeTags'>
                    {routeData?.routeTags.map((e, i) => (<span key={i} className='routeTag'>{e}</span>))}
                </div>
            </div>
            <div className='routePoints'></div>
            <div className='collapseContainer'>
                <button className='collapseButton' onClick={() => {
                    if (sidePanelRef.current) {
                        sidePanelRef.current.classList.add('sideHidden')
                        sidePanelRef.current = document.getElementById('sideContainer') as HTMLDivElement;
                    }
                }}>
                    <Image alt='' src='/search-window/collapse-button.svg' width={25} height={25} />
                </button>
            </div>
        </div>
    )
}