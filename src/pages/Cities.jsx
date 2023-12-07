import React from 'react'
import "./cities.css";
import { CITIES } from '../data/cities';
import { Link } from 'react-router-dom';

function Cities() {
  return (
    <div className='cities'>
      <h1>Choose a city</h1>
      <ul className='citiesList'>
        {CITIES.map((city) => (
          <li className='cityCard' key={city.name}><Link key={city.name} to={`/${city.name}`}>
            <img src={city.img} alt={city.name}>
            </img></Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Cities