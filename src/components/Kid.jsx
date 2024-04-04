import React from 'react'
import useWeatherKid from '../hooks/useWeatherKid';

function Kid({ weather, temperature }) {
  const weatherKid = useWeatherKid(weather, temperature);
  return (
    <>
      <img src={`${weatherKid}.png`} alt={weatherKid}></img >
    </>
  )
}

export default Kid