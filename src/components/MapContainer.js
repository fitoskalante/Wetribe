import React from "react";
import { GoogleMap } from "react-google-maps";

function Map() {
  return (
    <GoogleMap
      defaultCenter={{ lat: 10.82302, lng: 106.62965 }}
      defaultZoom={8}
    ></GoogleMap>
  );
}
