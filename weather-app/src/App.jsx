import React, { useState } from "react";
import axios from "axios";
import "./App.css"; 

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "553f9de72d24b49579adbbbf66fed68c";
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name!");
      return;
    }
    try {
      const response = await axios.get(API_URL);
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("City not found! Please try again.");
      setWeather(null);
    }
  };

  return (
    <div className="container">
      <h1>Weather </h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>{weather.weather[0].main}</p>
          <p className="temp">{weather.main.temp}°C</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
