import { MouseEventHandler } from 'react'
import Image from 'next/image'

import FavSvg from '@/public/search-window/fav.svg'
import { PointData } from '@/types/localTypes'

import './Card.css'
import './PointCard.css'

export default function PointCard({ pointData, onClick, onComment }: { pointData: PointData, onClick: MouseEventHandler<HTMLDivElement>, onComment: MouseEventHandler<HTMLDivElement> }) {
  return (
    <div className='txt card'>
      <Image className='cardThumbnail' alt="" src={pointData.image} width={200} height={200} onClick={onClick} />
      <div className='cardContent'>
        <h1 className='cardName'>{pointData.pointName}</h1>
        <h2 className='pointType'>{pointData.pointType}</h2>
        <span className='pointLocation'>{pointData.pointLocation}</span>
        <span className='cardDesc pointDesc'>
          О месте:<br />
          {pointData.pointDescription}
        </span>
        <div className='cardFooter'>
          <div className='interactContainer commentButton' onClick={onComment}>
            <span className='txt interactTxt'>
              {pointData.pointRating}
              <Image alt="" src='/search-window/star.svg' width={18.9} height={16.23}></Image>
              ({pointData.ratingCount})
            </span>
          </div>
        </div>
        <label className='favButton'>
          <input type='checkbox'></input>
          <FavSvg width={17} height={21} />
        </label>
      </div>
      <div className='cardTint' />
    </div>
  )
}