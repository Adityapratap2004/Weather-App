import React, { useState } from 'react'
import Clock from "react-live-clock";
import Weather from './Weather';
import loader from "../images/WeatherIcons.gif"

const baseUrl=process.env.REACT_APP_BASE;
const key=process.env.REACT_APP_KEY


const CurrentRegion = () => {
  console.log(baseUrl,key);

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };


  const inistialState = {
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    sunrise: undefined,
    sunset: undefined,
    errorMsg: undefined,
    main: undefined,
  };

  const [weather, setweather] = useState(inistialState);
  console.log("weather main", weather.main);




  const getweather = async (lat, lon) => {
    const res = await fetch(`${baseUrl}?lat=${lat}&lon=${lon}&units=metric&APPID=${key}`);
    const data = await res.json();

    //state set karna hai abb
    setweather({

      lat: lat,
      lon: lon,
      city: data.name,
      temperatureC: Math.round(data.main.temp),
      temperatureF: Math.round(data.main.temp * 1.8 + 32),
      humidity: data.main.humidity,
      main: data.weather[0].main,
      country: data.sys.country,
    })
  }

  

  const getLocation = () => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert("Geolocation not avilable");
      console.log("Geolocation not avilable")
    }
  }

  const success = async (pos) => {
    const crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    getweather(crd.latitude, crd.longitude);
  }

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);

  }




  useState(() => {
    getLocation();

  }, [])

  if (weather.temperatureC) {

    return (

      <>
        <div className='yourweather'>
          <div className='location'>
            <h2>{weather.city}</h2>
            <h2>{weather.country}</h2>
          </div>

          <div className='date-time'>
            <div className='dmy'>

              <div className='current-time'>
                <Clock format="HH:mm:ss" interval={1000} ticking={true} />
              </div>
              <div className='current-date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='temperature'>
              <p>
                {weather.temperatureC}°<span>C</span>
              </p>
            </div>
          </div>
        </div>
        <Weather weather={weather.main} city={weather.city} />
      </>
    )
  }
  else {
    return (
      <div className='locationNotAllowed'>
        <img src={loader} alt="loader" />
        <h3>Detecting your location</h3>
        <p>
          Your current location wil be displayed on the App  & used
          for calculating Real time weather.
        </p>
      </div>
    )
  }
}


export default CurrentRegion