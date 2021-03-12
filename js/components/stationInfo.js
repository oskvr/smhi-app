import { getCurrentStation } from "../lib/stationService.js";
import { getData } from "../lib/weatherDataService.js";
import { capitalizeFirstLetter } from "../lib/helpers.js";
const container = document.querySelector(".data-info");

export function render() {
  const viewData = [
    { key: "Ägare", value: getCurrentStation().owner },
    { key: "ID", value: getCurrentStation().id },
    {
      key: "Upprättad",
      value: new Date(getCurrentStation().from).toLocaleDateString(),
    },
    {
      key: "Status",
      value: getCurrentStation().active
        ? `<span class="pill pill-green">Aktiv</span>`
        : `<span class="pill pill-red">Inaktiv</span>`,
    },
    { key: "Höjd", value: Math.round(getCurrentStation().height) + " m" },
    { key: "Longitud", value: getCurrentStation().longitude },
    { key: "Latitud", value: getCurrentStation().latitude },
  ];
  container.innerHTML = `
    <header class="data-info__header">
      <div class="data-info__header_title">
        <h1>${getData().station.name}</h1>
        <h2>${getData().parameter.name}</h2>
      </div>
      <small class="data-info__header_summary"
        >${capitalizeFirstLetter(getData().parameter.summary)}</small
      >
    </header>
    <article class="station-info">
      <ul class="station-info__list">
      ${viewData
        .map((data) => {
          return `
        <li class="station-info__list_item">
        <div class="col">
          <strong>${data.key}</strong>
        </div>
        <div class="col">
          <span>${data.value}</span>
        </div>
      </li>
        `;
        })
        .join("")}
        
      </ul>
    </article>
  `;
}
