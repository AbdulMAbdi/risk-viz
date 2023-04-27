"use client";

import React, { Suspense, useEffect, useState } from "react";

import {
  getRandomLatLong,
  firstDigit,
  randomYearinDecade,
  getRegion,
  dataHandler,
} from "../../lib/utils";
import MapHeader from "./components/MapHeader";
import DataTable from "./components/DataTable";
import LineChart from "./components/LineChart";

const MapContainer = React.lazy(() => import("./components/MapContainer"));

export default function Home() {
  const [climateData, setClimateData] = useState();
  const [decade, setDecade] = useState(0);
  const [category, setCategory] = useState("All");
  const [asset, setAsset] = useState("All");
  const [region, setRegion] = useState("All");
  const [factor, setFactors] = useState("All");
  const [isDataTable, setDataTable] = useState(false);
  const [isChart, setChart] = useState(false);
  const [isMap, setMap] = useState(true);
  const [mapData, setMapData] = useState([]);
  const [assests, setAssests] = useState([]);
  const [riskFactors, setRiskFactors] = useState([]);

  useEffect(() => {
    async function getData() {
      let data = await dataHandler();
      let assests;
      let factors;
      data = data.map((point, index) => ({
        ...point,
        id: index,
        Region: getRegion(firstDigit(index) <= 5 ? firstDigit(index) : 0),
        Lat: getRandomLatLong(
          firstDigit(index) <= 5 ? firstDigit(index) : 0,
          "LatRange"
        ),
        Long: getRandomLatLong(
          firstDigit(index) <= 5 ? firstDigit(index) : 0,
          "LongRange"
        ),
        Year: randomYearinDecade(point["Year"] + 10, point["Year"]),
        "Risk Factors": JSON.parse(point["Risk Factors"]),
      }));
      assests = new Set(data.map((point) => point["Asset Name"]));
      factors = new Set(
        data.map((point) => Object.keys(point["Risk Factors"])).flat()
      );

      assests = Array.from(assests);
      factors = Array.from(factors);
      setClimateData(data);
      setRiskFactors(factors);
      setAssests(assests);
    }
    if (!climateData) {
      getData();
    }
  }, [climateData]);

  useEffect(() => {
    if (climateData) {
      const filteredData = climateData.filter((point) => {
        return (
          ((point["Year"] - decade < 10 && point["Year"] - decade >= 0) ||
          decade == 0
            ? point
            : null) &&
          (point["Business Category"] == category || category == "All"
            ? point
            : null) &&
          (point["Asset Name"] == asset || asset == "All" ? point : null) &&
          (point["Region"] == region || region == "All" ? point : null) &&
          (factor in point["Risk Factors"] || factor == "All" ? point : null)
        );
      });
      setMapData(filteredData);
    }
  }, [climateData, decade, category, asset, region, factor]);

  return (
    <main className="flex flex-col-reverse overflow-visible">
      {" "}
      <Suspense fallback={<div className="w-screen h-screen">loading..</div>}>
        {climateData && isMap && (
          <MapContainer data={mapData} region={region}></MapContainer>
        )}
        {isDataTable && <DataTable factor={factor} data={mapData}></DataTable>}
        {isChart && <LineChart data={mapData} riskFactor={factor}></LineChart>}
      </Suspense>
      <div className="overflow-visible">
        <MapHeader
          setDecade={setDecade}
          setCat={setCategory}
          setDataTable={setDataTable}
          setMap={setMap}
          setChart={setChart}
          setAsset={setAsset}
          assests={assests}
          setRegion={setRegion}
          setFactors={setFactors}
          factors={riskFactors}
        ></MapHeader>
      </div>
    </main>
  );
}
