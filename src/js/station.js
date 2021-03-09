import * as weatherData from "./weatherData.js";
import * as pagination from "./pagination.js";
const stationSection = document.querySelector(".station");
export let cachedActiveStations = [];
let cachedAllStations = [];
export let currentStation = {};

export async function init(location) {
  cachedAllStations = await fetchAllStations();
  cachedActiveStations = cachedAllStations.filter((s) => s.active);
  currentStation = getStation(location);
}

export function render() {
  stationSection.innerHTML = `
  <select id="stationSelect">
  ${cachedActiveStations.map((station) => {
    return `<option value="${station.name}" ${
      station.name === currentStation.name ? "selected" : ""
    }>${station.name}</option>`;
  })}
  </select>
  <button id="changeStation" class="btn">Byt station</button>
  <h1>Data från de senaste 4 månaderna</h1>
  <h3>${currentStation.name}</h3>
    <p><strong>Ägare:</strong> ${currentStation.owner}</p>
    <p><strong>id:</strong> ${currentStation.id}</p>
    <p><strong>Höjd:</strong> ${currentStation.height}</p>
    <p><strong>Latitud:</strong> ${currentStation.latitude}</p>
    <p><strong>Longitud:</strong> ${currentStation.longitude}</p>
  `;
}
export function getStation(stationName) {
  return cachedActiveStations.filter(
    (station) => station.name.toLowerCase() === stationName.toLowerCase()
  )[0];
}

async function fetchAllStations() {
  const url =
    "https://opendata-download-metobs.smhi.se/api/version/latest/parameter/2.json";
  const res = await fetch(url);
  const { station } = await res.json();
  return station;
}

document.addEventListener("click", ({ target }) => {
  const selectedStation = document.querySelector("#stationSelect");
  if (target.closest("#changeStation")) {
    console.log(selectedStation.value);
    currentStation = getStation(selectedStation.value);
    weatherData.init(currentStation);
    weatherData.render();
    pagination.render();
    render();
  }
});
