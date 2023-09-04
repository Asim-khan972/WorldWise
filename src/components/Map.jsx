import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import React from "react";
import style from "./Map.module.css";
function Map() {
  const navigate = useNavigate();
  const [searchParams, setsearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  console.log(lat, lng);
  return (
    <div className={style.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h1>
        {lat}
        {lng}
      </h1>
    </div>
  );
}

export default Map;
