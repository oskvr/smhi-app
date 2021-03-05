import * as pagination from "./pagination.js";

const tableBody = document.querySelector("tbody");
const tableHead = document.querySelector("#test-headers");
export let cachedWeatherData = [];

export async function init(station) {
  cachedWeatherData = await fetchWeatherData(station.id);
  pagination.setPaginatedData(cachedWeatherData.value);
  pagination.setResultsLength(cachedWeatherData.value.length);
}

export function render() {
  renderTableBody(pagination.paginatedData);
  renderTableHeader(cachedWeatherData.value[0]);
}

async function fetchWeatherData(stationId) {
  // Alla endpoints: https://opendata-download-metobs.smhi.se/api/version/latest.
  // 2 === temperatur medelvärde 1 gång/dygn
  const url = `https://opendata-download-metobs.smhi.se/api/version/latest/parameter/5/station/${stationId}/period/latest-months/data.json`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    renderTableBody(null);
  }
}

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
            from: new Date(value).toLocaleString(),
            to: new Date(value).toLocaleString(),
            date: new Date(value).toLocaleString(),
            value: `${value} °C`,
          }[key] ?? value;
        tr.appendChild(td);
      }
      tableBody.appendChild(tr);
    });
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
