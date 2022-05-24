import "./App.css";
import { useEffect, useState, useRef } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import InfoProvider from "./components/Description/InfoProvider";
// import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  // Getting mapbox/openweather tokens
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2t3aWVydSIsImEiOiJja3hnZjd4aHUxcno4Mm9wZGpqdHozaGllIn0.h8jnpRMJ1lcOJH1gHlmOeg";
  const API_KEY = `018ec73b1875c4e5f869f5434b608aee`;

  // basic mapbox settings
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(20);
  const [lat, setLat] = useState(20);
  const [zoom, setZoom] = useState(1);

  // openweather parameters
  const [deg, setDeg] = useState(0);
  const [weatherDesc, setWeatherDesc] = useState("");

  // input value
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState("");
  const handleInput = (e) => {
    setCityName(e.target.value);
    // console.log(cityName);
  };
  // creating map layout
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  // fetching data function
  const fetchData = async (e) => {
    e.preventDefault();
    const addres = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
    const response = await fetch(addres);
    const data = await response.json();
    console.log(data);
    setCity(cityName);
    setWeatherDesc(data.weather[0].description);
    setLng(data.coord.lon);
    setLat(data.coord.lat);
    console.log(data.coord.lon);
    console.log(data.coord.lat);
    console.log(map);
    map.current.flyTo({
      center: [lng, lat],
      zoom: 9,
      speed: 2,
      curve: 1,
    });
  };

  // fetchData();
  return (
    <>
      <div>
        <div ref={mapContainer} className="map-container">
          <form className="searchInterface" onSubmit={fetchData}>
            <label>Write a city name</label>
            <input type="text" value={cityName} onChange={handleInput} />
          </form>
          <InfoProvider city={city} weatherDesc={weatherDesc} />
          <div className="description">
            <p>current city: {city}</p>
            <p>weather is: {weatherDesc}</p>
            <p>lng {lng}</p>
            <p>lat {lat}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
