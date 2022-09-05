import React from "react";
import "./Home.scss";
import CityList from "../CityList/CityList";
import { useState } from "react";
import cityDataList from "../../data/cities.json"

const Home = () => {
  const [activeId, setActiveId] = useState(272);
  const cityList = cityDataList.cities

  let currentCity = cityList.find(
    (city) => city.city_id === activeId)


  let currentCityName = currentCity.city_name
  let currentCountryName = currentCity.country_name

  return (
    <div className='home'>
      <CityList
        activeId={activeId}
        setActiveId={setActiveId}
        currentCityName={currentCityName}
        currentCountryName={currentCountryName}
      />

    </div>
  )
}

export default Home