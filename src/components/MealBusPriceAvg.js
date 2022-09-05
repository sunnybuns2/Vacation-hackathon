import axios from "axios";
import { useEffect, useState } from 'react';
import { PriceFormatter } from "./Functions";
import "./price.scss";


const MealBusPriceAvg = ({ currentCityName, currentCountryName }) => {

  //TODO selected city needs to be passed down to MealBusPriceAvg
  // let selectedCity = 'Calgary';
  // let selectedCountry = 'Canada'

  const [avgMealPrice, setAvgMealPrice] = useState("");
  const [avgBusPrice, setAvgBusPrice] = useState("");
  const [countryCurrency, setcountryCurrency] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [avgBeerPrice, setAvgBeerPrice] = useState("");


  //get request from api + data manipulation to get the average price by city
  useEffect(() => {

    const options = {
      method: 'GET',
      url: 'https://cost-of-living-and-prices.p.rapidapi.com/prices',
      params: { city_name: `${currentCityName}`, country_name: `${currentCountryName}` },
      headers: {
        'X-RapidAPI-Key': 'fcfc6a1324mshd8677dabb408d84p170697jsnc271c5030515',
        'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      // console.log(response.data);
      let allPrices = response.data.prices;
      //Meal cost for two
      let mealForTwoFancy = Number(allPrices.find(e => e.good_id === 37).usd.avg);
      let mealForTwo = Number(allPrices.find(e => e.good_id === 38).usd.avg);
      let mealAvg = (mealForTwoFancy + mealForTwo) / 2;
      setAvgMealPrice(mealAvg)

      //transportation cost per trip
      let transportation = Number(allPrices.find(e => e.good_id === 47).usd.avg)
      setAvgBusPrice(transportation)

      let beer = Number(allPrices.find(e => e.good_id === 14).usd.avg)
      setAvgBeerPrice(beer)

      //currency exchange rate
      let currencyCode = response.data.prices[0].currency_code;
      let rate = response.data.exchange_rate[currencyCode];
      setcountryCurrency(currencyCode);
      setExchangeRate(rate);

    }).catch(function (error) {
      console.error(error);
    });

  }, [currentCityName])

  if (!avgMealPrice || !avgBusPrice || !countryCurrency || !exchangeRate || !avgBeerPrice) { return <div>loading...</div> }

  return (
    <>
      <h2 className="price__text">Avg Meal Price for Two: {PriceFormatter(avgMealPrice)}</h2>
      <h2 className="price__text">Avg Domestic Beer Price: {PriceFormatter(avgBeerPrice)}</h2>
      <h2 className="price__text">Avg Bus Price/Trip: {PriceFormatter(avgBusPrice)}</h2>
      <h2 className="price__text">Currency conversion: USD to {countryCurrency}: {PriceFormatter(exchangeRate)}</h2>
    </>

  )
}

export default MealBusPriceAvg