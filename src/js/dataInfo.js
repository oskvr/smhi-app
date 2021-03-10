import { get } from "./lib/weatherDataService.js";

const container = document.querySelector(".data-info");

export function render() {
  container.innerHTML = `
        <h1>${get().parameter.name}</h1>
        <h3>${get().parameter.summary}</h3>
        <h3>${get().parameter.unit}</h3>
    `;
}
