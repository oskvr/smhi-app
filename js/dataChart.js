import {
  getData,
  getWeatherData,
  getUnitString,
} from "./lib/weatherDataService.js";

const ctx = document.querySelector("#chart");
var chart;
export function initChart() {
  if (chart) {
    chart.destroy();
  }
  let data = {
    type: "line",
    data: {
      labels: getWeatherData().map((data) =>
        new Date(data.date).toLocaleDateString()
      ),
      datasets: [
        {
          label: `${getData().parameter.name} (${getUnitString()})`,
          data: getWeatherData().map((data) => data.value),
          backgroundColor: "pink",
          borderColor: "red",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };
  chart = new Chart(ctx, data);
}
