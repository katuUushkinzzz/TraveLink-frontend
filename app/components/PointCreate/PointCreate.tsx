import { ActionDispatch, useEffect, useState } from 'react';

import { State, Action } from '@/app/utils/reducer';
import Modal from '../Modal/Modal';

import './PointCreate.css'
import { PointCreateData } from '@/app/types/localTypes';

export default function PointCreate({ state, dispatch }: { state: State, dispatch: ActionDispatch<[action: Action]> }) {
  const [files, setFiles] = useState<File[] | null>(null);
  const [creationData, setData] = useState<PointCreateData>({
    address: '',
    description: '',
    name: '',
    type: '',
  })

  const handleUpload = async () => {
    if (!files || files.length === 0) return alert('Выберите файлы!');

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('photos', files[i]);
    }

    formData.append('address', creationData.address)
    formData.append('description', creationData.description)
    formData.append('name', creationData.name)
    formData.append('type', creationData.type)

    try {
      const response = await fetch('http://217.60.36.77:4000/point/create/a', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${state.authToken}`,
        },
        body: formData,
      });

      const data = await response.json().then(() => dispatch({ type: 'SET_MODAL_POINT', payload: false }));

      console.log(data);

    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const chosenFiles = Array.from(e.target.files);

      if (chosenFiles.length > 10) {
        alert("Вы не можете загрузить более 5 изображений за один раз!");
        e.target.value = "";
        return;
      }

      setFiles(chosenFiles);
    }
  };

  useEffect(() => { console.log(creationData) }, [creationData])

  return (
    <Modal stateSwitch={state.isPointModalShown} dispatch={dispatch} action={{ type: 'SET_MODAL_POINT', payload: false }}>
      <div className='createContainer'>
        <span className="txt">Название места</span>
        <input type="text" className="txt" onChange={(e) => {
          const newData = { ...creationData }
          if (e.currentTarget.value) {
            newData.name = e.currentTarget.value
          }
          setData(newData)
        }}></input>

        <span className="txt">Тип места</span>
        <select className="txt" onChange={(e) => {
          const newData = { ...creationData }
          if (e.currentTarget.value) {
            newData.type = e.currentTarget.value
          }
          setData(newData)
        }} defaultValue={'Пляж'}>
          <option value="Пляж">Пляж</option>
          <option value="Православный храм">Православный храм</option>
          <option value="Жанровая скульптура">Жанровая скульптура</option>
          <option value="Гостевой дом">Гостевой дом</option>
          <option value="Достопримечательность">Достопримечательность</option>
          <option value="Кафе">Кафе</option>
          <option value="Музей">Музей</option>
          <option value="Смотровая площадка">Смотровая площадка</option>
          <option value="Памятник">Памятник</option>
          <option value="Сквер">Сквер</option>
          <option value="Мемориальная доска">Мемориальная доска</option>
          <option value="Магазин">Магазин</option>
          <option value="ВУЗ">ВУЗ</option>
          <option value="Фитнес-клуб">Фитнес-клуб</option>
          <option value="Банк">Банк</option>
          <option value="Супермаркет">Супермаркет</option>
          <option value="Ресторан">Ресторан</option>
          <option value="Салон красоты">Салон красоты</option>
          <option value="Художественная мастерская">Художественная мастерская</option>
          <option value="Книжный магазин">Книжный магазин</option>
          <option value="Зоомагазин">Зоомагазин</option>
          <option value="Кофейня">Кофейня</option>
          <option value="Аптека">Аптека</option>
          <option value="Магазин продуктов">Магазин продуктов</option>
          <option value="Площадь">Площадь</option>
          <option value="Пекарня">Пекарня</option>
          <option value="Бар">Бар</option>
          <option value="Магазин парфюмерии и косметики">Магазин парфюмерии и косметики</option>
          <option value="Хостел">Хостел</option>
          <option value="Магазин цветов">Магазин цветов</option>
          <option value="Магазин канцтоваров">Магазин канцтоваров</option>
          <option value="Памятник архитектуры">Памятник архитектуры</option>
          <option value="Пиццерия">Пиццерия</option>
          <option value="Гостиница">Гостиница</option>
          <option value="Поликлиника">Поликлиника</option>
          <option value="Доставка еды">Доставка еды</option>
          <option value="Кальян-бар">Кальян-бар</option>
          <option value="Быстрое питание">Быстрое питание</option>
          <option value="Набережная">Набережная</option>
          <option value="Порт">Порт</option>
          <option value="Колледж">Колледж</option>
          <option value="Магазин электроники">Магазин электроники</option>
          <option value="Выставочный центр">Выставочный центр</option>
          <option value="Музыкальное образование">Музыкальное образование</option>
          <option value="Медцентр">Медцентр</option>
          <option value="Столовая">Столовая</option>
          <option value="Гимназия">Гимназия</option>
          <option value="Детская поликлиника">Детская поликлиника</option>
          <option value="Суши-бар">Суши-бар</option>
          <option value="Спа-салон">Спа-салон</option>
          <option value="Железнодорожные билеты">Железнодорожные билеты</option>
          <option value="Кондитерская">Кондитерская</option>
          <option value="Барбершоп">Барбершоп</option>
          <option value="Театр">Театр</option>
          <option value="Администрация">Администрация</option>
          <option value="НИИ">НИИ</option>
          <option value="Жильё посуточно">Жильё посуточно</option>
          <option value="Дом культуры">Дом культуры</option>
          <option value="Городской парк">Городской парк</option>
          <option value="Торговый центр">Торговый центр</option>
          <option value="Почтовое отделение">Почтовое отделение</option>
          <option value="Общеобразовательная школа">Общеобразовательная школа</option>
          <option value="Картинг">Картинг</option>
          <option value="Баня">Баня</option>
          <option value="Детская больница">Детская больница</option>
          <option value="Банкетный зал">Банкетный зал</option>
          <option value="Часовня">Часовня</option>
          <option value="Стадион">Стадион</option>
          <option value="Памятник технике">Памятник технике</option>
          <option value="Природа">Природа</option>
          <option value="Магазин чая">Магазин чая</option>
          <option value="Магазин подарков и сувениров">Магазин подарков и сувениров</option>
          <option value="Тату-салон">Тату-салон</option>
          <option value="Клуб досуга">Клуб досуга</option>
          <option value="АЗС">АЗС</option>
          <option value="Бассейн">Бассейн</option>
          <option value="Спортивный зал">Спортивный зал</option>
          <option value="Аквапарк">Аквапарк</option>
          <option value="Сауна">Сауна</option>
          <option value="Кемпинг">Кемпинг</option>
          <option value="Декоративный объект">Декоративный объект</option>
          <option value="Магазин бытовой техники">Магазин бытовой техники</option>
          <option value="Студия йоги">Студия йоги</option>
          <option value="Свадебный салон">Свадебный салон</option>
          <option value="Обучение мастеров для салонов красоты">Обучение мастеров для салонов красоты</option>
          <option value="Диагностический центр">Диагностический центр</option>
          <option value="Медицинская комиссия">Медицинская комиссия</option>
          <option value="Магазин часов">Магазин часов</option>
          <option value="Туроператор">Туроператор</option>
          <option value="Банкомат">Банкомат</option>
          <option value="Фотоуслуги">Фотоуслуги</option>
          <option value="Поликлиника для взрослых">Поликлиника для взрослых</option>
          <option value="Больница для взрослых">Больница для взрослых</option>
          <option value="Центр развития ребёнка">Центр развития ребёнка</option>
          <option value="Оздоровительный центр">Оздоровительный центр</option>
          <option value="Слуховые аппараты">Слуховые аппараты</option>
          <option value="Швейная фурнитура">Швейная фурнитура</option>
          <option value="Игровая комната">Игровая комната</option>
          <option value="Рынок">Рынок</option>
          <option value="Медицинская лаборатория">Медицинская лаборатория</option>
          <option value="Медицинское оборудование">Медицинское оборудование</option>
          <option value="Товары для праздника">Товары для праздника</option>
          <option value="Спортивный комплекс">Спортивный комплекс</option>
          <option value="Магазин кулинарии">Магазин кулинарии</option>
          <option value="Школа искусств">Школа искусств</option>
          <option value="Техникум">Техникум</option>
          <option value="Лицей">Лицей</option>
          <option value="Бильярдный клуб">Бильярдный клуб</option>
          <option value="Лазертаг">Лазертаг</option>
          <option value="Квесты">Квесты</option>
          <option value="Садовый центр">Садовый центр</option>
          <option value="Служба скорой медпомощи">Служба скорой медпомощи</option>
          <option value="Спортивная школа">Спортивная школа</option>
          <option value="Пейнтбол">Пейнтбол</option>
          <option value="Каток">Каток</option>
          <option value="МФЦ">МФЦ</option>
          <option value="Женская консультация">Женская консультация</option>
          <option value="Родильный дом">Родильный дом</option>
          <option value="Организация и проведение детских праздников">Организация и проведение детских праздников</option>
          <option value="Школа танцев">Школа танцев</option>
          <option value="Транспортная касса">Транспортная касса</option>
          <option value="Железнодорожная станция">Железнодорожная станция</option>
          <option value="Остановка общественного транспорта">Остановка общественного транспорта</option>
          <option value="Ночной клуб">Ночной клуб</option>
          <option value="Вещевой рынок">Вещевой рынок</option>
          <option value="Магазин смешанных товаров">Магазин смешанных товаров</option>
          <option value="Магазин табака и курительных принадлежностей">Магазин табака и курительных принадлежностей</option>
          <option value="Компьютерный клуб">Компьютерный клуб</option>
          <option value="Алкогольные напитки">Алкогольные напитки</option>
          <option value="Магазин обуви">Магазин обуви</option>
          <option value="Магазин одежды">Магазин одежды</option>
          <option value="Салон оптики">Салон оптики</option>
          <option value="Магазин чулок и колготок">Магазин чулок и колготок</option>
          <option value="Бизнес-центр">Бизнес-центр</option>
          <option value="Диспансер">Диспансер</option>
          <option value="Спортивный клуб">Спортивный клуб</option>
          <option value="Жилой комплекс">Жилой комплекс</option>
          <option value="Яхт-клуб">Яхт-клуб</option>
          <option value="Пансионат для пожилых людей">Пансионат для пожилых людей</option>
          <option value="Батутный центр">Батутный центр</option>
          <option value="Автомойка">Автомойка</option>
          <option value="Развлекательный центр">Развлекательный центр</option>
          <option value="Детский магазин">Детский магазин</option>
          <option value="База">База</option>
          <option value="Конный клуб">Конный клуб</option>
          <option value="Продуктовый гипермаркет">Продуктовый гипермаркет</option>
        </select>

        <span className="txt">О месте</span>
        <textarea className="txt" onChange={(e) => {
          const newData = { ...creationData }
          if (e.currentTarget.value) {
            newData.description = e.currentTarget.value
          }
          setData(newData)
        }}></textarea>

        <span className="txt">Адрес</span>
        <input type='text' className="txt" onChange={(e) => {
          const newData = { ...creationData }
          if (e.currentTarget.value) {
            newData.address = e.currentTarget.value
          }
          setData(newData)
        }}></input>

        <span className="txt">Фотографии</span>
        <input type="file" accept="image/*" multiple className="txt" onChange={handleFileChange}></input>

        <button onClick={handleUpload} className='txt publishButton'>Создать</button>
      </div>
    </Modal>
  )
}