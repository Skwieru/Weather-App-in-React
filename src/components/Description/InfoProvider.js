import React from "react";
import "./InfoProvider.css";

const InfoProvider = (props) => {
  const imgSrc = `http://openweathermap.org/img/w/${props.icon}.png`;

  return (
    <div className="description">
      <p className="city">{props.city}</p>

      <p className="temperature">{props.temp.toFixed(1)}°C </p>

      <div className="weatherDescription">
        <p>{props.weatherDesc} </p>

        <img
          className="weatherIcon"
          src={imgSrc}
          alt="Icon of current weather"
        />
      </div>
    </div>
  );
};

export default InfoProvider;
