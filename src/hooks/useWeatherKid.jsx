import { useEffect, useState } from 'react';

function useWeatherKid(weather, temperature) {
  const [weatherKid, setWeatherKid] = useState('');
  useEffect(() => {
    if (weather === "Rain") {
      setWeatherKid('rainKid');
    } else if ((weather === "Snow") || (temperature <= 10)) {
      setWeatherKid('winterKid');
    } else {
      if (temperature >= 23) {
        setWeatherKid('summerKid');
      }
      else if (temperature > 10 && temperature < 23) {
        setWeatherKid('midTempKid');
      }
    }
  }, [weather, temperature]);
  return weatherKid;
}

export default useWeatherKid