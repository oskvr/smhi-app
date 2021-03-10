import { fetchWeatherDataAsync } from "./lib/weatherDataService.js";
import * as pagination from "./pagination.js";

const tableBody = document.querySelector("tbody");
const tableHead = document.querySelector("#test-headers");
export let cachedWeatherData = [];
export async function init(station) {
  cachedWeatherData = await fetchWeatherDataAsync(station.id);
  pagination.setPaginatedData(cachedWeatherData.value);
  pagination.setResultsLength(cachedWeatherData.value.length);
}

export function render() {
  renderTableBody(pagination.paginatedData);
  renderTableHeader(cachedWeatherData.value[0]);
  console.log(cachedWeatherData.parameter.unit);
}

// export function getWeatherData() {
//   const isFilteredByDates =
//     localStorage.getItem("isFilteredByDates") === "true";
//   if (isFilteredByDates) {
//     console.log("Returning filtered data");
//   } else {
//     console.log("Returning all data");
//   }
// }

function renderTableBody(data) {
  tableBody.innerHTML = "";
  if (!data) {
    tableBody.innerHTML = "Ingen data kunde hittas för vald station";
  } else {
    data.map((data) => {
      const tr = document.createElement("tr");
      for (const [key, value] of Object.entries(data)) {
        const td = document.createElement("td");
        td.innerText =
          {
            from: new Date(value).toLocaleDateString(),
            to: new Date(value).toLocaleDateString(),
            date: new Date(value).toLocaleDateString(),
            value:
              value + " " + getUnitString(cachedWeatherData.parameter.unit),
          }[key] ?? value;
        tr.appendChild(td);
      }
      tableBody.appendChild(tr);
    });
  }
}
function getUnitString(unit) {
  switch (unit) {
    case "millimetre":
      return "mm";
    case "degree celsius":
      return "°C";
    default:
      return "";
  }
}
function renderTableHeader(object) {
  const props = Object.keys(object);
  tableHead.innerHTML = "";
  props.map((prop) => {
    const th = document.createElement("th");
    th.setAttribute("data-sorted", "false");
    th.setAttribute("data-order", "asc");
    th.setAttribute("data-targetdata", prop);
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
    const sorted = cachedWeatherData.value.sort((a, b) =>
      sortOrder === "asc"
        ? b[targetData] - a[targetData]
        : a[targetData] - b[targetData]
    );
    console.log(target.dataset.sorted);
    pagination.setPaginatedData(sorted);
    renderTableBody(pagination.paginatedData);
  }
});

// function parse(data) {
//   const output = {
//     parameter: {
//       key: data.parameter.key,
//       name: data.parameter.name,
//       summary: data.parameter.summary,
//       unit: data.parameter.unit,
//     },
//     period: {
//       key: data.period.key,
//       from: data.period.from,
//       to: data.period.to,
//       summary: data.period.summary,
//       sampling: data.period.sampling,
//     },
//     position: {
//       from: data.position[0].from,
//       to: data.position[0].to,
//       height: data.position[0].height,
//       latitude: data.position[0].latitude,
//       longitude: data.position[0].longitude,
//     },
//     station: {
//       height: data.station.height,
//       key: data.station.key,
//       name: data.station.name,
//       owner: data.station.owner,
//       ownerCategory: data.station.ownerCategory,
//     },
//     updated: data.updated,
//     value: data.value,
//   };
//   return output;
// }
