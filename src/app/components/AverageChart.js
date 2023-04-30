import React, { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDataStore } from "../store/DataStore";
import { color } from "@mui/system";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AverageChart() {
  const [filteredData, factor, factorList, averagedData, actions] =
    useDataStore((state) => [
      state.filteredData,
      state.factor,
      state.factorList,
      state.averagedData,
      state.actions,
    ]);
  const [colors, setColors] = useState();
  const backgroundColors = {
    Earthquake: "rgba(209, 178, 111,0.75)", //
    "Extreme heat": "rgba(206, 32, 41,0.75)", //
    Wildfire: "rgba(255, 102, 0,0.75)", //
    Tornado: "rgba(191, 119, 246,0.75)", //
    Flooding: "rgba(0, 63, 255,0.75)", //
    Volcano: "rgba(228, 34, 23,0.75)", //
    Hurricane: "rgba(135, 124, 123,0.75)", //
    Drought: "rgba(254, 211, 60,0.75)", //
    "Extreme cold": "rgba(54, 139, 193,0.75)",
    "Sea level rise": "rgba(9, 88, 89,0.75)", //
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: false,
      },
      title: {
        display: true,
        text: "Average Risk Rating",
      },
    },
    animation: {
      duration: 4000,
      easing: "easeInOutQuint",
    },
    scales: {
      y: {
        title: {
          text: "Risk Rating - " + factor,
          color: "#1e3a8a",
          display: true,
          align: "center",
        },
        beginAtZero: true,
      },
    },
    customCanvasBackgroundColor: {
      color: "#dbf4f4",
    },
  };

  const plugin = {
    id: "customCanvasBackgroundColor",
    beforeDraw: (chart, args, options) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = options.color || "#dbf4f4";
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  };

  const barData = useMemo(() => {
    actions.updateFactorCount();
    actions.sumData();
    actions.averageData();
    let colors = [];
    for (const key in averagedData) {
      console.log(key);
      colors.push(backgroundColors[key]);
    }
    const barData = {
      labels: Object.keys(averagedData),
      datasets: [
        {
          borderColor: "rgb(53, 162, 235)",
          borderWidth: 1,
          backgroundColor: colors,
          radius: 3,
          data: averagedData,
        },
      ],
    };

    return barData;
  }, [filteredData]);

  return (
    <Bar
      class="group inline-block relative"
      width="100vw"
      height="40.75vh"
      options={options}
      data={barData}
      plugins={[plugin]}
    ></Bar>
  );
}
