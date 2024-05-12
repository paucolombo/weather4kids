
const WEATHER_API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

export const ApiCall = async (path, params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `https://api.openweathermap.org/data/2.5/${path}?${queryString}&appid=${WEATHER_API_KEY}`;
    return await fetch(url).then((res) => res.json());
  } catch (error) {
    console.log(error);
    return error;
  }
};