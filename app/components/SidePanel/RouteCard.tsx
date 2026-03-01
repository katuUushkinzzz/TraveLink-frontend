import Image from 'next/image'
import FavSvg from '@/public/search-window/fav.svg'
import './Card.css'
import './RouteCard.css'

export default function RouteButton({ routeName, routeDescription, routeTags, image, likeCount, commCount, isFav = false }: 
                                    { routeName: string, 
                                      routeDescription: string, 
                                      routeTags: string[], 
                                      image: string, 
                                      likeCount: number, 
                                      commCount: number,
                                      isFav: boolean }) {
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
                    <input type='checkbox' defaultChecked={isFav}></input>
                    <FavSvg width={17} height={21}/>
                </label>
            </div>
            <div className='cardTint'/>
        </div>
    )
}