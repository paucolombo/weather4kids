import React, { useState, useEffect } from 'react'
import "./CurrentCity.css";
import Kid from '../components/kid/Kid';
import { ApiCall } from '../utils/Apicalls';

function CurrentCity({ currentPosition, showDetails }){
  const [weather, setWeather] = useState([]);
  useEffect(() => {
        if (currentPosition.latitude != undefined && weather.length === 0) {
          ApiCall('weather', {lat: currentPosition.latitude, lon: currentPosition.longitude, units: 'metric'})
          .then(response => {
            setWeather(response);
          })
          .catch(error => {
            console.error('Error fetching weather data:', error);
          });
        }
  }, [currentPosition]);
  return (
    <>
      {weather.name &&
        <main>
          <div className='mainContainer'>
            <div className='headerContainer'>
              <div className='weatherKid'><Kid weather={weather.weather[0].main} temperature={weather.main.temp} /></div>
              <div className='cityHeader'>
                <img src={`/${weather.weather[0].icon}.svg`}></img>
                <h1>{Math.round(weather.main.temp)}º</h1>
              </div>
            </div>
            <h2> 📍{weather.name}</h2>
            <h3>{weather.weather[0].description}</h3>
            <span>Feels Like: {Math.round(weather.main.feels_like)}º</span>
          </div>
          {showDetails &&
            <div className='infoContainer'>
              <ul>
                <li><span><img src='/wind.png' alt='wind'></img></span>Wind: {Math.round(weather.wind.speed * 3.6)}km/h</li>
                <li><span><img src='/humidity.png' alt='humidity'></img></span>Humidity: {weather.main.humidity}% </li>
                <li><span><img src='/max.png' alt='max-temp'></img></span>Max Temperature: {Math.round(weather.main.temp_max)}º</li>
                <li><span><img src='/min.png' alt='min-temp'></img></span>Min Temperature:{Math.round(weather.main.temp_min)}º </li>
              </ul>
            </div>
          }
        </main>
      }
    </>
  )
}

export default CurrentCity