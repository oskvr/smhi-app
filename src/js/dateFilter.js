import * as weatherData from "./weatherData.js";
import * as pagination from "./pagination.js";
import { getWeatherData, filterByDates } from "./lib/weatherDataService.js";
const infoContainer = document.querySelector(".date-filter__info");
const startDate = document.querySelector("#startDate");
const endDate = document.querySelector("#endDate");
export let isFilteredByDate = false;
export function filterDates() {
  if (!startDate.value || !endDate.value) return;
  isFilteredByDate = true;
  const startString = new Date(startDate.value).toDateString();
  const endString = new Date(endDate.value);
  const start = new Date(startString).getTime();
  const end = new Date(endString).getTime();
  filterByDates(start, end);
  pagination.setResultsLength(getWeatherData().length);
  weatherData.render();
  pagination.render();
  render();
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

document.addEventListener("click", ({ target }) => {
  if (target.closest("#clearDateFilter")) {
    isFilteredByDate = false;
    startDate.value = "";
    endDate.value = "";
    pagination.setResultsLength(getWeatherData().length);
    weatherData.render();
    pagination.render();
    render();
    localStorage.setItem("isFilteredByDates", "false");
    // weatherData.getWeatherData();
  }
});
