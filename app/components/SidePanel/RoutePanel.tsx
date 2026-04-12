import Image from 'next/image'

import { PointContents, State } from './SidePanelTypes'
import LikeSvg from '@/public/search-window/like.svg'

import './RoutePanel.css'
import './Cards/Card.css'

function Point({ id, pointContents }: { id: number, pointContents: PointContents }) {
    return (
        <div>
            <div className='routePanelPointHeader'>
                <Image src='/search-window/alpaca.jpg' width={200} height={200} alt='' />
                <div className='routePanelPointInfoContainer'>
                    <div className='routePanelPointNumber'>{id}</div>
                    <div className='routePanelPointInfo'>
                        <h1 className='txt'>{pointContents.pointName}</h1>
                        <h2 className='txt'>{pointContents.pointType}</h2>
                        <span className='txt'>{pointContents.pointLocation}</span>
                    </div>
                    <div className='interactContainer'>
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
            <div className='routePanelPointDistance txt' hidden={pointContents.nextDistance ? false : true}>
                <Image src={'/search-window/walking.png'} alt='' width={25} height={25}></Image>
                <span>{pointContents.nextDistance as number >= 1000 ? pointContents.nextDistance as number / 1000 + ' км' : pointContents.nextDistance + ' м'}</span>
                <span>~</span>
                <span>{pointContents.nextTime as number >= 60 ? pointContents.nextTime as number / 60 + ' ч' : pointContents.nextTime + ' мин'}</span>
            </div>
        </div>
    )
}

export function RoutePanel({ state, toggleLike }:
    {
        state: State, toggleLike(id: number | undefined): void
    }) {

    return (
        <div className='routePanelContainer sidePanelHidden' id='routePanelContainer'>
            <div className='routePanelScrollArea'>
                <div className='routePanelHeader'>
                    <div className='routePanelProfile'>
                        <Image src={state.routeData?.authorPfp ?? '/search-window/checker.png'} alt='' width={50} height={50} />
                        <div>
                            <h2 className='txt'>{state.routeData?.author}</h2>
                            <h3 className='txt'>{state.routeData?.creationDate}</h3>
                        </div>
                    </div>
                    <div className='routePanelInfo'>
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
                <div className='routePanelDescription'>
                    <span className='txt'>{state.routeData?.routePanelDescriptionription}</span>
                    <div className='routePanelTags'>
                        {state.routeData?.routePanelTags.map((e, i) => (<span key={i} className='routePanelTag'>{e}</span>))}
                    </div>
                </div>
                <div className='routePoints'>
                    {state.routeData?.points.map((point, id) => {
                        return <Point key={id} id={id + 1} pointContents={point} />
                    })}
                </div>
            </div>
            <div className='collapseContainer'>
                <button className='collapseButton' onClick={() => {
                    document.getElementById('routePanelContainer')?.classList.add('sidePanelHidden')
                }}>
                    <Image alt='' src='/search-window/collapse-button.svg' width={25} height={25} />
                </button>
            </div>
        </div>
    )
}
