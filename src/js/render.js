import * as weatherData from "./weatherData.js";
import * as pagination from "./pagination.js";
import * as station from "./stationInfo.js";
import * as dateFilter from "./dateFilter.js";
import * as dataInfo from "./dataInfo.js";

export function renderAll() {
  weatherData.render();
  pagination.render();
  // station.render();
  // dataInfo.render();
  dateFilter.render();
}
