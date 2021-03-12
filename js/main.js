import * as stationSearch from "./stationSearch.js";
import * as station from "./stationInfo.js";
import * as weatherData from "./weatherData.js";
import * as pagination from "./pagination.js";
import * as dateFilter from "./dateFilter.js";
import * as stationService from "./lib/stationService.js";
import * as render from "./render.js";

async function app() {
  await stationService.init(98210);
  render.renderAll();
}

window.addEventListener("load", app);
