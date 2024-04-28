
const WEATHER_API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
export const  ApiCall = async (url) =>  {
    try {
        return await fetch(url+WEATHER_API_KEY+"&units=metric").then((res) => res.json()); 
    } catch (error) {
      console.log(error);
      return error;
    }
  };