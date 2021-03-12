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
const submitButton = document.querySelector("#dateFilterButton");

export let isFilteredByDate = false;
export function resetDateFilter() {
  submitButton.classList.add("disabled");
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
  if (getWeatherData().length === 0) {
    alert("Det finns ingen data att visa för vald period");
  } else {
    pagination.setCurrentPage(1);
    pagination.setResultsLength(getWeatherData().length);
    weatherData.render();
    pagination.render();
    render();
    initChart();
  }
}

export function render() {
  flatpickr("#startDate", {
    minDate: getMinDate(),
    maxDate: Date.now(),
  });
  flatpickr("#endDate", {
    minDate: getMinDate(),
    maxDate: Date.now(),
  });
  if (isFilteredByDate) {
    infoContainer.classList.remove("hidden");
    infoContainer.innerHTML = `
    <span>Visar data för perioden ${startDate.value} - ${endDate.value}</span> 
    <button id="clearDateFilter">
    <i class="fa fa-times-circle" style="font-size: 1.1rem; color: red;"></i>
    </button>
    `;
  } else {
    infoContainer.classList.add("hidden");
    infoContainer.innerHTML = "";
  }
}

on("change", ".date-filter__input", () => {
  flatpickr("#startDate", {
    minDate: getMinDate(),
    maxDate: endDate.value || Date.now(),
  });
  flatpickr("#endDate", {
    minDate: startDate.value || getMinDate(),
    maxDate: Date.now(),
  });
  if (startDate.value && endDate.value) {
    submitButton.classList.remove("disabled");
  } else {
    submitButton.classList.add("disabled");
  }
});

on("submit", "#dateFilterForm", (e) => {
  e.preventDefault();
  filterDates();
});

on("click", "#clearDateFilter", () => {
  submitButton.classList.add("disabled");
  infoContainer.classList.add("hidden");
  resetDateFilter();
  pagination.setResultsLength(getWeatherData().length);
  pagination.setResultsPerPage(50);
  render();
  initChart();
});
