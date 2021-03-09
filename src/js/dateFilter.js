import * as weatherData from "./weatherData.js";
import * as pagination from "./pagination.js";
const infoContainer = document.querySelector(".date-filter__info");
const startDate = document.querySelector("#startDate");
const endDate = document.querySelector("#endDate");
const isFiltered = false;
export function filterDates() {
  if (!startDate.value || !endDate.value) return;
  isFiltered = true;
  const startString = new Date(startDate.value).toDateString();
  const endString = new Date(endDate.value);
  const start = new Date(startString).getTime();
  const end = new Date(endString).getTime();
  const filteredData = weatherData.cachedWeatherData.value.filter((data) => {
    const convertedString = new Date(data.from).toDateString();
    const converted = new Date(convertedString).getTime();
    return converted >= start && converted <= end;
  });
  pagination.setPaginatedData(filteredData);
  weatherData.render();
  pagination.setResultsLength(filteredData.length);
  pagination.render();
  render();
  localStorage.setItem("isFilteredByDates", "true");
  weatherData.getWeatherData();
}

export function render() {
  if (isFiltered) {
    const div = document.createElement("div");
    infoContainer.innerHTML = "";
    div.innerHTML = `
      <span>Visar data mellan perioden ${startDate.value} - ${endDate.value}</span> 
      <button class="btn" id="clearDateFilter">
          X
      </button>
    `;
    infoContainer.append(div);
  }
}

document.addEventListener("click", ({ target }) => {
  if (target.closest("#clearDateFilter")) {
    isFiltered = false;
    startDate.value = "";
    endDate.value = "";
    infoContainer.innerHTML = "";
    pagination.setPaginatedData(weatherData.cachedWeatherData.value);
    weatherData.render();
    pagination.setResultsLength(weatherData.cachedWeatherData.value.length);
    pagination.render();
    localStorage.setItem("isFilteredByDates", "false");
    weatherData.getWeatherData();
  }
});
