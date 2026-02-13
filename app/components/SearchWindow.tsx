'use client';

import Image from 'next/image';
import SearchBar from './SearchBar';
import './SearchWindow.css';

function CategoryButton({ categoryName, image, color }: { categoryName: string, image: string, color: string }) {
    return (
        <button className="categoryButton" onClick={() => console.log('sort ' + categoryName)}>
            <div className="categoryImage" style={{ backgroundColor: color }}>
                <Image alt="" src={image} width={45} height={45}/>
            </div>
            <span>{categoryName}</span>
        </button>
    )
}

export default function SearchWindow() {

    return (
        <div className="sideContainer">

                <div className="barContainer">
                    <SearchBar/>
                    <button className="collapseButton">&lt;</button>
                </div>
                <span className="headerLabel">Таганрог</span>
                <span className="subheaderLabel">Категории</span>
                <div className="categoryContainer">
                    <CategoryButton categoryName="Рестораны" image="/search-window/restaurant-cat-icon.png" color="#FE8E43"></CategoryButton>
                    <CategoryButton categoryName="Архитектура" image="/search-window/architechture-cat-icon.png" color="#FFE898"></CategoryButton>
                    <CategoryButton categoryName="Парки" image="/search-window/park-cat-icon.png" color="#85DB85"></CategoryButton>
                    <CategoryButton categoryName="Медицина" image="/search-window/medicine-cat-icon.png" color="#FF7070"></CategoryButton>
                    <CategoryButton categoryName="Продукты" image="/search-window/groceries-cat-icon.png" color="#FE8E43"></CategoryButton>
                    <CategoryButton categoryName="Торговые центры" image="/search-window/mall-cat-icon.png" color="#67999C"></CategoryButton>
                    <CategoryButton categoryName="Отдых" image="/search-window/rest-cat-icon.png" color="#FF7070"></CategoryButton>
                    <CategoryButton categoryName="Прачечные" image="/search-window/laudry-cat-icon.png" color="#67999C"></CategoryButton>
                    <CategoryButton categoryName="Развлечения" image="/search-window/ent-cat-icon.png" color="#CB3466"></CategoryButton>
                    <CategoryButton categoryName="Кофейни" image="/search-window/cafe-cat-icon.png" color="#BE8667"></CategoryButton>
                    <CategoryButton categoryName="Пляжи" image="/search-window/beach-cat-icon.png" color="#FFE897"></CategoryButton>
                    <CategoryButton categoryName="Салоны красоты" image="/search-window/beauty-cat-icon.png" color="#FF7070"></CategoryButton>
                </div>
                <span className="headerLabel">Рекомендации</span>
                <div className="recContainer">

                </div>
            
        </div>
    )
}