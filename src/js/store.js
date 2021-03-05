import * as pagination from "./pagination.js";
import * as station from "./station.js";
import * as weatherData from "./weatherData.js";

export let currentStation = { id: 98210 };
let cachedWeatherData = [];
let cachedStationData = [];
export let paginatedData = [];
export function init() {}

export async function updateStation(location) {
  currentStation = station.getStation(location);
}

export function newWeatherData() {}
export function updateWeatherData() {
  // paginatedData = pagination.
}
