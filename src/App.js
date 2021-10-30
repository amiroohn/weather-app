import React, { useState } from "react";
import { dateBuilder } from "./Functions";

const API = {
  key: "633ea83156eaee126203221398d4f6c5",
  base: "https://api.openweathermap.org/data/2.5/",
};

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${API.base}weather?q=${query}&units=metric&APPID=${API.key}`)
        .then((response) => response.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
          console.log(result);
        });
    }
  };

  return (
    <main
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 20 && weather.main.temp <= 29
            ? "app warm"
            : weather.main.temp > 29
            ? "app sunny"
            : "app"
          : "app"
      }
    >
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={(event) => setQuery(event.target.value)}
          value={query}
          onKeyPress={search}
        />
      </div>
      {typeof weather.main != "undefined" ? (
        <div>
          <div className="location-box">
            <div className="location">
              {weather.name}.{weather.sys.country}
            </div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)}°c</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </main>
  );
};

export default App;
