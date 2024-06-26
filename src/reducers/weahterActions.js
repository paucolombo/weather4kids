import { ApiCall } from "../utils/Apicalls";

export const getForecast =(currentPosition, forecast, minTemperature, maxTemperature, dispatch)=> {
  if (currentPosition.latitude !== undefined && forecast.length === 0) {
    const dailyWeather = {};
    ApiCall('forecast',{lat: currentPosition.latitude, lon: currentPosition.longitude, units: 'metric'})
    .then(response => {
      response.list.map((weatherTime) => {
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
      dispatch({ type: 'SET_MIN_TEMPERATURE', payload: minTemp });
      dispatch({ type: 'SET_MAX_TEMPERATURE', payload: maxTemp });
      if (maxTemperature.length === 5) { numberDay = -1 }
      const dailyData = response.list.filter((weatherTime) =>
        weatherTime.dt_txt.includes("12:00:00"));
      dispatch({ type: 'SET_FORECAST', payload: dailyData });
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
  };
  return { forecast, minTemperature, maxTemperature };
;
}