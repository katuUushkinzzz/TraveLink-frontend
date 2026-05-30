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
        <input ref={searchField} type='search' className='searchField' placeholder='Поиск' defaultValue={state.searchQuery}
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
          <button className='barButton' onClick={async () => {
            if (state.isABRouteShown && (state.multiPoints[0] !== "" && state.multiPoints[state.multiPoints.length - 1] !== "")) {
              const pointACoords: [number, number] =
                await fetch(`https://nominatim.openstreetmap.org/search?q=${state.multiPoints[0]}&format=jsonv2`, {
                  headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_3_0) Gecko/20130401 Firefox/71.3"
                  }
                })
                  .then(r => r.json())
                  .then(j => [j[0].lon, j[0].lat])

              console.log(`https://nominatim.openstreetmap.org/search?q=${state.multiPoints[state.multiPoints.length - 1]}&format=jsonv2`)

              const pointBCoords: [number, number] =
                await fetch(`https://nominatim.openstreetmap.org/search?q=${state.multiPoints[state.multiPoints.length - 1]}&format=jsonv2`, {
                  headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_3_0) Gecko/20130401 Firefox/71.3"
                  }
                })
                  .then(r => r.json())
                  .then(j => [j[0].lon, j[0].lat])

              dispatch({ type: 'SET_PATH_DATA', payload: [pointACoords, pointBCoords] })

              fetch(`${process.env.NEXT_PUBLIC_PROTO}://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/route/pof`, {
                method: "post",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                  "firstPoint": pointACoords,
                  "secondPoint": pointBCoords
                })
              })
                .then(r => r.json())
                .then(j => {
                  pointUtils.setPoints(j[0])
                  dispatch({ type: 'SET_DISPLAYED_POINTS', payload: j[1] })
                })

              return
            }

            if (searchField.current?.value !== "") {
              pointUtils.searchPoints()
            }
          }}>
            <Image alt="" src="/search-window/search.png" width={30} height={30} />
          </button>
          <div className='separator' />
          <button className='barButton' onClick={() => {
            const clearPoints = state.multiPoints.map(() => "")

            dispatch({ type: "SET_MULTIPOINTS", payload: clearPoints });
            dispatch({ type: "SET_PATH_DATA", payload: [] })
            dispatch({ type: "SET_ROUTE_DATA", payload: undefined })
            dispatch({ type: 'SET_AB_ROUTE_SHOWN', payload: !state.isABRouteShown })

            pointUtils.setPoints([])
            pointUtils.fetchPoints(0)
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
