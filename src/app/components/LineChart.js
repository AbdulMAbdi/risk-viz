import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({ data, riskFactor }) {
  const totalDuration = data.length * 100 < 10000 ? data.length * 100 : 10000;
  const delayBetweenPoints = totalDuration / data.length;
  const previousY = (ctx) =>
    ctx.index === 0
      ? ctx.chart.scales.y.getPixelForValue(100)
      : ctx.chart
          .getDatasetMeta(ctx.datasetIndex)
          .data[ctx.index - 1].getProps(["y"], true).y;
  const animation = {
    x: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== "data" || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
    y: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== "data" || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        label: function (context) {
          let label = context.dataset.label || "";

          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(context.parsed.y);
          }
          return label;
        },
      },
      legend: {
        position: false,
      },
      title: {
        display: true,
        text: riskFactor + " Risk Ratings over Time",
      },
    },
    animation,
    scales: {
      x: {
        type: "linear",
        title: {
          text: "Year",
          color: "#1e3a8a",
          display: true,
          align: "center",
        },
        ticks: {
          callback: function (value, index, ticks) {
            return value;
          },
        },
      },
      y: {
        type: "linear",
        title: {
          text: "Risk Rating - " + riskFactor,
          color: "#1e3a8a",
          display: true,
          align: "center",
        },
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

  let ratingDecadePair = [];
  data.map((point) => {
    ratingDecadePair.push({
      x: point["Year"],
      y:
        riskFactor == "All"
          ? point["Risk Rating"]
          : point["Risk Factors"][riskFactor],
    });
  });
  ratingDecadePair.sort((a, b) => {
    if (a["x"] === b["x"]) {
      return a["y"] - b["y"];
    }
    return a["x"] - b["x"];
  });

  const lineData = {
    datasets: [
      {
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "#172554",
        radius: 3,
        data: ratingDecadePair,
      },
    ],
  };

  return (
    <Line
      class="group inline-block relative"
      width="100vw"
      height="40.75vh"
      options={options}
      data={lineData}
      plugins={[plugin]}
    ></Line>
  );
}
