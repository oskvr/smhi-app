import * as weatherData from "../components/weatherData.js";
import * as pagination from "../components/pagination.js";
import * as stationInfo from "../components/stationInfo.js";
import * as dateFilter from "../components/dateFilter.js";

export function renderAll() {
  weatherData.render();
  pagination.render();
  stationInfo.render();
  dateFilter.render();
}
