import Image from 'next/image'
import FavSvg from '@/public/search-window/fav.svg'
import LikeSvg from '@/public/search-window/like.svg'
import './Card.css'
import './RouteCard.css'
import { ChangeEventHandler, MouseEventHandler } from 'react'
import { RouteData } from './RoutePanel'

export default function RouteCard({ routeData, onLiked, onClick }: 
                                  { routeData: RouteData
                                    onLiked: ChangeEventHandler<HTMLInputElement>,
                                    onClick: MouseEventHandler<HTMLDivElement> }) {
    return (
        <div className='txt card'>
            <Image className='cardThumbnail' alt="" src={routeData.image} width={200} height={200} onClick={onClick}/>
            <div className='cardContent'>
                <h1 className='cardName'>{routeData.routeName}</h1>
                <span className='cardDesc'>{routeData.routeDescription}</span>
                <div className='cardFooter'>
                    <div className='routeTagContainer'>
                        {routeData.routeTags.map((e, i) => (<span key={i} className='routeTag'>{e}</span>))}
                    </div>
                    <div className='interactContainer'>
                        <label className='txt interactTxt likeButton'>
                            {routeData.likeCount}
                            <input type='checkbox' checked={routeData.isLiked || false} onChange={onLiked}/>
                            <LikeSvg width={20.4} height={17.7}/>
                        </label>
                        <span className='txt interactTxt'>
                            {routeData.commentCount}
                            <Image alt="" src='/search-window/comm.png' width={18} height={18}/>
                        </span>
                    </div>
                </div>
                <label className='favButton'>
                    <input type='checkbox' onChange={() => {/* TODO: Add to favourites */}}/>
                    <FavSvg width={17} height={21}/>
                </label>
            </div>
            <div className='cardTint'/>
        </div>
    )
}