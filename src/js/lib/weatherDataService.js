import {} from "../pagination.js";

let weatherData = [];

export async function fetchWeatherDataAsync(stationId) {
  // Alla endpoints: https://opendata-download-metobs.smhi.se/api/version/latest.
  // 2 === temperatur medelvärde 1 gång/dygn
  const url = `https://opendata-download-metobs.smhi.se/api/version/latest/parameter/2/station/${stationId}/period/latest-months/data.json`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
export function getWeatherData() {
  return weatherData.value;
}

export function getPaginatedWeatherData() {
  const resultsPerPage = 25;
  const totalResults = getWeatherData().length;
  const currentPage = 1;
  if (resultsPerPage === totalResults) return array;
  const minIndex = currentPage * resultsPerPage - resultsPerPage;
  const maxIndex = minIndex + resultsPerPage;
  return getWeatherData().filter((_, i) => i >= minIndex && i < maxIndex);
}

export function setWeatherData(value) {
  weatherData = value;
}
