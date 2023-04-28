import React, { useState, useEffect, useMemo } from "react";
import MarkerWithInfoBox from "./Marker";
import { useDataStore } from "../store/DataStore";

export default function Markers() {
  const [loaded, setLoaded] = useState(false);
  const data = useDataStore((state) => state.filteredData);
  const markerData = useMemo(() => {
    let tempData = data;
    tempData.map((marker) => {
      if (marker["Risk Rating"] > 0.66)
        marker["url"] = "/markers/HighRisk-Red-Marker.png";
      else if (marker["Risk Rating"] <= 0.66 && marker["Risk Rating"] > 0.33)
        marker["url"] = "/markers/MediumRisk-Orange-Marker.png";
      else marker["url"] = "/markers/LowRisk-Green-Marker.png";
    });
    return tempData;
  }, [data]);

  const markers = markerData.map((marker) => (
    <MarkerWithInfoBox
      key={marker["Asset Name"] + Math.random()}
      marker={marker}
    ></MarkerWithInfoBox>
  ));

  useEffect(() => {
    if (markers) setLoaded(true);
  }, [markers]);

  return <>{loaded && markers}</>;
}
