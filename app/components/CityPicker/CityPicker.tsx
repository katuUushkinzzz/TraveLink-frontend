import { ActionDispatch } from 'react';
import Image from 'next/image'

import './CityPicker.css'
import { State, Action } from '../LocalTypes';
import Modal from '../Modal';

export default function CityPicker({ state, dispatch, setCityName }:
  {
    state: State, dispatch: ActionDispatch<[action: Action]>, setCityName: (value: unknown) => void
  }) {

  const changeCity = (cityName: string) => {
    if (state.currentCity != cityName) {
      setCityName(cityName)
      dispatch({ type: 'SET_CITY', payload: cityName })
    }
    dispatch({ type: 'TOGGLE_PICKER', payload: false })
  }

  return (
    <Modal stateSwitch={state.isPickerVisible} dispatch={dispatch} action={{ type: 'TOGGLE_PICKER', payload: false }}>
      <div className='cityPickerHeader'>
        <div className='cityPickerHeaderHeader'>
          <h1 className='txt'>Выберите город</h1>
        </div>
        <div className='cityPickerSearchContainer'>
          <div className='cityPickerSearchBar'>
            <input type='search' placeholder='Введите город' className='txt'></input>
            <button><Image alt="" src="/search-window/search.png" width={30} height={30} className='img' /></button>
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
    </Modal>
  )
}