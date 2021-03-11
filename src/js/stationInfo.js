import { getCurrentStation } from "./lib/stationService.js";
import { get } from "./lib/weatherDataService.js";
import { capitalizeFirstLetter } from "./helpers.js";
const container = document.querySelector(".data-info");

function render_bak() {
  container.innerHTML = `
  <h1>${getCurrentStation().name}</h1>
    <p><strong>Ägare:</strong> ${getCurrentStation().owner}</p>
    <p><strong>id:</strong> ${getCurrentStation().id}</p>
    <p><strong>Höjd:</strong> ${getCurrentStation().height}</p>
    <p><strong>Latitud:</strong> ${getCurrentStation().latitude}</p>
    <p><strong>Longitud:</strong> ${getCurrentStation().longitude}</p>
  `;
}

export function render() {
  container.innerHTML = `
    <header class="data-info__header">
      <div class="data-info__header_title">
        <h1>${get().station.name}</h1>
        <h3>${get().parameter.name}</h3>
      </div>
      <small class="data-info__header_summary"
        >${capitalizeFirstLetter(get().parameter.summary)}</small
      >
    </header>
    <article class="station-info">
      <ul class="station-info__list">
        <li class="station-info__list_item">
          <div class="col">
            <strong>Ägare</strong>
          </div>
          <div class="col">
            <span>${getCurrentStation().owner}</span>
          </div>
        </li>
        <li class="station-info__list_item">
          <div class="col">
            <strong>ID</strong>
          </div>
          <div class="col">
            <span>${getCurrentStation().id}</span>
          </div>
        </li>
        <li class="station-info__list_item">
          <div class="col">
            <strong>Höjd</strong>
          </div>
          <div class="col">
            <span>${getCurrentStation().height} m</span>
          </div>
        </li>
        <li class="station-info__list_item">
          <div class="col">
            <strong>Longitud</strong>
          </div>
          <div class="col">
            <span>${getCurrentStation().longitude}</span>
          </div>
        </li>
        <li class="station-info__list_item">
          <div class="col">
            <strong>Latitud</strong>
          </div>
          <div class="col">
            <span>${getCurrentStation().latitude}</span>
          </div>
        </li>
      </ul>
    </article>
  `;
}
