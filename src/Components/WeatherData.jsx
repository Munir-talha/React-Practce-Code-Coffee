import React, { useState } from 'react'

const WeatherData = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState([])
    const getWeather = async() =>{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7a04f310946c3a390ee06a110f8b0faa&units=matric`)
         var data = await response.json()
         setWeatherData(data)

    }


  return (
    <div>
        <input placeholder={'Enter City'} value={city} onChange={(e)=>setCity(e.target.value)} />
        <button onClick={getWeather}>Search</button>
        <div>
            <p>{weatherData.name}</p>
            <p>{weatherData.main.temp}</p>
        </div>
    </div>
  )
}

export default WeatherData