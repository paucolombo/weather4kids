import React from 'react'
import { useParams } from 'react-router-dom';
import { CITIES } from '../data/cities';
import "../pages/NextDays.css"
import { useState, useEffect } from 'react';
import NextDays from '../pages/NextDays';
import CurrentCity from '../pages/CurrentCity';

function CityCard({ apiKey }) {
  const { name } = useParams();
  const [cityPosition, setCityPosition] = useState([]);
  const WEATHER_API_KEY = "40006bbf0e3238d48dca5ea44a886d14";
  useEffect(() => {
    const selectedCity = CITIES.find(city => city.name === name);
    const coords = {
      latitude: selectedCity.lat,
      longitude: selectedCity.long,
    }
    setCityPosition(coords);
  }
    , []);
  return (
    <div className='selectedCityCard'>
      <CurrentCity currentPosition={cityPosition} apiKey={apiKey} showDetails={false} />
      <NextDays currentPosition={cityPosition} apiKey={apiKey} />
    </div>
  )
}
export default CityCard