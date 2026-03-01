import Image from 'next/image'
import FavSvg from '@/public/search-window/fav.svg'
import './Card.css'
import './PointCard.css'

export default function PointButton({ pointName, pointType, pointLocation, pointDescription, image, rating, rateCount, isFav = false }: 
                                    { pointName: string, 
                                      pointType: string, 
                                      pointLocation: string, 
                                      pointDescription: string, 
                                      image: string, 
                                      rating: number, 
                                      rateCount: number,
                                      isFav: boolean }) {
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
                    <input type='checkbox' defaultChecked={isFav}></input>
                    <FavSvg width={17} height={21}/>
                </label>
            </div>
            <div className='cardTint'/>
        </div>
    )
}