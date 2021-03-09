import * as station from "./station.js";
import * as weatherData from "./weatherData.js";
import * as pagination from "./pagination.js";
import * as dateFilter from "./dateFilter.js";
import * as render from "./render.js";
import { currentStation } from "./store.js";

async function app() {
  await station.init("stockholm");
  await weatherData.init(currentStation);
  weatherData.render();
  pagination.render();
  station.render();
}

const dateFilterForm = document.querySelector("#dateFilterForm");
dateFilterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  dateFilter.filterDates();
});

// TA BORT
document.addEventListener("click", (e) => {
  if (e.target.closest("#renderAll")) {
    render.renderAll();
  }
});

window.addEventListener("load", app);
