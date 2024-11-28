import React, { useState } from "react";
import OpenWeatherService from "../service/OpenWeatherService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Main.css";

export default function Main() {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [iconUrl, setIconUrl] = useState("");

  const getWeather = async (e) => {
    e.preventDefault();
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
    <div className="main-container">
      <nav>
        <div className="navcontainer">
          <h2 className="app_name">AuroraForecast</h2>
        </div>
      </nav>

      <div className="container text-center mt-4">
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
          <div className="grid-layout">
            <div className="card weather-card first-card">
              <div className="card-body">
                <h5 className="card-title">Weather</h5>
                <img src={iconUrl} alt="Weather Icon" className="weather-icon" />
                <p>
                  <strong>Temperature:</strong> {weatherData.main.temp}°C
                </p>
                <p>
                  <strong>Feels Like:</strong> {weatherData.main.feels_like}°C
                </p>
                <p>
                  <strong>Min Temp:</strong> {weatherData.main.temp_min}°C
                </p>
                <p>
                  <strong>Max Temp:</strong> {weatherData.main.temp_max}°C
                </p>
              </div>
            </div>

            <div className="card weather-card second-card">
              <div className="card-body">
                <h5 className="card-title">Wind & Visibility</h5>
                <p>
                  <strong>Visibility:</strong> {weatherData.visibility} meters
                </p>
                <p>
                  <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
                </p>
                <p>
                  <strong>Wind Direction:</strong> {weatherData.wind.deg}°
                </p>
                <p>
                  <strong>Wind Gust:</strong>{" "}
                  {weatherData.wind.gust ? `${weatherData.wind.gust} m/s` : "N/A"}
                </p>
              </div>
            </div>

            <div className="card weather-card third-card">
              <div className="card-body">
                <h5 className="card-title">Rainfall</h5>
                {weatherData.rain && weatherData.rain["1h"] ? (
                  <p>
                    <strong>Rain (Last Hour):</strong> {weatherData.rain["1h"]} mm
                  </p>
                ) : (
                  <p>
                    <strong>Rain (Last Hour):</strong> No data
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
