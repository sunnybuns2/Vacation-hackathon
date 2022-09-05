import axios from "axios";
import { useEffect, useState } from 'react';
import { PriceFormatter } from "./Functions";
import "./price.scss";

const HotelPriceAvg = ({ currentCityName }) => {

  //TODO selected city needs to be passed down to HotelPriceAvg
  // let selectedCity = 'calgary';
  const [avgHotelPrice, setAvgHotelPrice] = useState("");

  useEffect(() => {
    const destId = {
      method: 'GET',
      url: 'https://hotels4.p.rapidapi.com/locations/v2/search',
      params: { query: `${currentCityName}`, locale: 'en_US', currency: 'USD' },
      headers: {
        'X-RapidAPI-Key': 'fcfc6a1324mshd8677dabb408d84p170697jsnc271c5030515',
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
      }
    };
    // get city destination ID
    axios.request(destId).then(response => {
      let destinationId = response.data.suggestions[0].entities[0].destinationId;

      // // get hotel details
      const options = {
        method: 'GET',
        url: 'https://hotels4.p.rapidapi.com/properties/list',
        params: {
          destinationId: `${destinationId}`,
          pageNumber: '1',
          pageSize: '25',
          checkIn: '2022-10-08',
          checkOut: '2022-10-15',
          adults1: '1',
          sortOrder: 'PRICE',
          locale: 'en_US',
          currency: 'USD'
        },
        headers: {
          'X-RapidAPI-Key': 'fcfc6a1324mshd8677dabb408d84p170697jsnc271c5030515',
          'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
        }
      };
      //get hotel prices average per night
      axios.request(options).then(function (response) {
        let HotelsArray = response.data.data.body.searchResults.results;
        let hotelPrices = [];
        HotelsArray.forEach(hotel => {
          hotelPrices.push(hotel.ratePlan.price.exactCurrent)
        });
        let avgHotelPrice = hotelPrices.reduce((a, b) => a + b) / hotelPrices.length
        // console.log(avgHotelPrice)
        setAvgHotelPrice(avgHotelPrice)

      }).catch(function (error) {
        console.error(error);
      });

    }).catch(function (error) {
      console.error(error);
    });
  }, [currentCityName])

  if (!avgHotelPrice) { return <div className="price__text">loading...</div> }

  return (
    <>
      <h2 className="price__city-name">{currentCityName}</h2>
      <h2 className="price__text">Avg Hotel Price/Night: {PriceFormatter(avgHotelPrice)}</h2>
    </>

  )
}

export default HotelPriceAvg