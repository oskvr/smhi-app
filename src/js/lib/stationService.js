import { fetchWeatherDataAsync, setWeatherData } from "./weatherDataService.js";

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
  setWeatherData(weatherData);
}

export async function setStation(value) {
  if (typeof value === "string") {
    stations.current = getStationByName(value);
  } else if (typeof value === "number") {
    stations.current = getStationById(value);
  }
  fetchWeatherDataAsync(stations.current.id).then((data) => {
    setWeatherData(data);
  });
  // rerender station html
  // also render pagination
}
export function getCurrentStation() {
  return stations.current;
}
export function getActiveStations() {
  return stations.active;
}
export function getAllStations() {
  return stations.all;
}
function getStationById(stationId) {
  return stations.all.filter((station) => station.id === stationId)[0];
}
function getStationByName(stationName) {
  return stations.all.filter((station) => station.name === stationName)[0];
}
async function fetchAllStationsAsync() {
  const url =
    "https://opendata-download-metobs.smhi.se/api/version/latest/parameter/2.json";
  const res = await fetch(url);
  const { station } = await res.json();
  return station;
}
