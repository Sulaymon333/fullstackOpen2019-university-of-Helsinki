import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [countries, setCountries] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filter, setFilter] = useState(false);
    const [filteredResult, setFilteredResult] = useState([]);

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all').then(response => {
            // console.log(response.data);
            setCountries(response.data);
        });
    }, []);
    const Country = ({ name, capital, population, languages, flag }) => {
        const flgAlt = `${name} flag`;
        const langData = languages.map((language, i) => <li key={i}>{language.name}</li>);
        if (filteredResult.length === 1) {
            // console.log(languages);
            return (
                <div>
                    <h1>{name}</h1>
                    <p>Capital: {capital}</p>
                    <p>Population: {population}</p>
                    <h3>Languages</h3>
                    <ul>{langData}</ul>
                    <img style={{ width: '10rem' }} src={flag} alt={flgAlt} />
                </div>
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
        : '';

    // console.log(filteredCountries);

    const handleSearch = e => {
        setFilter(true);
        setSearchText(e.target.value);
        const filtered = countries.filter(country => country.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredResult(filtered);
    };

    const output =
        filteredCountries.length > 10
            ? searchText === ''
                ? ''
                : 'Too many matches, please specify another filter'
            : filteredCountries;

    return (
        <div className="App">
            <h1>Countries info search engine</h1>
            <div>
                find countries:
                <input type="search" value={searchText} onChange={handleSearch} placeholder="search countries ..." />
            </div>
            <div>{output}</div>
        </div>
    );
}

export default App;
