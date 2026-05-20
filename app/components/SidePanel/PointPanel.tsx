import { ActionDispatch, useEffect, useState } from 'react'
import Image from 'next/image'

import { State, Action } from '@/utils/reducer'

import './Panel.css'
import './PointPanel.css'
import '../Cards/Card.css'

export default function PointPanel({ state, dispatch }: { state: State, dispatch: ActionDispatch<[action: Action]> }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function swipeLeft() {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  function swipeRight() {
    if (state.pointData?.imageCarousel && currentIndex < state.pointData?.imageCarousel?.length - 1) setCurrentIndex(currentIndex + 1)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentIndex(0);
  }, [state.pointData]);

  return (
    <div className='panelContainer sidePanelHidden' id='pointPanelContainer'>
      <div className='panelScrollArea'>
        <div className='panelInfo pointPanelInfo'>
          <div>
            <h1 className='txt'>{state.pointData?.pointName}</h1>
            <h2 className='txt'>{state.pointData?.pointType}</h2>
            <h2 className='txt'>Адрес:</h2>
            <h3 className='txt'>{state.pointData?.pointLocation}</h3>
          </div>
          <div className='interactContainer commentButton' onClick={() => dispatch({ type: 'SET_COMMENT_SHOWN', payload: true })}>
            <span className='txt interactTxt'>
              {state.pointData?.pointRating}
              <Image alt="" src='/search-window/star.svg' width={18.9} height={16.23}></Image>
              ({state.pointData?.ratingCount})
            </span>
          </div>
        </div>
        <div className='pointCarouselContainer'>
          <button onClick={() => swipeLeft()}><Image src='/search-window/lt-button.svg' alt='' width={7.4} height={12} /></button>
          <div className='pointCarouselFrame'>
            <div
              className='innerCarousel'
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {state.pointData?.imageCarousel?.map((img, idx) => (
                <Image key={idx} src={img} alt='' width={447} height={220} />
              ))}
            </div>
          </div>
          <button onClick={() => swipeRight()}><Image src='/search-window/gt-button.svg' alt='' width={7.4} height={12} /></button>
        </div>
        <div className='panelDescription pointPanelDescription'>
          <h2 className='txt'>О месте:</h2>
          <span className='txt'>{state.pointData?.pointDescription}</span>
        </div>
      </div>
      <div className='collapseContainer'>
        <button className='collapseButton' onClick={() => {
          document.getElementById('pointPanelContainer')?.classList.add('sidePanelHidden')
          dispatch({ type: 'SET_ADD_PANEL_SHOWN', payload: false })
        }}>
          <Image alt='' src='/search-window/collapse-button.svg' width={25} height={25} />
        </button>
      </div>
    </div>
  )
}
