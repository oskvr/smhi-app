import * as weatherData from "./weatherData.js";
import * as pagination from "./pagination.js";
import { getWeatherData, filterByDates } from "./lib/weatherDataService.js";
import { on } from "./helpers.js";
const infoContainer = document.querySelector(".date-filter__info");
const startDate = document.querySelector("#startDate");
const endDate = document.querySelector("#endDate");

flatpickr("#startDate", {
  // Hämta äldsta datumet från väderdatan
});
flatpickr("#endDate", {
  maxDate: Date.now(),
});
export let isFilteredByDate = false;
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
  console.log(startDate.value);
  console.log(endDate.value);
  localStorage.setItem("isFilteredByDates", "true");
}

export function render() {
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
  isFilteredByDate = false;
  startDate.value = "";
  endDate.value = "";
  pagination.setResultsLength(getWeatherData().length);
  weatherData.render();
  pagination.render();
  render();
  localStorage.setItem("isFilteredByDates", "false");
});

// document.addEventListener("click", ({ target }) => {
//   if (target.closest("#clearDateFilter")) {
//     isFilteredByDate = false;
//     startDate.value = "";
//     endDate.value = "";
//     pagination.setResultsLength(getWeatherData().length);
//     weatherData.render();
//     pagination.render();
//     render();
//     localStorage.setItem("isFilteredByDates", "false");
//     // weatherData.getWeatherData();
//   }
// });
