import React, { useState, useEffect } from 'react'
import "./NextDays.css";
function NextDays({ currentPosition, apiKey }) {
  const [forecast, setForecast] = useState([]);
  const [minTemperature, setMinTemp] = useState([]);
  const [maxTemperature, setMaxTemp] = useState([]);
  let numberDay = 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentPosition.latitude != undefined && forecast.length === 0) {
          const WEATHER_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${currentPosition.latitude}&lon=${currentPosition.longitude}&appid=${apiKey}&units=metric`;
          let data = await fetch(WEATHER_URL).then((res) => res.json());
          const dailyWeather = {};
          data.list.map((weatherTime) => {
            const date = weatherTime.dt_txt.split(' ')[0];
            if (!dailyWeather[date]) {
              dailyWeather[date] = [];
            }
            dailyWeather[date].push(weatherTime);
          })
          const minTemp = [];
          const maxTemp = [];
          Object.values(dailyWeather).forEach((dailyData) => {
            const minTemperature = Math.min(...dailyData.map((time) => time.main.temp_min));
            const maxTemperature = Math.max(...dailyData.map((time) => time.main.temp_max));
            minTemp.push(minTemperature);
            maxTemp.push(maxTemperature);
          });
          setMinTemp(minTemp);
          setMaxTemp(maxTemp);
          if (maxTemperature.length === 5) { numberDay = -1 }
          const dailyData = data.list.filter((weatherTime) =>
            weatherTime.dt_txt.includes("12:00:00"));
          setForecast(dailyData);
        };
      }
      catch (error) {
        console.log("error " + error);
      }
    };
    fetchData();
  }, [currentPosition]);
  return (
    <div className='nextDaysContainer'>
      <h1 className='titleNextDays'>Next Days</h1>
      {forecast.length !== 0 &&
        <div className='forecastContainer'>
          {forecast.map((day) => {
            numberDay++;
            let date = new Date(day.dt_txt);
            return (
              <ul className="forecastList" key={day.dt}>
                <li>
                  {date.toLocaleDateString("en-ES", {
                    weekday: "long",
                    day: "numeric",
                    month: "short"
                  })}
                </li>
                <li><img src={`/${day.weather[0].icon}.svg`} alt={day.weather[0].description}></img></li>
                <li>{day.weather[0].description}</li>
                <li>Max {Math.round(maxTemperature[numberDay])}º</li>
                <li>Min {Math.round(minTemperature[numberDay])}º</li>
              </ul>
            )
          })}
        </div>
      }
    </div>
  )
}
export default NextDays