import React, { useEffect, useMemo, useState } from "react";
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
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import { blue } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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
  const [filteredData, factor, averagedData, actions] = useDataStore(
    (state) => [
      state.filteredData,
      state.factor,
      state.averagedData,
      state.actions,
    ]
  );
  const [infoOpen, setInfoOpen] = useState(false);

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

  const legendItems = [];
  for (const prop in backgroundColors) {
    let item = (
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <Box
            sx={{
              width: 30,
              height: 30,
              bgcolor: backgroundColors[prop],
            }}
          ></Box>
        </Grid>
        <Grid item xs={11}>
          <Typography id="modal-modal-description">{"- " + prop}</Typography>
        </Grid>
      </Grid>
    );
    legendItems.push(item);
  }
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
    let colors = [];
    for (const key in averagedData) {
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
  }, [averagedData]);

  useEffect(() => {
    actions.updateFactorCount();
    actions.sumData();
    actions.averageData();
  }, [filteredData]);

  return (
    <>
      <div class="shadow-xl focus:shadow-inner p-1">
        <div class="group inline-block relative pl-40">
          <button
            class="shadow-xl shadow-blue-500/25 bg-blue-400 text-gray-700 font-semibold py-2 px-4 inline-flex items-center"
            onClick={() => {
              setInfoOpen(true);
            }}
          >
            <LegendToggleIcon sx={{ color: blue[900] }} />
          </button>
          <Modal
            open={infoOpen}
            onClose={() => setInfoOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                {"Average Risk Ratings Bar Chart"}
              </Typography>
              <Typography id="modal-modal-description">
                {
                  "This chart represents the average risk rating for all risk factors. The data being averaged can be filted with the drop down menus in the navigation bar"
                }
              </Typography>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ mt: 2 }}
              >
                {"Risk Factors Legend"}
              </Typography>
              {legendItems}
            </Box>
          </Modal>
        </div>
      </div>
      <Bar
        class="group inline-block relative"
        width="100vw"
        height="40.75vh"
        options={options}
        data={barData}
        plugins={[plugin]}
      ></Bar>
    </>
  );
}
