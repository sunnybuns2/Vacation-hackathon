import "./CityList.scss";
import cityListData from "../../data/cities.json";
import airportCodes from '../../data/aiports.json';
import MapsContainer from '../MapsContainer/MapsContainer';
import CarPriceAvg from '../CarPriceAvg';
import HotelPriceAvg from '../HotelPriceAvg';
import MealBusPriceAvg from '../MealBusPriceAvg'
import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

const Cities = ({ activeId, setActiveId, currentCityName, currentCountryName }) => {
  const [query, setQuery] = useState("Canada");
  const [flag, setFlag] = useState();
  const [flagName, setFlagName] = useState(currentCountryName.toLowerCase());
  // const [activeId, setActiveId] = useState();
  const cityList = cityListData.cities

  let findAirport = airportCodes.find(e => e.cityName === currentCityName.toLowerCase());
  let selectedAirport;
  if (findAirport) { selectedAirport = findAirport.airportCode };

  useEffect(() => {
    setFlagName(query.toLowerCase());
  }, [query]);

  return (
    <div className="main-container">
      <div className="country">
        <h1 className="country__header">Choose your dream destination now!</h1>
        <label className="country__label">
          Enter your country of choice!
          <input
            className="country__form"
            placeholder="Enter Country"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

      </div>

      <div className="cities">
        <div className="cities__title">
          <h2 className="cities__header">Current Selected Country: {query}</h2>
          <img className="cities__flag" src={`https://countryflagsapi.com/png/${flagName}`} alt="Country flag" />
        </div>
        <div className="cities__wrapper">
          <ul className="cities__list">
            {cityList
              .sort((a, b) => a.city_name.localeCompare(b.city_name))
              .filter((city) => {
                if (query === "") {
                  return "huh?";
                } else if (
                  city.country_name.toLowerCase().includes(query.toLowerCase())
                ) {
                  return city;
                }
              })
              .map((city, index) => (
                <li
                  key={city.city_id}
                  onClick={() => setActiveId(city.city_id)}
                  className={`city ${activeId === city.city_id ? "city__active" : ""}`}
                >
                  {city.city_name}
                </li>
              ))}
          </ul>
          <div className="cities__container">
            <HotelPriceAvg
              currentCityName={currentCityName}
            />
            {selectedAirport ? <CarPriceAvg
              selectedAirport={selectedAirport}
            /> :
              <p className="price__text">Data not found</p>}

            <MealBusPriceAvg
              currentCityName={currentCityName}
              currentCountryName={currentCountryName}
            />
          </div>
        </div>
      </div>
      <MapsContainer
        query={query}
        currentCityName={currentCityName}
      />
    </div>
  );
};
export default Cities;
