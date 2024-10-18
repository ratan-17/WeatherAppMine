// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Import your custom CSS
import cloudyImage from './images/cloudy.jpg';  // Add images based on weather conditions
import sunnyImage from './images/sunny.jpg';
import rainyImage from './images/rainy.jpg';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [background, setBackground] = useState('');
  const [error, setError] = useState('');

  const API_KEY = '8443b6140013067cca19f8c91bdf42ba';  // Replace with your OpenWeatherMap API key

  const getWeather = async () => {
    if (!city) {
      setError('Please enter a city.');
      return;
    }
    setError('');  // Clear previous errors
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);

      // Dynamically update background based on weather conditions
      const weatherMain = response.data.weather[0].main.toLowerCase();
      if (weatherMain.includes('cloud')) {
        setBackground(cloudyImage);
      } else if (weatherMain.includes('rain')) {
        setBackground(rainyImage);
      } else if (weatherMain.includes('clear')) {
        setBackground(sunnyImage);
      } else {
        setBackground(cloudyImage);  // Default background
      }
    } catch (error) {
      setError('City not found. Please try again.');
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${background})` }}>
      <div className="weather-container">
        <h1>Weather App</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeather}>Get Weather</button>
        </div>
        {error && <p className="error">{error}</p>}
        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <p>{weatherData.weather[0].description}</p>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
