import React from 'react'
import './weather.css'
import { MDBSpinner } from 'mdb-react-ui-kit';
import { useState } from 'react';

function Weather() {

  const [location, setLocation] = useState('')
  const [data, setData] = useState({})
  const [url, setUrl] = useState('')
  const [load, setLoad] = useState(false);

  const API_KEY = '59dac662600b6f269298b677e9ca5fba';
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

  const locationHandler = (e) => {
    setLocation(e.target.value);
  }

  const fetchData = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setData(data);
      setUrl(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
      setLoad(false)
      console.log(data);
    } catch (err) {
      alert('Location Not Fount !')
      setLoad(false)
    }
  }

  const buttonHandler = () => {
    setData({})
    setLoad(true)
    fetchData()
  }



  return (
    <div className='outerContainer'>
      <div className='searchBox'>
        <input onChange={(e) => locationHandler(e)} type="text" className='searchPlace shadow-lg' placeholder='Enter Location' /> <button onClick={buttonHandler} className='searchBtn shadow-lg'><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>
      <div className="loading"></div>
      {data.name != undefined && <div>
        <div className="weather shadow-lg">
          <h4 className='locationName'>{data.name}</h4>
          {data.main ? <h1 className='locationWeather'>{data.main.temp}°C</h1> : null}
        </div>
        <div className="weatherDetails shadow-lg">
          <div className="weatherFeels">
            {data.main ? <h3>{data.main.feels_like}°F</h3> : null}
            <p>Feels Like</p>
          </div>
          <div className="weatherHumidity">
            {data.main ? <h3>{data.main.humidity}%</h3> : null}
            <p>Humidity</p>
          </div>
          <div className="weatherSpeed">
            {data.main ? <h3>{data.wind.speed} km/h</h3> : null}
            <p>Wind Speed</p>
          </div>
        </div>
        <div className='currentWeather shadow-lg'>
          {data.weather ? <h4>{data.weather[0].description}</h4> : null}
          {data.weather ? <img src={url} width={'60px'} alt="" /> : null}
        </div>
      </div>}
      {load && <MDBSpinner className='loading shadow-lg' role='status' color='light'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>}

    </div>

  )
}

export default Weather