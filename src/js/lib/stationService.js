import {
  fetchWeatherDataAsync,
  updateWeatherData,
} from "./weatherDataService.js";

const stations = {
  all: [],
  active: [],
  current: [],
};

export async function init(stationId) {
  stations.all = await fetchAllStationsAsync();
  stations.active = stations.all.filter((station) => station.active);
  stations.current = getStationById(stationId);
  const weatherData = await fetchWeatherDataAsync(stationId);
  updateWeatherData(weatherData);
}

export function updateStation(stationId) {
  stations.current = getStationById(stationId);
  // rerender station html
}
export function getCurrentStation() {
  return stations.current;
}
export function getActiveStations() {
  return stations.active;
}
function getStationById(stationId) {
  return stations.all.filter((station) => station.id === stationId);
}
async function fetchAllStationsAsync() {
  const url =
    "https://opendata-download-metobs.smhi.se/api/version/latest/parameter/2.json";
  const res = await fetch(url);
  const { station } = await res.json();
  return station;
}
