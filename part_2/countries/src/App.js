import axios from "axios";
import React, { useEffect, useState } from "react";
require("dotenv").config();

function App() {
    const [countries, setCountries] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filter, setFilter] = useState(false);
    const [currentCapital, setCurrentCapital] = useState(null);
    const [filteredResult, setFilteredResult] = useState([]);

    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all").then(response => {
            // console.log(response.data);
            setCountries(response.data);
        });
    }, []);

    useEffect(() => {
        if (currentCapital) {
            // console.log(currentCapital);
            axios
                .get(
                    `http://api.weatherstack.com/current?access_Key=${process.env.REACT_APP_API_KEY}&query=${currentCapital}`
                )
                .then(response => {
                    console.log(response.data);
                    setWeatherData(response.data);
                });
        }
    }, [currentCapital]);
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    const WeatherInfo = ({ capital, temperature, weatherDescription, weatherIcon, windSpeed, windDir }) => {
        return (
            <div>
                <h2>Weather in {capital}, right Now!</h2>
                <div>
                    <h3 style={{ display: "inline-block" }}>Temperature:</h3> <span>{temperature}° Celsius</span>
                </div>
                <div>
                    <h3 style={{ display: "inline-block" }}>Weather description:</h3>
                    <span> {weatherDescription}</span>
                </div>
                <img src={weatherIcon} alt='' />
                <div>
                    <h3 style={{ display: "inline-block" }}>Wind:</h3>{" "}
                    <span>
                        {windSpeed} kph direction {windDir}
                    </span>
                </div>
            </div>
        );
    };

    const Country = ({ name, capital, population, languages, flag }) => {
        const flgAlt = `${name} flag`;
        const langData = languages.map((language, i) => <li key={i}>{language.name}</li>);
        const weatherDetails = weatherData.current;

        if (filteredResult.length === 1) {
            setCurrentCapital(capital);
            // console.log(currentCapital);
            // console.log(languages);
            // console.log(weatherDetails ? weatherDetails : '');

            return (
                <React.Fragment>
                    <div>
                        <h1>{name}</h1>
                        <p>Capital: {capital}</p>
                        <p>Population: {formatNumber(population)}</p>
                        <h3>Languages</h3>
                        <ul>{langData}</ul>
                        <img style={{ width: "10rem" }} src={flag} alt={flgAlt} />
                    </div>

                    <WeatherInfo
                        capital={currentCapital}
                        temperature={weatherDetails ? weatherDetails.temperature : ""}
                        weatherIcon={weatherDetails ? weatherDetails.weather_icons[0] : ""}
                        weatherDescription={weatherDetails ? weatherDetails.weather_descriptions[0] : ""}
                        windSpeed={weatherDetails ? weatherDetails.wind_speed : ""}
                        windDir={weatherDetails ? weatherDetails.wind_dir : ""}
                    />
                </React.Fragment>
            );
        } else {
            return (
                <p>
                    {name} <button onClick={handleShowCountryData}>Show</button>
                </p>
            );
        }
    };
    const handleShowCountryData = e => {
        const countryName = e.target.parentNode.innerText.toLowerCase().slice(0, -5);
        const filtered = countries.filter(country => country.name.toLowerCase() === countryName);
        console.log(filtered);
        setFilteredResult(filtered);
    };

    const filteredCountries = filter
        ? filteredResult.map((country, i) => (
              <Country
                  key={i}
                  name={country.name}
                  capital={country.capital}
                  population={country.population}
                  languages={country.languages}
                  flag={country.flag}
              />
          ))
        : "";

    // console.log(filteredCountries);

    const handleSearch = e => {
        setFilter(true);
        setSearchText(e.target.value);
        const filtered = countries.filter(country => country.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredResult(filtered);
    };

    const output =
        filteredCountries.length > 10
            ? searchText === ""
                ? ""
                : "Too many matches, please specify another filter"
            : filteredCountries;

    return (
        <div className='App'>
            <h1>Countries info search engine</h1>
            <div>
                find countries:{" "}
                <input type='search' value={searchText} onChange={handleSearch} placeholder='search countries ...' />
            </div>
            <div>{output}</div>
        </div>
    );
}

export default App;
