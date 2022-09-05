import axios from "axios";
import { useEffect, useState } from 'react';
import { PriceFormatter } from "./Functions";
import "./price.scss";


const CarPriceAvg = ({ selectedAirport }) => {

  //TODO selected city needs to be passed down to CarPriceAvg
  // let selectedCity = 'calgary';


  const [avgCarPrice, setAvgCarPrice] = useState("");

  //get request from api + data manipulation to get the average price by city
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://priceline-com-provider.p.rapidapi.com/v2/cars/resultsRequest',
      params: {
        dropoff_time: '10:00',
        dropoff_date: '04/02/2023',
        pickup_time: '10:00',
        pickup_date: '04/01/2023',
        dropoff_city_string: `${selectedAirport}`,
        pickup_city_string: `${selectedAirport}`
      },
      headers: {
        'X-RapidAPI-Key': 'fcfc6a1324mshd8677dabb408d84p170697jsnc271c5030515',
        'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      let results = response.data.getCarResultsRequest.results.results_list;
      let keys = Object.keys(results)
      let priceArray = []
      keys.forEach(key => {
        let price = Number(results[key]["price_details"]["base"]["total_price"]);
        priceArray.push(price);
      })
      let priceAvg = priceArray.reduce((a, b) => a + b) / priceArray.length;
      setAvgCarPrice(priceAvg)

    }).catch(function (error) {
      console.error(error);
    });

  }, [selectedAirport])

  if (!avgCarPrice) { return <div className="price__text">loading...</div> }

  if (!selectedAirport) {
    return <p className="price__text">Loading...</p>
  }

  return (
    <>
      <h2 className="price__text">Avg Car Rental Price/Day: {PriceFormatter(avgCarPrice)}</h2>
    </>

  )
}

export default CarPriceAvg