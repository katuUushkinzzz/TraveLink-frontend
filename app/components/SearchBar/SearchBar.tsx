import { ActionDispatch, useEffect, useRef } from 'react';
import Image from 'next/image';

import { State, Action } from '@/utils/reducer';
import { PointUtils } from '@/utils/usePoints';

import './SearchBar.css'

export default function SearchBar({ state, dispatch, pointUtils }:
  {
    state: State, dispatch: ActionDispatch<[action: Action]>, pointUtils: PointUtils
  }) {

  const searchField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.isPanelShown)
      document.getElementById('collapseImg')?.classList.remove('collapseImgRotate')
    else
      document.getElementById('collapseImg')?.classList.add('collapseImgRotate')
  }, [state.isPanelShown]);

  return (
    <div className='searchContainer'>
      <div className='searchBar'>
        <Image alt="" src="/search-window/search-route.png" width={30} height={30} />
        <input ref={searchField} type='search' className='searchField' placeholder='Поиск' value={state.searchQuery}
          onChange={e => {
            dispatch({ type: 'SET_QUERY', payload: e.target.value })
            if (e.target.value === "" && state.isSearching) {
              dispatch({ type: 'SET_SEARCHING', payload: false })
              pointUtils.setPoints([])
              pointUtils.fetchPoints(0)
            }
          }}
          onKeyDown={e => { if (e.code === "Enter") pointUtils.searchPoints() }}
        />
        <div className='searchButton'>
          <button className='barButton' onClick={() => pointUtils.searchPoints()}>
            <Image alt="" src="/search-window/search.png" width={30} height={30} />
          </button>
          <div className='separator' />
          <button className='barButton' onClick={() => {
            dispatch({ type: 'SET_AB_ROUTE_SHOWN', payload: !state.isABRouteShown })
          }}>
            <Image alt="" src="/search-window/route.png" width={30} height={30} />
          </button>
        </div>
      </div>
      <div className='collapseContainer'>
        <button className='collapseButton' onClick={() => dispatch({ type: 'SET_PANEL_SHOWN', payload: !state.isPanelShown })}>
          <Image id='collapseImg' alt='' src='/search-window/collapse-button.svg' width={25} height={25} />
        </button>
      </div>
    </div>
  )
}
