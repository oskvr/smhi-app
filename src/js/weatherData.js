import {
  getPaginatedWeatherData,
  getUnitString,
  getWeatherDataProps,
  sortWeatherData,
} from "./lib/weatherDataService.js";
import { setCurrentPage } from "./pagination.js";

const tableBody = document.querySelector("tbody");
const tableHead = document.querySelector("#test-headers");
const latestSort = {
  prop: "",
  order: "",
};
export let cachedWeatherData = [];

export function render() {
  renderTableBody();
  renderTableHeader();
}

function renderTableBody() {
  const weatherData = getPaginatedWeatherData();
  tableBody.innerHTML = "";
  if (!weatherData) {
    tableBody.innerHTML = "Ingen data kunde hittas för vald station";
  } else {
    weatherData.map((data) => {
      const tr = document.createElement("tr");
      for (const [key, value] of Object.entries(data)) {
        const td = document.createElement("td");
        td.innerText =
          {
            from: new Date(value).toLocaleDateString(),
            to: new Date(value).toLocaleDateString(),
            date: new Date(value).toLocaleDateString(),
            value: value + " " + getUnitString(),
          }[key] ?? value;
        tr.appendChild(td);
      }
      tableBody.appendChild(tr);
    });
  }
}

function renderTableHeader() {
  const props = getWeatherDataProps();
  tableHead.innerHTML = "";
  props.map((prop) => {
    const th = document.createElement("th");
    if (prop === latestSort.prop) {
      th.setAttribute("data-sorted", "true");
      th.setAttribute("data-order", latestSort.order);
      th.setAttribute("data-targetdata", prop);
    } else {
      th.setAttribute("data-sorted", "false");
      th.setAttribute("data-order", "asc");
      th.setAttribute("data-targetdata", prop);
    }
    th.innerText = prop;
    tableHead.appendChild(th);
  });
}

document.addEventListener("click", ({ target }) => {
  if (target.dataset.sorted) {
    const initSorted = () => {
      const sorted = document.querySelectorAll("[data-sorted='true']");
      sorted.forEach((el) => {
        el.dataset.sorted = "false";
      });
    };
    initSorted();
    const sortOrder = target.dataset.order;
    target.dataset.sorted = "true";
    target.dataset.order = sortOrder === "desc" ? "asc" : "desc";
    const targetData = target.dataset.targetdata;
    latestSort.prop = targetData;
    latestSort.order = target.dataset.order;
    sortWeatherData(targetData, sortOrder);
    setCurrentPage(1);
  }
});
