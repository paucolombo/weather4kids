import React, { useState, useEffect, useReducer } from 'react';
import './NextDays.css';
import { getForecast } from '../reducers/weahterActions';
import { initialState, reducer } from '../reducers/weatherReducer';

function NextDays({ currentPosition }) {
  let numberDay = 0;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { forecast, minTemperature, maxTemperature } = state;
  useEffect(() => {
         getForecast(currentPosition, forecast, minTemperature, maxTemperature, dispatch)
    }, [currentPosition]);

  return (
    <div className="nextDaysContainer">
      <h1 className="titleNextDays">Next Days</h1>
      {forecast.length !== 0 && (
        <div className="forecastContainer">
          {forecast.map((day) => {
            numberDay++;
            let date = new Date(day.dt_txt);
            return (
              <ul className="forecastList" key={day.dt}>
                <li>
                  {date.toLocaleDateString('en-ES', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'short',
                  })}
                </li>
                <li>
                  <img
                    src={`/${day.weather[0].icon}.svg`}
                    alt={day.weather[0].description}
                  ></img>
                </li>
                <li>{day.weather[0].description}</li>
                <li>Max {Math.round(maxTemperature[numberDay])}º</li>
                <li>Min {Math.round(minTemperature[numberDay])}º</li>
              </ul>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default NextDays;
