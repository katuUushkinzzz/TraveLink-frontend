import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { ChangeEventHandler, RefObject } from 'react'
import LikeSvg from '@/public/search-window/like.svg'
import Image from 'next/image'

import './General.css'
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
    nextDistance?: number
    nextTime?: number
}

function Point({ id, pointContents }: { id: number, pointContents: PointContents }) {
    return (
        <div>
            <div className='pointInfo'>
                <Image src='/search-window/alpaca.jpg' width={200} height={200} alt=''/>
                <div className='pointEssentialsContainer'>
                    <div className='pointNumber'>{id}</div>
                    <div className='pointEssentials'>
                        <h1 className='txt'>{pointContents.pointName}</h1>
                        <h2 className='txt'>{pointContents.pointType}</h2>
                        <span className='txt'>{pointContents.pointLocation}</span>
                    </div>
                    <div className='interactContainer'>
                        <span className='txt interactTxt'>
                            {pointContents.pointRating}
                            <Image alt="" src='/search-window/star.svg' width={18.9} height={16.23}></Image>
                            ({pointContents.ratingCount})
                        </span>
                    </div>
                </div>
            </div>
            <div className='pointAbout txt'>
                О месте:<br/>
                {pointContents.pointDescription}
            </div>
            <div className='nextDistance txt' hidden={pointContents.nextDistance ? false : true}>
                <Image src={'/search-window/walking.png'} alt='' width={25} height={25}></Image>
                <span>{pointContents.nextDistance as number >= 1000 ? pointContents.nextDistance as number / 1000 + ' км' : pointContents.nextDistance + ' м'}</span>
                <span>~</span>
                <span>{pointContents.nextTime as number >= 60 ? pointContents.nextTime as number / 60 + ' ч' : pointContents.nextTime + ' мин'}</span>
            </div>
        </div>
    )
}

export function RoutePanel({ sidePanelRef, routeData, onLiked}:
                           { sidePanelRef: RefObject<HTMLDivElement | null>
                             routeData: RouteData | undefined,
                             onLiked: ChangeEventHandler<HTMLInputElement> }) {

    return (
        <div className='routeSideContainer sideHidden' id='routeSideContainer'>
            <div className='routeSideScrollContainer'>
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
                <div className='routePoints'>
                    {routeData?.points.map((point, id) => {
                    return <Point key={id} id={id+1} pointContents={point}/>
                    })}
                </div>
            </div>
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