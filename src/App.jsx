import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './components/navbar/Navbar';
import Cities from './pages/Cities';
import CityCard from './components/cityCard/CityCard';

const CurrentCity = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('./pages/CurrentCity')), 1500)
  })
})

const NextDays = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('./pages/NextDays')), 1500)
  })
})

function App() {
  const [currentPosition, setCurrentPosition] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);
  const success = (position) => {
    const coords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    }
    setCurrentPosition(coords);
  }
  const error = (err) => {
    alert("You must activate the geolocation to use this app.");
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element=
          {
            <Suspense fallback={<div className='loading'><img src='spinner.svg' alt='loading' /></div>}>
              <CurrentCity currentPosition={currentPosition} showDetails={true} />
            </Suspense>
          }
        />
        <Route path='/nextdays' element=
          {
            <Suspense fallback={<div className='loading'><img src='spinner.svg' alt='loading' /></div>}>
              <NextDays currentPosition={currentPosition} />
            </Suspense>
          }
        />
        <Route path='/cities' element={<Cities />} />
        <Route path='/:name' element={
          <CityCard/>
        } />
      </Routes>
    </>
  )
}

export default App
