import Image from 'next/image';
import './SearchBar.css'
import { Dispatch, SetStateAction } from 'react';

export default function SearchBar({ setPanelShown, isPanelShown }: 
                                  { setPanelShown: Dispatch<SetStateAction<boolean>>
                                    isPanelShown: boolean }) {

    return (
        <div className='searchContainer'>
            <div className='searchBar'>
                <Image alt="" src="/search-window/search-route.png" width={30} height={30} />
                <input type='search' className='searchField' placeholder='Поиск'></input>
                <div className='searchButton'>
                    <button className='barButton' onClick={() => {
                        // TODO: Make search implementation
                    }}>
                        <Image alt="" src="/search-window/search.png" width={30} height={30} />
                    </button>
                    <div className='separator' />
                    <button className='barButton' onClick={() => {
                        // TODO: Make routing implementation
                    }}>
                        <Image alt="" src="/search-window/route.png" width={30} height={30} />
                    </button>
                </div>
            </div>
            <div className='collapseContainer'>
                <button className='collapseButton' onClick={() => setPanelShown(!isPanelShown)}>
                    <Image alt='' src='/search-window/collapse-button.svg' width={25} height={25} />
                </button>
            </div>
        </div>
    )                                    
}