"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";

import handler from "../../lib/staticdata";
import MapHeader from "./components/MapHeader";
import DataTable from "./components/DataTable";
import LineChart from "./components/LineChart";
import Loading3D from "./components/Loading3D";

const MapContainer = React.lazy(() => import("./components/MapContainer"));

function getRandomLatLong(from: number, to: number, fixed: number): number {
  return parseFloat((Math.random() * (to - from) + from).toFixed(fixed));
  // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

function firstDigit(num: number): number {
  // 1: get first digit using regex pattern
  const matches = String(num).match(/\d/);
  // 2: convert matched item to integer
  let digit = 0;
  if (matches) {
    digit = Number(matches[0]);
  }
  // 3: add sign back as needed
  return digit;
}

function randomYearinDecade(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const regionBoundBoxes = [
  {
    Region: "North America",
    LatRange: [30.239, 61.606],
    LongRange: [-127.89, -71.203],
  },
  { Region: "Europe", LatRange: [36.597, 68.784], LongRange: [-6.152, 34.98] },
  { Region: "Asia", LatRange: [-7.536, 59.712], LongRange: [59.765, 136.58] },
  {
    Region: "Africa",
    LatRange: [-31.952, 36.031],
    LongRange: [-7.031, 50.273],
  },
  {
    Region: "Oceania",
    LatRange: [-39.909, -12.039],
    LongRange: [115.839, 155.742],
  },
  {
    Region: "South America",
    LatRange: [-36.879, 9.622],
    LongRange: [-75.41, -37.089],
  },
];

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
      let data = await handler();
      let assests;
      let factors;
      data = data.map((point: object, index: number) => ({
        ...point,
        id: index,
        Region:
          regionBoundBoxes[firstDigit(index) <= 5 ? firstDigit(index) : 0]
            .Region,
        Lat: getRandomLatLong(
          regionBoundBoxes[firstDigit(index) <= 5 ? firstDigit(index) : 0]
            .LatRange[0],
          regionBoundBoxes[firstDigit(index) <= 5 ? firstDigit(index) : 0]
            .LatRange[1],
          3
        ),
        Long: getRandomLatLong(
          regionBoundBoxes[firstDigit(index) <= 5 ? firstDigit(index) : 0]
            .LongRange[0],
          regionBoundBoxes[firstDigit(index) <= 5 ? firstDigit(index) : 0]
            .LongRange[1],
          3
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
      <Suspense
        fallback={
          <div className="w-screen h-screen">
            <Canvas>
              <Loading3D />
            </Canvas>
          </div>
        }
      >
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
