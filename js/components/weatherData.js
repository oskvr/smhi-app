import { initChart } from "./dataChart.js";
import {
  getPaginatedWeatherData,
  getUnitString,
  getWeatherDataProps,
  sortWeatherData,
} from "../lib/weatherDataService.js";
import { setCurrentPage } from "./pagination.js";

const tableBody = document.querySelector("tbody");
const tableHead = document.querySelector("#test-headers");
const latestSort = {
  prop: "",
  order: "",
};
resetSort();

export function render() {
  renderTableBody();
  renderTableHeader();
}

export function resetSort() {
  latestSort.prop = "date";
  latestSort.order = "desc";
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
        td.innerHTML =
          {
            from: new Date(value).toLocaleString(),
            to: new Date(value).toLocaleString(),
            date: new Date(value).toLocaleString(),
            value: `<span>${value}</span> ${getUnitString()}`,
            quality:
              value === "G"
                ? `<span class="pill pill-green">Godkänd</span>`
                : value === "Y"
                ? `<span class="pill pill-yellow">Instabil</span>`
                : `<span class="pill pill-red">Dålig</span>`,
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
    th.innerHTML =
      {
        date: "Datum",
        from: "Från",
        to: "Till",
        value: "Värde",
        quality: "Mätkvalitet",
      }[prop] ?? prop;
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
    initChart();
  }
});
