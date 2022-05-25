import React from "react";
import "./InfoProvider.css";

const InfoProvider = (props) => {
  const imgSrc = `http://openweathermap.org/img/w/${props.icon}.png`;
  return (
    <div className="description">
      <p className="city">{props.city}</p>

      <p className="weatherDescription">{props.weatherDesc}</p>
      <p className="temperature">
        {props.temp.toFixed(1)}°C{" "}
        <img src={imgSrc} alt="Icon of current weather" />
      </p>
    </div>
  );
};

export default InfoProvider;
