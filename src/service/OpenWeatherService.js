import axios from "axios";

const OpenWeatherService = {
  async getWeatherData(city) {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `${process.env.REACT_APP_WEATHER_API_URL}?q=${city}&appid=${apiKey}`;
    return await axios.get(url);
  },
};

export default OpenWeatherService;
