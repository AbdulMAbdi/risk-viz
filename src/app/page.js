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
import AverageChart from "./components/AverageChart";
import { useDataStore } from "./store/DataStore";

const MapContainer = React.lazy(() => import("./components/MapContainer"));

export default function Home() {
  const [sourceData, actions] = useDataStore((state) => [
    state.sourceData,
    state.actions,
  ]);
  const [isDataTable, setDataTable] = useState(false);
  const [isChart, setChart] = useState(false);
  const [isAverage, setAverage] = useState(false);
  const [isMap, setMap] = useState(true);

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
      actions.updateSourceData(data);
      actions.updateFactorList(factors);
      actions.updateAssetList(assests);
      actions.filterData();
    }
    if (!sourceData) {
      getData();
    }
  }, [sourceData]);

  return (
    <main className="flex flex-col-reverse overflow-visible">
      {" "}
      <Suspense fallback={<div className="w-screen h-screen">loading..</div>}>
        {sourceData && isMap && <MapContainer></MapContainer>}
        {isDataTable && <DataTable></DataTable>}
        {isChart && <LineChart></LineChart>}
        {isAverage && <AverageChart></AverageChart>}
      </Suspense>
      <div className="overflow-visible">
        <MapHeader
          setDataTable={setDataTable}
          setMap={setMap}
          setChart={setChart}
          setAverage={setAverage}
        ></MapHeader>
      </div>
    </main>
  );
}
