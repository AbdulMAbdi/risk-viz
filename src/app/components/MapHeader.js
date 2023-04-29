import React, { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { blue } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { useDataStore } from "../store/DataStore";

export default function MapHeader({
  setDataTable,
  setMap,
  setChart,
  setAverage,
}) {
  const [assetList, factorList, actions] = useDataStore((state) => [
    state.assetList,
    state.factorList,
    state.actions,
  ]);

  const [decadeLabel, setDecadeLabel] = useState("Decade");
  const [assetLabel, setAssetLabel] = useState("Asset Name");
  const [factorLabel, setFactorsLabel] = useState("Risk Factor");
  const [regionLabel, setRegionLabel] = useState("Region");
  const [businessLabel, setbusinessLabel] = useState("Business Category");
  const [infoOpen, setInfoOpen] = useState(false);
  const regions = [
    "North America",
    "Europe",
    "Asia",
    "Africa",
    "Oceania",
    "South America",
  ];

  const style = {
    position: "absolute",
    top: "10.5%",
    right: "2%",
    width: 600,
    bgcolor: "#dbf4f4",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    whiteSpace: "pre-line",
  };

  const assetListElems = assetList.map((asset, index) => (
    <li
      key={index}
      class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
      onClick={() => {
        setAssetLabel(asset);
        actions.updateAsset(asset);
        actions.filterData();
      }}
    >
      {asset}
    </li>
  ));

  const regionListElems = regions.map((region, index) => (
    <li
      key={index}
      class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
      onClick={() => {
        setRegionLabel(region);
        actions.updateRegion(region);
        actions.filterData();
      }}
    >
      {region}
    </li>
  ));

  const factorListElems = factorList.map((factor, index) => (
    <li
      key={index}
      class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
      onClick={() => {
        setFactorsLabel(factor);
        actions.updateFactor(factor);
        actions.filterData();
      }}
    >
      {factor}
    </li>
  ));

  return (
    <nav class="max-h-24 bg-gray-50  bg-opacity-50 border-black border-2 dark:bg-gray-900 dark:border-gray-700 overflow-visible">
      <div class="max-w-full flex flex-wrap items-center justify-between mx-4 p-1 overflow-visible">
        <div class="p-1">
          <div class="group inline-block relative">
            <button class="bg-blue-400 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
              <span class="mr-1">{assetLabel}</span>
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>
            <ul class="absolute hidden text-gray-700 pt-1 group-hover:block text-sm max-h-96 overflow-y-auto overscroll-contain">
              <li
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                onClick={() => {
                  setAssetLabel("All Assets");
                  actions.updateAsset("All");
                  actions.filterData();
                }}
              >
                All Assets
              </li>
              {assetListElems}
            </ul>
          </div>
        </div>
        <div class="p-1">
          <div class="group inline-block relative">
            <button class="bg-blue-400 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
              <span class="mr-1">{regionLabel}</span>
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>
            <ul class="absolute hidden text-gray-700 pt-1 group-hover:block text-sm max-h-96 overflow-y-auto overscroll-contain">
              <li
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                onClick={() => {
                  setRegionLabel("All Regions");
                  actions.updateRegion("All");
                  actions.filterData();
                }}
              >
                All Regions
              </li>
              {regionListElems}
            </ul>
          </div>
        </div>
        <div class="p-1">
          <div class="group inline-block relative">
            <button class="bg-blue-400 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
              <span class="mr-1">{factorLabel}</span>
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>
            <ul class="absolute hidden text-gray-700 pt-1 group-hover:block text-sm max-h-96 overflow-y-auto overscroll-contain">
              <li
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                onClick={() => {
                  setFactorsLabel("Risk Factors - All");
                  actions.updateFactor("All");
                  actions.filterData();
                }}
              >
                Risk Factors
              </li>
              {factorListElems}
            </ul>
          </div>
        </div>
        <div class="p-1">
          <div class="group inline-block relative">
            <button class="bg-blue-400 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
              <span class="mr-1">{decadeLabel}</span>
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>
            <ul class="absolute hidden text-gray-700 pt-1 object-fill group-hover:block max-h-96 overflow-y-auto overscroll-contain">
              <li
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                onClick={() => {
                  actions.updateDecade(2030);
                  actions.filterData();
                  setDecadeLabel("Decade - 2030's");
                }}
              >
                2030&apos;s
              </li>
              <li
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                onClick={() => {
                  actions.updateDecade(2040);
                  actions.filterData();
                  setDecadeLabel("Decade - 2040's");
                }}
              >
                2040&apos;s
              </li>
              <li
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                onClick={() => {
                  actions.updateDecade(2050);
                  actions.filterData();
                  setDecadeLabel("Decade - 2050's");
                }}
              >
                2050&apos;s
              </li>
              <li
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                onClick={() => {
                  actions.updateDecade(2060);
                  actions.filterData();
                  setDecadeLabel("Decade - 2060's");
                }}
              >
                2060&apos;s
              </li>
              <li
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                onClick={() => {
                  actions.updateDecade(2070);
                  actions.filterData();
                  setDecadeLabel("Decade - 2070's");
                }}
              >
                2070&apos;s
              </li>
              <li
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                onClick={() => {
                  actions.updateDecade(0);
                  actions.filterData();
                  setDecadeLabel("Decade - All");
                }}
              >
                All
              </li>
            </ul>
          </div>
        </div>
        <div class="p-1">
          <div class="group inline-block relative">
            <button class="bg-blue-400 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
              <span class="mr-1">{businessLabel}</span>
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>
            <ul class="absolute hidden text-gray-700 pt-1 group-hover:block overflow-visible">
              <li
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                onClick={() => {
                  actions.updateCategory("Energy");
                  actions.filterData();
                  setbusinessLabel("Energy");
                }}
              >
                Energy
              </li>
              <li
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                onClick={() => {
                  actions.updateCategory("Finance");
                  actions.filterData();
                  setbusinessLabel("Finance");
                }}
              >
                Finance
              </li>
              <li
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                onClick={() => {
                  actions.updateCategory("Healthcare");
                  actions.filterData();
                  setbusinessLabel("Healthcare");
                }}
              >
                Healthcare
              </li>
              <li
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                onClick={() => {
                  actions.updateCategory("Manufacturing");
                  actions.filterData();
                  setbusinessLabel("Manufacturing");
                }}
              >
                Manufacturing
              </li>
              <li
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                onClick={() => {
                  actions.updateCategory("Retail");
                  actions.filterData();
                  setbusinessLabel("Retail");
                }}
              >
                Retail
              </li>
              <li
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                onClick={() => {
                  actions.updateCategory("Technology");
                  actions.filterData();
                  setbusinessLabel("Technology");
                }}
              >
                Technology
              </li>
              <li
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                onClick={() => {
                  actions.updateCategory("All");
                  actions.filterData();
                  setbusinessLabel("Business Cat. - All");
                }}
              >
                All
              </li>
            </ul>
          </div>
        </div>
        <div class="pl-4">
          <div class="group inline-block relative">
            <Image
              src="/logos/logoicon.png"
              alt="climateriskanalysis-high-resolution-color-logo"
              class="group inline-block relative object-fill"
              width={96}
              height={96}
              border="0"
            ></Image>
          </div>
        </div>
        <div class="p-1">
          <div class="group inline-block relative pl-8">
            <button
              class="bg-blue-400 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
              onClick={() => {
                setDataTable(true);
                setMap(false);
                setChart(false);
                setAverage(false);
              }}
            >
              <span class="mr-1">Data Table</span>
            </button>
          </div>
        </div>
        <div class="p-1">
          <div class="group inline-block relative">
            <button
              class="bg-blue-400 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
              onClick={() => {
                setChart(true);
                setDataTable(false);
                setMap(false);
                setAverage(false);
              }}
            >
              <span class="mr-1">Line Chart</span>
            </button>
          </div>
        </div>
        <div class="p-1">
          <div class="group inline-block relative">
            <button
              class="bg-blue-400 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
              onClick={() => {
                setChart(false);
                setDataTable(false);
                setMap(false);
                setAverage(true);
                actions.updateFactorCount();
                actions.sumData();
                actions.averageData();
              }}
            >
              <span class="mr-1">Averages Chart</span>
            </button>
          </div>
        </div>
        <div class="p-1">
          <div class="group inline-block relative">
            <button
              class="bg-blue-400 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
              onClick={() => {
                setMap(true);
                setDataTable(false);
                setChart(false);
                setAverage(false);
              }}
            >
              <span class="mr-1">Map</span>
            </button>
          </div>
        </div>
        <div class="p-1">
          <div class="group inline-block relative pl-40">
            <button
              class="bg-blue-400 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
              onClick={() => {
                setInfoOpen(true);
              }}
            >
              <InfoIcon sx={{ color: blue[900] }} />
            </button>
            <Modal
              open={infoOpen}
              onClose={() => setInfoOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  {"Climate Risk Analysis Web App"}
                </Typography>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ mt: 2 }}
                >
                  {"Map Legend"}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ color: "green" }}
                >
                  <span style={{ fontWeight: "bold" }}>Green Markers:</span>
                  {" Indicate a location that has a risk rating less than 0.33"}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ color: "orange" }}
                >
                  <span style={{ fontWeight: "bold" }}>Orange Markers:</span>
                  {
                    " Indicate a location that has a risk rating less than 0.66 but greater than 0.33"
                  }
                </Typography>
                <Typography id="modal-modal-description" sx={{ color: "red" }}>
                  <span style={{ fontWeight: "bold" }}>Red Markers:</span>{" "}
                  {
                    " Indicate a location that has a risk rating greater than 0.66"
                  }
                </Typography>
                <Typography id="modal-modal-description">
                  {
                    "Click a marker to get more information on the asset at that location"
                  }
                </Typography>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ mt: 2 }}
                >
                  {"Dropdown Menus"}
                </Typography>
                <Typography id="modal-modal-description">
                  {"The Asset Name menu will allow you to find locations represented by the selected asset name" +
                    "\n" +
                    "The Region menu will allow you to filter locations by continent" +
                    "\n" +
                    "The Risk Factor menu will allow you to filter by various risk factors and update risk ratings to the risk for that specific factor" +
                    "\n" +
                    "The Decade menu will allow you to filter by decade" +
                    "\n" +
                    "The Business Category Menu will allow you to filter by industry"}
                </Typography>

                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ mt: 2 }}
                >
                  {"Data Representation"}
                </Typography>
                <Typography id="modal-modal-description">
                  {"The Line Chart button will represent the data on a line graph. Selected Filters will still apply and filters can continue to be applied and updated" +
                    "\n" +
                    "The Data Table button will show the data in a table where selected filters will apply and filters can continue to be applied. Sorting by descending or ascending order is available on columns" +
                    "\n" +
                    "The Averages Chart button will allow you to see what the average risk rating for specific risk factors are. All the filter options from the dropdown menus will apply when calculating averages" +
                    "\n" +
                    "The Map button will bring you back to the map with the location markers"}
                </Typography>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </nav>
  );
}
