import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import Image from 'next/image';
import './SearchBar.css'

/**
 * Search bar element with collapse button
 * @param setPanelShown - `useState` `Dispatch` component for collapsible element
 * @param isPanelShown - `useState` `boolean` component for collapsible element
 * 
 * @example
 * ```tsx
 *  // Create stateful value to control collapsible state 
 *  const [isPanelShown, setPanelShown] = useState(true);
 *  
 *  // Pass it to SearchBar to allow for update with 'collapse' button
 *  <SearchBar setPanelShown={setPanelShown} isPanelShown={isPanelShown}/>
 * ```
 */
export default function SearchBar({ setPanelShown, isPanelShown }: 
                                  { setPanelShown: Dispatch<SetStateAction<boolean>>
                                    isPanelShown: boolean }) {
    const colImgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (colImgRef.current) {
            if (isPanelShown)
                colImgRef.current.classList.remove('collapseImgRotate')
            else
                colImgRef.current.classList.add('collapseImgRotate')
        }
    }, [isPanelShown]);

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
                    <Image ref={colImgRef} alt='' src='/search-window/collapse-button.svg' width={25} height={25} />
                </button>
            </div>
        </div>
    )                                    
}
