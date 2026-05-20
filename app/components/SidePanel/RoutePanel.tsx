import Image from 'next/image'

import { ActionDispatch } from 'react'
import { PointData } from '@/types/localTypes'
import { Action, State } from '@/utils/reducer'
import LikeSvg from '@/public/search-window/like.svg'

import './Panel.css'
import './RoutePanel.css'
import '../Cards/Card.css'

function Point({ id, pointContents, dispatch }: { id: number, pointContents: PointData, dispatch: ActionDispatch<[action: Action]> }) {
  function showCommentSection() {
    dispatch({ type: 'SET_POINT_DATA', payload: pointContents })
    dispatch({ type: 'SET_COMMENT_SHOWN', payload: true })
  }

  return (
    <div>
      <div className='routePanelPointHeader'>
        <Image src={pointContents.image} width={200} height={200} alt='' />
        <div className='routePanelPointInfoContainer'>
          <div className='routePanelPointNumber'>{id}</div>
          <div className='routePanelPointInfo'>
            <h1 className='txt'>{pointContents.pointName}</h1>
            <h2 className='txt'>{pointContents.pointType}</h2>
            <span className='txt'>{pointContents.pointLocation}</span>
          </div>
          <div className='interactContainer commentButton' onClick={() => showCommentSection()}>
            <span className='txt interactTxt'>
              {pointContents.pointRating}
              <Image alt="" src='/search-window/star.svg' width={18.9} height={16.23}></Image>
              ({pointContents.ratingCount})
            </span>
          </div>
        </div>
      </div>
      <div className='routePanelPointDescription txt'>
        О месте:<br />
        {pointContents.pointDescription}
      </div>
      <div className='routePanelPointDistance txt' style={!pointContents.nextDistance ? { border: 'none', height: 0, marginTop: 0 } : {}}>
        {pointContents.nextDistance && <>
          <Image src={'/search-window/walking.png'} alt='' width={25} height={25}></Image>
          <span>{pointContents.nextDistance as number >= 1000 ? pointContents.nextDistance as number / 1000 + ' км' : pointContents.nextDistance + ' м'}</span>
          <span>~</span>
          <span>{pointContents.nextTime as number >= 60 ? pointContents.nextTime as number / 60 + ' ч' : pointContents.nextTime + ' мин'}</span>
        </>}
      </div>
    </div>
  )
}

export default function RoutePanel({ state, dispatch, toggleLike }:
  {
    state: State, dispatch: ActionDispatch<[action: Action]>, toggleLike(id: number | undefined): void
  }) {

  return (
    <div className='panelContainer sidePanelHidden' id='routePanelContainer'>
      <div className='panelScrollArea'>
        <div className='routePanelHeader'>
          <div className='routePanelProfile'>
            <Image src={state.routeData?.authorPfp ?? '/search-window/route-previews/checker.png'} alt='' width={50} height={50} />
            <div>
              <h2 className='txt'>{state.routeData?.author}</h2>
              <h3 className='txt'>{state.routeData?.creationDate}</h3>
            </div>
          </div>
          <div className='panelInfo routePanelInfo'>
            <h1 className='txt'>{state.routeData?.routeName}</h1>
            <div className='interactContainer'>
              <label className='txt interactTxt likeButton'>
                {state.routeData?.likeCount}
                <input type='checkbox' checked={state.routeData?.isLiked || false} onChange={() => toggleLike(state.routeData?.id)} />
                <LikeSvg width={20.4} height={17.7} />
              </label>
              <span className='txt interactTxt'>
                {state.routeData?.commentCount}
                <Image alt="" src='/search-window/comm.png' width={18} height={18}></Image>
              </span>
            </div>
          </div>
        </div>
        <div className='panelDescription routePanelDescription'>
          <span className='txt'>{state.routeData?.routeDescription}</span>
          <div className='routeTags'>
            {state.routeData?.routeTags.map((e, i) => (<button key={i} className='txt routePanelTag' onClick={
              e => dispatch({ type: 'SET_QUERY', payload: e.currentTarget.innerText })}
            >{e}</button>))}
          </div>
        </div>
        <div className='routePoints'>
          {state.routeData?.points.map((point, id) => {
            return <Point key={id} id={id + 1} pointContents={point} dispatch={dispatch} />
          })}
        </div>
      </div>
      <div className='collapseContainer'>
        <button className='collapseButton' onClick={() => {
          document.getElementById('routePanelContainer')?.classList.add('sidePanelHidden')
          dispatch({ type: 'SET_ADD_PANEL_SHOWN', payload: false })
        }}>
          <Image alt='' src='/search-window/collapse-button.svg' width={25} height={25} />
        </button>
      </div>
    </div>
  )
}
