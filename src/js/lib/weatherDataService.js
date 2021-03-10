import { resultsPerPage, currentPage, totalResults } from "../pagination.js";

let weatherData = [];

export async function fetchWeatherDataAsync(stationId) {
  // Alla endpoints: https://opendata-download-metobs.smhi.se/api/version/latest.
  // 2 === temperatur medelvärde 1 gång/dygn
  const url = `https://opendata-download-metobs.smhi.se/api/version/latest/parameter/27/station/${stationId}/period/latest-months/data.json`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
export function getWeatherData() {
  return weatherData.value;
}
export function setWeatherData(value) {
  weatherData = value;
  // render table body here
}
export function sortWeatherData(fn) {
  weatherData.value = weatherData.value.sort(fn);
}
export function getUnit() {
  switch (weatherData.parameter.unit) {
    case "millimetre":
      return "mm";
    case "metre":
      return "m";
    case "degree celsius":
      return "°C";
    default:
      return "";
  }
  return weatherData.parameter.unit;
}

export function getPaginatedWeatherData() {
  if (resultsPerPage === totalResults) return getWeatherData();
  const minIndex = currentPage * resultsPerPage - resultsPerPage;
  const maxIndex = minIndex + resultsPerPage;
  return getWeatherData().filter((_, i) => i >= minIndex && i < maxIndex);
}
