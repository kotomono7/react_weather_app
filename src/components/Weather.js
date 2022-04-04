import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

function Weather() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=b6a16cd2e81b0d8a68f15f0c1753a246`
  
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios
        .get(apiUrl)
        .then(res => {
          setData(res.data);
          console.log(res.data);
        })
        .catch(err => console.error(err));
      
      setLocation('');
    }
  }
  
  return (
    <div className="w-app">
      <div className="w-search">
        <input 
          type="text" 
          value={location} 
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Search Location" />
      </div>

      <div className="w-container">
        <div className="w-top">
          <div className="w-location">
            <p className="w-bold">{data.name}</p>
          </div>
          <div className="w-temp">
            {data.main ? <h1>{data.main.temp}°F</h1> : null}
          </div>
          <div className="w-desc">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

      {data.name !== undefined && 
        <div className="w-bottom">
          <div className="w-feels">
            {data.main ? <p className="w-bold">{data.main.feels_like}°F</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="w-humidity">
            {data.main ? <p className="w-bold">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="w-wind">
            {data.wind ? <p className="w-bold">{data.wind.speed} MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      }

      </div>
      
    </div>
  )
}

export default Weather
