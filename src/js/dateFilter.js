import * as weatherData from "./weatherData.js";
import * as pagination from "./pagination.js";
import {
  getWeatherData,
  filterByDates,
  getMinDate,
} from "./lib/weatherDataService.js";
import { on } from "./helpers.js";
import { initChart } from "./dataChart.js";
const infoContainer = document.querySelector(".date-filter__info");
const startDate = document.querySelector("#startDate");
const endDate = document.querySelector("#endDate");

export let isFilteredByDate = false;
export function resetDateFilter() {
  isFilteredByDate = false;
  startDate.value = "";
  endDate.value = "";
  pagination.setCurrentPage(1);
}
function filterDates() {
  if (!startDate.value || !endDate.value) return;
  isFilteredByDate = true;
  const startString = new Date(startDate.value).toDateString();
  const endString = new Date(endDate.value);
  const start = new Date(startString).getTime();
  const end = new Date(endString).getTime();
  filterByDates(start, end);
  pagination.setCurrentPage(1);
  pagination.setResultsLength(getWeatherData().length);
  weatherData.render();
  pagination.render();
  render();
  initChart();
}

export function render() {
  flatpickr("#startDate", {
    minDate: getMinDate(),
  });
  flatpickr("#endDate", {
    maxDate: Date.now(),
  });
  if (isFilteredByDate) {
    infoContainer.innerHTML = `
        <span>Visar data mellan perioden ${startDate.value} - ${endDate.value}</span> 
        <button class="btn" id="clearDateFilter">
            X
        </button>
      `;
  } else {
    infoContainer.innerHTML = "";
  }
}

on("submit", "#dateFilterForm", (e) => {
  e.preventDefault();
  filterDates();
});

on("click", "#clearDateFilter", () => {
  resetDateFilter();
  pagination.setResultsLength(getWeatherData().length);
  weatherData.render();
  pagination.render();
  render();
  initChart();
});
