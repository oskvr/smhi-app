import { getData } from "./lib/weatherDataService.js";

const container = document.querySelector(".data-info");

export function render() {
  container.innerHTML = `
        <h1>${getData().parameter.name}</h1>
        <h3>${getData().parameter.summary}</h3>
    `;
}
