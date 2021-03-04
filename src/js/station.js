const stationSection = document.querySelector(".station");
let currentStation = {};
let cachedActiveStations = [];
export function render() {
  stationSection.innerHTML = `
  <h1>${currentStation.name}</h1>
    <select id="station-select">
        ${cachedActiveStations.map((station) => {
          return `<option value="${station.name}" ${
            station.name === currentStation.name ? "selected" : ""
          }>${station.name}</option>`;
        })}
    </select>
  `;
}

export async function setStation(location) {
  currentStation = cachedActiveStations.filter(
    (station) => station.name.toLowerCase() === location.toLowerCase()
  )[0];
}

export async function cacheActiveStations() {
  const url =
    "https://opendata-download-metobs.smhi.se/api/version/latest/parameter/2.json";
  const res = await fetch(url);
  const { station } = await res.json();
  cachedActiveStations = station.filter((s) => s.active);
}

document.addEventListener("change", ({ target }) => {
  if (target.closest("#station-select")) {
    setStation(target.value);
    render();
  }
});
