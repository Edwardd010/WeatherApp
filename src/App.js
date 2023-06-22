import './App.css';
import {useState} from "react";
import React from "react";
import axios from 'axios';

function App() {

    const [city, setCity] = useState("");
    const [name, setName] = useState("");
    const [temp, setTemp] = useState("");
    const [desc, setDesc] = useState("");
    const [wind, setWind] = useState("");

    async function handleSubmit(event){
        event.preventDefault();
        try {
            const response = await axios.get('http://localhost:8080/api/weather/' + city);
            console.log(response.data);
            setTemp(response.data.main.temp);
            setName(response.data.name);
            setDesc(response.data.weather[0].description);
            setWind(response.data.wind.speed);
        } catch (error) {
            console.log(error.message);
        }
    }


  return (
    <div className="App">
        <div className="container">
            <h1>Weather</h1>
            <input
                className="search"
                name = "searchbar"
                placeholder="Enter city.."
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button
                className="submit"
                type="submit"
                onClick={handleSubmit}
            >
                Search
            </button>
        </div>
        {name &&
            <div className="info-container">
                <div className="name-container">
                    <h1 className="celcius">{Math.floor(temp)}°</h1>
                    <h1 className="n">{name}</h1>
                </div>
                <div className="extra-container">
                    <div className="a">
                        <h4>Wind Speed:</h4>
                        <h3>{wind}km/h</h3>
                    </div>
                    <div className="b">
                        <h4>Summary:</h4>
                        <h3>{desc}</h3>
                    </div>
                </div>
            </div>
        }
    </div>
  );
}

export default App;
