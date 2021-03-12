import * as stationService from "./lib/stationService.js";
import * as render from "./render.js";

async function app() {
  await stationService.init(98210);
  render.renderAll();
}

window.addEventListener("load", app);
