import "./App.css";
import { useEffect, useState } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1Ijoic2t3aWVydSIsImEiOiJja3hnZjd4aHUxcno4Mm9wZGpqdHozaGllIn0.h8jnpRMJ1lcOJH1gHlmOeg",
  });

  const [cityName, setCityName] = useState(" ");

  const handleInput = (e) => {
    console.log(cityName);
    setCityName(e.target.value);
  };

  const fetchWeather = async () => {
    //   if (input.value === "") return;
    //   const cityName = input.value;
  };
  return (
    <>
      <form action="">
        <label>Write a city name</label>
        <input type="text" value={cityName} onChange={handleInput} />
      </form>
      <Map
        style="mapbox://styles/mapbox/streets-v11"
        containerStyle={{
          height: "80vh",
          width: "80vw",
          margin: "0 auto",
        }}
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
        </Layer>
      </Map>
      ;
    </>
  );
}

export default App;
