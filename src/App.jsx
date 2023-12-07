import React, { useState, useEffect } from 'react';
import CurrentCity from './pages/currentCity';
import Navbar from './components/navbar';
import { Routes, Route } from 'react-router-dom';
import NextDays from './pages/NextDays';
import Cities from './pages/cities';
import CityCard from './components/CityCard';

function App() {
  const [currentPosition, setCurrentPosition] = useState([]);
  const WEATHER_API_KEY = "40006bbf0e3238d48dca5ea44a886d14";
  useEffect(() => {
    const position = navigator.geolocation.getCurrentPosition((position) => {
      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }
      setCurrentPosition(coords);
    })
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<CurrentCity currentPosition={currentPosition} apiKey={WEATHER_API_KEY} showDetails={true} />} />
        <Route path='/nextdays' element={<NextDays currentPosition={currentPosition} apiKey={WEATHER_API_KEY} />} />
        <Route path='/cities' element={<Cities />} />
        <Route path='/:name' element={
          <CityCard apiKey={WEATHER_API_KEY} />
        } />
      </Routes>
    </>
  )
}

export default App
