import { ActionDispatch } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { State, Action } from '@/app/utils/reducer'
import Modal from '../Modal'

import './CommentSection.css'

interface CommentData {
  rating: number,
  authorName: string,
  authorRank: string,
  authorPfp: string,
  text: string,
  date: string
  photos?: string[]
}

function StarsRow({ rating, starWidth, starHeight }: { rating: number, starWidth: number, starHeight: number }) {
  return (
    <div className='starsRow'>
      <div style={{ display: 'flex', position: 'absolute', top: 0, left: 0 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Image key={`bg-${i}`} src="/search-window/star.svg" alt="" width={starWidth} height={starHeight} style={{
            filter: 'grayscale(100%)', opacity: 0.3
          }} />
        ))}
      </div>
      <div style={{ display: 'flex', position: 'relative' }}>
        {[1, 2, 3, 4, 5].map(i => {
          return <Image key={`fill-${i}`} alt="" src='/search-window/star.svg' width={starWidth} height={starHeight} style={{
            clipPath: `inset(0 ${rating - i > 0 ? '0' : (i - rating) * 100}% 0 0)`
          }} />
        })}
      </div>
    </div>
  )
}

function Comment({ data }: { data: CommentData }) {
  return (
    <div className='commentContainer'>
      <div className='commentProfile'>
        <Image src={data.authorPfp} alt='' height={40} width={40} />
        <div>
          <h1 className='txt commentName'>{data.authorName}</h1>
          <span className='txt commentRank'>{data.authorRank}</span>
        </div>
      </div>
      <div className='commentRatingContainer'>
        <StarsRow rating={data.rating} starHeight={19} starWidth={20}></StarsRow>
        <span className='txt'>{data.date}</span>
      </div>
      <span className='txt commentText'>{data.text}</span>
      {data.photos && <div className='commentPhotos'>
        {data.photos.map((p, i) => <Link href={p} key={i} target="_blank">
          <Image src={p} alt='' height={125} width={125} />
        </Link>)}
      </div>}
    </div>
  )
}

export default function CommentSection({ state, dispatch }: { state: State, dispatch: ActionDispatch<[action: Action]> }) {
  return (
    <Modal stateSwitch={state.isCommentVisible} dispatch={dispatch} action={{ type: 'SET_COMMENT_SHOWN', payload: false }}>
      <div className='commentSectionHeader'>
        <div className='commentSectionHeaderHeader'>
          <h1 className='txt'>Отзывы</h1>
        </div>
        <div className='ratingContainer'>
          <h1 className='txt'>{state.pointData?.pointRating}</h1>
          <div className='starsContainer'>
            <span className='txt'>на основании {state.pointData?.ratingCount} оценок</span>
            <StarsRow rating={state.pointData?.pointRating as number} starHeight={25} starWidth={23.75}></StarsRow>
          </div>
          <button className='txt' onClick={() => dispatch({ type: 'SET_COMMENT_EDITOR', payload: true })}>Написать отзыв</button>
        </div>
      </div>
      <div className='commentSectionScroll'>
        {[1, 2, 3, 4, 5].map(i => <Comment key={i} data={{
          authorPfp: '/search-window/route-previews/checker.png',
          authorName: 'Jane Doe',
          authorRank: 'Профи',
          rating: 5 / i,
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse veritatis expedita voluptatem optio magni suscipit quibusdam autem repellat dolorem deserunt!',
          date: '15 апреля',
          // photos: ['/search-window/route-previews/horse.png', '/search-window/route-previews/horse.png', '/search-window/route-previews/horse.png', '/search-window/route-previews/horse.png', '/search-window/route-previews/horse.png', '/search-window/route-previews/horse.png', '/search-window/route-previews/horse.png', '/search-window/route-previews/horse.png', '/search-window/route-previews/horse.png', '/search-window/route-previews/horse.png', '/search-window/route-previews/horse.png', '/search-window/route-previews/horse.png', '/search-window/route-previews/horse.png']
        }}></Comment>)}
      </div>
    </Modal>
  )
}