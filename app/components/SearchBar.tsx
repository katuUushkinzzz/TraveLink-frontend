'use client';

import Image from 'next/image';
import './SearchBar.css'

export default function SearchBar() {
    return (
        <>
            <div className='searchBar'>
                <Image alt="" src="/search-window/search-route.png" width={30} height={30}/>
                <input type='search' className='searchField' placeholder='Поиск'></input>
            </div>
            <div className='searchButton'>
                <button className='barButton' onClick={() => console.log('search!')}>
                    <Image alt="" src="/search-window/search.png" width={30} height={30}/>
                </button>
                <div className='separator'/>
                <button className='barButton' onClick={() => console.log('route!')}>
                    <Image alt="" src="/search-window/route.png" width={30} height={30}/>
                </button>
            </div>
        </>
    )
}