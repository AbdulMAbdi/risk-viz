import React from "react";
import { LoadScript, GoogleMap } from "@react-google-maps/api";
import Markers from "./Markers";

const containerStyle = {
  width: "100vw",
  height: "84.8vh",
};

const regionCenters = {
  "North America": {
    lat: 43.516,
    lng: -98.173,
  },
  Europe: {
    lat: 47.457,
    lng: 10.283,
  },
  Asia: {
    lat: 23.805,
    lng: 92.197,
  },
  Africa: {
    lat: 3.776,
    lng: 24.521,
  },
  Oceania: {
    lat: -27.293,
    lng: 135.791,
  },
  "South America": {
    lat: -21.698,
    lng: -59.15,
  },
  All: {
    lat: -0.087,
    lng: -12.744,
  },
};

function MapContainer({ data = [], region }) {
  const markers = <Markers data={data}></Markers>;
  return (
    <LoadScript googleMapsApiKey="AIzaSyD-9AzwQ4IdHUuW1aJ5eOvwNiI0TIoFHu4">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={regionCenters[region]}
        mapTypeId="hybrid"
        zoom={4}
      >
        {markers}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MapContainer);
