import * as weatherData from "./weatherData.js";
import * as pagination from "./pagination.js";
import {
  getActiveStations,
  getCurrentStation,
  setStation,
} from "./lib/stationService.js";
const stationSection = document.querySelector(".station");
// export let cachedActiveStations = [];
// let cachedAllStations = [];
// export let currentStation = {};

// export async function init(location) {
//   cachedAllStations = getAllStations();
//   cachedActiveStations = getActiveStations();
//   currentStation = getCurrentStation();
// }

// export function getStation(stationName) {
//   return cachedActiveStations.filter(
//     (station) => station.name.toLowerCase() === stationName.toLowerCase()
//   )[0];
// }
export function render() {
  stationSection.innerHTML = `
  <select id="stationSelect">
  ${getActiveStations().map((station) => {
    return `<option value="${station.name}" ${
      station.name === getCurrentStation().name ? "selected" : ""
    }>${station.name}</option>`;
  })}
  </select>
  <button id="changeStation" class="btn">Byt station</button>
  <h1>Data från de senaste 4 månaderna</h1>
  <h3>${getCurrentStation().name}</h3>
    <p><strong>Ägare:</strong> ${getCurrentStation().owner}</p>
    <p><strong>id:</strong> ${getCurrentStation().id}</p>
    <p><strong>Höjd:</strong> ${getCurrentStation().height}</p>
    <p><strong>Latitud:</strong> ${getCurrentStation().latitude}</p>
    <p><strong>Longitud:</strong> ${getCurrentStation().longitude}</p>
  `;
}

document.addEventListener("click", ({ target }) => {
  const selectedStation = document.querySelector("#stationSelect");
  if (target.closest("#changeStation")) {
    setStation(selectedStation.value);
    // weatherData.init(getCurrentStation());
    weatherData.render();
    pagination.render();
    render();
  }
});
