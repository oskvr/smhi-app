import * as station from "./station.js";
import * as weatherData from "./weatherData.js";
import * as pagination from "./pagination.js";
import { currentStation } from "./store.js";

async function app() {
  await station.init("stockholm");
  await weatherData.init(currentStation);
  weatherData.render();
  pagination.render();
  station.render();
}

window.addEventListener("load", app);
