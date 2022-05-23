import "./App.css";
import { useEffect, useState, useRef } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
// import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  // Getting mapbox token
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2t3aWVydSIsImEiOiJja3hnZjd4aHUxcno4Mm9wZGpqdHozaGllIn0.h8jnpRMJ1lcOJH1gHlmOeg";

  // bacis map settings
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  // input value
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

  const fetchData = async () => {};
  return (
    <>
      <div>
        <div ref={mapContainer} className="map-container">
          <form className="searchInterface">
            <label>Write a city name{cityName}</label>
            <input type="text" value={cityName} onChange={handleInput} />
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
