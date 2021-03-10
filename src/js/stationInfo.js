import { getCurrentStation } from "./lib/stationService.js";
const container = document.querySelector(".station");

export function render() {
  container.innerHTML = `
  <h1>${"Hej"}</h1>
  <h3>${getCurrentStation().name}</h3>
    <p><strong>Ägare:</strong> ${getCurrentStation().owner}</p>
    <p><strong>id:</strong> ${getCurrentStation().id}</p>
    <p><strong>Höjd:</strong> ${getCurrentStation().height}</p>
    <p><strong>Latitud:</strong> ${getCurrentStation().latitude}</p>
    <p><strong>Longitud:</strong> ${getCurrentStation().longitude}</p>
  `;
}
