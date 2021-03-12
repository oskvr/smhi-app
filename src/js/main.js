import * as stationSearch from "./stationSearch.js";
import * as station from "./stationInfo.js";
import * as weatherData from "./weatherData.js";
import * as pagination from "./pagination.js";
import * as dateFilter from "./dateFilter.js";
import * as stationService from "./lib/stationService.js";
import * as render from "./render.js";
import { getMinDate, getWeatherData } from "./lib/weatherDataService.js";

async function app() {
  // Här ska vi bara initializa stationService och sedan render.all();

  await stationService.init(98210);
  pagination.setResultsLength(getWeatherData().length);
  render.renderAll();
  getMinDate();
}

// const dateFilterForm = document.querySelector("#dateFilterForm");
// dateFilterForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   dateFilter.filterDates();
// });

window.addEventListener("load", app);
