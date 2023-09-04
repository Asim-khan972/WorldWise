import React from "react";
import Sidebar from "../components/Sidebar";
import style from "./AppLayout.module.css";
import Map from "../components/Map";

function AppLayout() {
  return (
    <div className={style.app}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLayout;
