import * as weatherData from "./weatherData.js";
import * as pagination from "./pagination.js";
import * as station from "./station.js";
import * as dateFilter from "./dateFilter.js";
// Test för att se beteendet vid rendering av allting
export function renderAll() {
  weatherData.render();
  pagination.render();
  station.render();
  dateFilter.render();
}
