import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
const dataArray = require("../../data/cities.json");

const containerStyle = {
  width: '100%',
  height: '60rem'
};

const center = {
  lat: 39.8097343,
  lng: -98.5556199
};

const MapsContainer = ({ query, currentCityName }) => {
  const myArray = dataArray.cities;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDbaCQZUfaxuhw4u9S_5rj3CE__gpP6C2E"
  })

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, [])

  const positionFunction = (lati, long) => {
    let position = {
      lat: lati,
      lng: long
    }
    return position;
  }

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      { /* Child components, such as markers, info windows, etc. */}
      <>
        {currentCityName ? (

          myArray.filter(city => currentCityName.toLowerCase() === city.city_name.toLowerCase()).map((mark, i) => (
            <Marker
              key={i}
              position={positionFunction(mark.lat, mark.lng)}
              title={mark.city_name}
            />)
          ))
          :
          query ? (

            myArray.filter(country => query.toLowerCase() === country.country_name.toLowerCase()).map((mark, i) => (
              <Marker
                key={i}
                position={positionFunction(mark.lat, mark.lng)}
                title={mark.city_name}
              />)
            ))
            :
            (
              myArray.map((mark, i) => (
                <Marker
                  key={i}
                  position={positionFunction(mark.lat, mark.lng)}
                  title={mark.city_name}
                />
              ))
            )
        }
      </>
    </GoogleMap>
  ) : <></>
}

export default MapsContainer