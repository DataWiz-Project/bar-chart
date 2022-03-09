// The data represented
const dataset = [
  { id: 1, pb: "climate change", threshhold: -2.35, shoot: 18.95 },
  { id: 1, pb: "Ocean acidification", threshhold: -1.59, shoot: 15.33 },
  { id: 1, pb: "Nitrogen", threshhold: 100, shoot: 72.7 },
  { id: 1, pb: "Phosphorus", threshhold: 1.1, shoot: 4 },
  { id: 1, pb: "Biodiversity", threshhold: 0.6, shoot: 0.45 },
];

// The functions that convert the data to a common type
const prosentConverter = (threshold, shoot) => {
  const increase = shoot - threshold;
  return parseInt((increase / shoot) * 100);
};
const prosentConverter2 = (threshold, shoot) => {
  const decrease = threshold - shoot;
  return parseInt((decrease / shoot) * 100);
};
const getScale = (threshold, shoot) => {
  if (threshold > shoot) {
    return prosentConverter2(threshold, shoot);
  } else {
    return prosentConverter(threshold, shoot);
  }
};

// Selecting the element
const canvasElement = document.querySelector("#barChart");

// Make gradient bars
let width, height, gradient;
function getGradient(ctx, chartArea) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, "rgba(20, 185, 50, 0.7)");
    gradient.addColorStop(0.5, "rgba(250, 200, 10, 0.7)");
    gradient.addColorStop(1, "rgba(225, 60, 5, 0.7)");
  }

  return gradient;
}

// Setting up the chart with the data.
const config = {
  type: "bar",
  data: {
    labels: [
      "Climate Change",
      "Ocean Acidification",
      "Nitrogen",
      "Phosphorus",
      "Biodiversity",
    ],
    datasets: [
      {
        label: "Overshoot",
        data: [
          getScale(-2.35, 18.95),
          getScale(-1.59, 15.33),
          getScale(100, 72.7),
          getScale(1.1, 4),
          getScale(0.6, 0.45),
        ],
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return;
          }
          return getGradient(ctx, chartArea);
        },
        //   [
        //   "rgba(255, 159, 64, 0.2)",
        //   "rgba(255, 99, 132, 0.2)",
        //   "rgba(54, 162, 235, 0.2)",
        //   "rgba(75, 192, 192, 0.2)",
        //   "rgba(153, 102, 255, 0.2)",
        // ],

        borderColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return;
          }
          return getGradient(ctx, chartArea);
        },
        //   [
        //   "rgba(255, 159, 64, 1)",
        //   "rgba(255, 99, 132, 1)",
        //   "rgba(54, 162, 235, 1)",
        //   "rgba(75, 192, 192, 1)",
        //   "rgba(153, 102, 255, 1)",
        // ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      autocolors: false,
      annotation: {
        annotations: {
          line1: {
            type: "line",
            yMin: 70,
            yMax: 70,
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 2,
          },
        },
      },
    },
  },
};

const barChart = new Chart(canvasElement, config);
