import React, { useEffect, useState } from 'react'
import ReactAnimatedweather from "react-animated-weather"
const baseUrl=process.env.REACT_APP_BASE;
const key=process.env.REACT_APP_KEY

const Weather = ({ weather, city }) => {

    console.log(baseUrl,key);



    const defaults = {
        color: 'white',
        size: 112,
        animate: true
    };

    const [scity, searchCity] = useState(city);
    const [weth, setWeather] = useState("");
    const [icon, setIcon] = useState("CLEAR_DAY")
    console.log("icon", icon);
    const [error, setError] = useState("");
    const search = async () => {
        const res = await fetch(`${baseUrl}?q=${scity}&units=metric&APPID=${key}`);
        const data = await res.json();
        if (data.cod === 200) {
            console.log(data);
            setWeather(data);
            searchCity("");
        }
        else {
            console.log(data);
            setWeather("");
            searchCity("");
            setError({ message: data.message });

        }

    }

    const animationIcon = () => {
        switch (weather) {
            case "Haze":
                setIcon("PARTLY_CLOUDY_DAY");
                break;
            case "Clouds":
                setIcon("CLOUDY");
                break;
            case "Rain":
                setIcon("RAIN");
                break;
            case "Snow":
                setIcon("SNOW");
                break;
            case "Dust":
                setIcon("WIND");
                break;
            case "Drizzle":
                setIcon("SLEET");
                break;
            case "Fog":
                setIcon("FOG");
                break;
            case "Smoke":
                setIcon("FOG");
                break;
            case "Tornado":
                setIcon("WIND");
                break;
            case "Mist":
                    setIcon("FOG");
                    break;
            default:
                setIcon("CLEAR_DAY");
        }

    }


    useEffect(() => {
        search(city);
        animationIcon();        

    }, [])
    return (
        <div className='weather'>
            <div className='weather-icon'>
                <ReactAnimatedweather

                    icon={icon}
                    color={defaults.color}
                    size={defaults.size}
                    animate={defaults.animate}
                />
            </div>
            <div className='today-weather'>
                <h3>{weather}</h3>
                <div className='search'>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        search();
                    }}>
                        <input type="text" placeholder='search any city'
                            className='search-bar'
                            onChange={(e) => searchCity(e.target.value)}
                            value={scity}
                        />
                    </form>
                    <div>
                        <img
                            src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
                            onClick={search}
                            alt="search icon"
                        />
                    </div>
                </div>
                <ul>
                    {typeof weth.main != "undefined" ?
                        (<div>
                            <li className="cityHead">
                                <p>
                                    {weth.name}, {weth.sys.country}
                                </p>
                                <img 
                                    src={`https://openweathermap.org/img/wn/${weth.weather[0].icon}.png`}
                                    alt="weather icon"
                                />
                            </li>
                            <li>
                                Temperature
                                <span className="">
                                    {Math.round(weth.main.temp)}°c ({weth.weather[0].main})
                                </span>

                            </li>
                            <li>
                                Humidity{" "}
                                <span className="">
                                    {Math.round(weth.main.humidity)}%
                                </span>
                            </li>
                            <li>
                                Visibility{" "}
                                <span className="">
                                    {Math.round(weth.visibility)} m
                                </span>
                            </li>
                            <li>
                                Wind Speed{" "}
                                <span className="">
                                    {Math.round(weth.wind.speed)} Km/h
                                </span>
                            </li>
                        </div>) : (
                            <li>
                                {error.message}
                            </li>
                        )


                    }
                </ul>
            </div>
        </div>
    )
}

export default Weather