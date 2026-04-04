import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image'

import './CityPicker.css'

export default function CityPicker({ isPickerVisible, showCityPicker, currentCity, setCity }:
    {
        isPickerVisible: boolean
        showCityPicker: Dispatch<SetStateAction<boolean>>
        currentCity: string
        setCity: Dispatch<SetStateAction<string>>
    }) {

    const changeCity = (cityName: string) => {
        if (currentCity != cityName) {
            setCity(cityName);
        }
        showCityPicker(false);
    }

    return (
        <>
            {isPickerVisible && <div className='cityPickerBackground'>
                <div className='cityPickerContainer'>
                    <div className='cityPickerHeader'>
                        <div className='cityPickerHeaderHeader'> 
                            <h1 className='h1 txt'>Выберите город</h1>
                            <button onClick={() => showCityPicker(false)}>
                                <Image alt="" src="/search-window/close-button.svg" width={20} height={20} className='img'/>
                            </button>
                        </div>
                        <div className='cityPickerSearchContainer'>
                            <div className='cityPickerSearchBar'>
                                <input type='search' placeholder='Введите город' className='txt'></input>
                                <button><Image alt="" src="/search-window/search.png" width={30} height={30} className='img'/></button>
                            </div>
                            <button className='cityPickerPickButton txt'>Выбрать</button>
                        </div>
                        <span className='txt'>Введите город в поиске или выберите из списка популярных</span>
                    </div>
                    <ol className='cityPickerList'>
                        <li className='txt'><button onClick={() => changeCity('Москва')}>Москва</button></li>
                        <li className='txt'><button onClick={() => changeCity('Санкт-Петербург')}>Санкт-Петербург</button></li>
                        <li className='txt'><button onClick={() => changeCity('Екатеринбург')}>Екатеринбург</button></li>
                        <li className='txt'><button onClick={() => changeCity('Новосибирск')}>Новосибирск</button></li>
                        <li className='txt'><button onClick={() => changeCity('Краснодар')}>Краснодар</button></li>
                        <li className='txt'><button onClick={() => changeCity('Ростов-на-Дону')}>Ростов-на-Дону</button></li>
                        <li className='txt'><button onClick={() => changeCity('Таганрог')}>Таганрог</button></li>
                        <li className='txt'><button onClick={() => changeCity('Казань')}>Казань</button></li>
                        <li className='txt'><button onClick={() => changeCity('Пермь')}>Пермь</button></li>
                        <li className='txt'><button onClick={() => changeCity('Самара')}>Самара</button></li>
                        <li className='txt'><button onClick={() => changeCity('Нижний Новгород')}>Нижний Новгород</button></li>
                        <li className='txt'><button onClick={() => changeCity('Хабаровск')}>Хабаровск</button></li>
                        <li className='txt'><button onClick={() => changeCity('Воронеж')}>Воронеж</button></li>
                        <li className='txt'><button onClick={() => changeCity('Волгодрад')}>Волгодрад</button></li>
                        <li className='txt'><button onClick={() => changeCity('Сочи')}>Сочи</button></li>
                    </ol>
                </div>
            </div>}
        </>
    )
}