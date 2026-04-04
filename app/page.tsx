'use client'

import SidePanel from "./components/SidePanel/SidePanel";
import CityPicker from "./components/CityPicker/CityPicker";
import { useState } from "react";

export default function Home() {
  const [isPickerVisible, showCityPicker] = useState<boolean>(false);
  const [currentCity, setCity] = useState<string>('Москва');
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <SidePanel showCityPicker={showCityPicker} currentCity={currentCity}/>
      <CityPicker showCityPicker={showCityPicker} isPickerVisible={isPickerVisible} currentCity={currentCity} setCity={setCity}/>
    </div>
  );
}
