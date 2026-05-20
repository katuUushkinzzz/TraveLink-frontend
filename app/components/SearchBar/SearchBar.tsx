import { ActionDispatch, useEffect } from 'react';
import Image from 'next/image';

import { State, Action } from '@/utils/reducer';

import './SearchBar.css'

export default function SearchBar({ state, dispatch }:
  {
    state: State, dispatch: ActionDispatch<[action: Action]>
  }) {

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
        <input type='search' className='searchField' placeholder='Поиск' value={state.searchQuery}
          onChange={e => dispatch({ type: 'SET_QUERY', payload: e.target.value })}
        />
        <div className='searchButton'>
          <button className='barButton' onClick={() => {
            // TODO: Make search implementation
          }}>
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
