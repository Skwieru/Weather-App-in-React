import "./App.css";
import { useEffect, useState, useRef } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import InfoProvider from "./components/Description/InfoProvider";

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

  // other parameters
  const [isVisible, setIsVisible] = useState(false);

  // openweather parameters
  const [temp, setTemp] = useState(0);
  const [weatherDesc, setWeatherDesc] = useState("");
  const [city, setCity] = useState("");
  const [icon, setIcon] = useState("");

  // input value

  const [cityName, setCityName] = useState("");
  const handleInput = (e) => {
    setCityName(e.target.value);
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
    const addres = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
    const response = await fetch(addres);
    const data = await response.json();
    console.log(data);
    setIsVisible(true);
    setCity(data.name);
    setTemp(data.main.temp);
    setWeatherDesc(data.weather[0].description);
    setIcon(data.weather[0].icon);
    setLng(data.coord.lon);
    setLat(data.coord.lat);
    map.current.flyTo({
      center: [data.coord.lon, data.coord.lat],
      zoom: 9,
      speed: 2,
      curve: 1,
    });
  };

  // fetchData();
  return (
    <>
      <div className="wrapper">
        <form className="searchInterface" onSubmit={fetchData}>
          <input
            type="text"
            value={cityName}
            onChange={handleInput}
            placeholder="search for a city"
          />
        </form>
        {isVisible && (
          <InfoProvider
            city={city}
            weatherDesc={weatherDesc}
            temp={temp}
            icon={icon}
          />
        )}
        <div ref={mapContainer} className="map-container"></div>
      </div>
    </>
  );
}

export default App;
