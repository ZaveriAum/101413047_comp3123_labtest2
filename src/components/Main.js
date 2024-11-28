import OpenWeatherService from "../service/OpenWeatherService";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Main.css";

export default function Main() {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [iconUrl, setIconUrl] = useState("");

  const getWeather = async (e) => {
    e.preventDefault();
    console.log(process.env.REACT_APP_WEATHER_ICON_URL)
    console.log(process.env.REACT_APP_WEATHER_API_URL)
    console.log(process.env.REACT_APP_WEATHER_API_KEY)
    try {
      const response = await OpenWeatherService.getWeatherData(query);
      setWeatherData(response.data);
      
      setIconUrl(
        `${process.env.REACT_APP_WEATHER_ICON_URL}/${response.data.weather[0].icon}@2x.png`
      );
    } catch (e) {
      console.error("Error fetching weather data", e);
    }
  };

  return (
    <div className="container main-container text-center">
      <h1 className="my-4">Weather App</h1>
      <form onSubmit={getWeather} className="mb-4">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            aria-label="City name"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>

      {weatherData && (
        <div className="weather-card p-4 rounded">
          <h2>{weatherData.name}</h2>
          <img src={iconUrl} alt="Weather Icon" className="mb-3" />
          <p className="mb-2">
            <strong>Temperature:</strong> {weatherData.main.temp}°C
          </p>
          <p className="mb-2">
            <strong>Feels Like:</strong> {weatherData.main.feels_like}°C
          </p>
          <p className="mb-2">
            <strong>Condition:</strong> {weatherData.weather[0].description}
          </p>
          <p className="mb-2">
            <strong>Humidity:</strong> {weatherData.main.humidity}%
          </p>
          <p>
            <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
          </p>
        </div>
      )}
    </div>
  );
}
