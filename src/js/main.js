import * as pagination from "./pagination.js";
window.addEventListener("load", app);

async function app() {
  let paginatedData = [];
  const rawData = await fetchWeatherData(98210);
  const parsed = parse(rawData);
  const props = Object.keys(parsed.values[0]);
  props.map((prop) => {
    renderTableHeader({
      text: prop,
      isSortable: true,
      targetData: prop,
    });
  });
  // console.table(parsed.parameter);
  // console.table(parsed.period);
  // console.table(parsed.position);
  // console.table(parsed.station);
  // console.table(parsed.updated);
  paginatedData = pagination.getPaginatedData(parsed.values);
  renderTableBody(paginatedData);
  pagination.setResultsLength(parsed.values.length);
  pagination.render();

  // This handles all sorting
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
      const sorted = parsed.values.sort((a, b) =>
        sortOrder === "asc"
          ? b[targetData] - a[targetData]
          : a[targetData] - b[targetData]
      );
      paginatedData = pagination.getPaginatedData(sorted);
      renderTableBody(paginatedData);
    } else if (target.closest(".btn-paginate")) {
      if (target.closest("#nextpage")) {
        pagination.nextPage();
      } else if (target.closest("#previouspage")) {
        pagination.previousPage();
      } else {
        pagination.setPage(+target.innerText);
      }
      paginatedData = pagination.getPaginatedData(parsed.values);
      renderTableBody(paginatedData);
    }
  });
  document.addEventListener("change", (e) => {
    if (e.target.closest("#results-select")) {
      const selectedValue = +e.target.value;
      pagination.setResultsPerPage(selectedValue);
      paginatedData = pagination.getPaginatedData(parsed.values);
      renderTableBody(paginatedData);
    }
  });

  // const resultsSelect = document.querySelector("#results-select");
  // resultsSelect.addEventListener("change", () => {
  //   pagination.setResultsPerPage(resultsSelect.value);
  //   paginatedData = pagination.getPaginatedData(parsed.values);
  //   renderTableBody(paginatedData);
  // });
}

async function fetchWeatherData(stationId) {
  // Alla endpoints: https://opendata-download-metobs.smhi.se/api/version/latest.
  // 2 === temperatur medelvärde 1 gång/dygn
  const url = `https://opendata-download-metobs.smhi.se/api/version/latest/parameter/27/station/${stationId}/period/latest-months/data.json`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

function parse(data) {
  const output = {
    parameter: {
      key: data.parameter.key,
      name: data.parameter.name,
      summary: data.parameter.summary,
      unit: data.parameter.unit,
    },
    period: {
      key: data.period.key,
      from: data.period.from,
      to: data.period.to,
      summary: data.period.summary,
      sampling: data.period.sampling,
    },
    position: {
      from: data.position[0].from,
      to: data.position[0].to,
      height: data.position[0].height,
      latitude: data.position[0].latitude,
      longitude: data.position[0].longitude,
    },
    station: {
      height: data.station.height,
      key: data.station.key,
      name: data.station.name,
      owner: data.station.owner,
      ownerCategory: data.station.ownerCategory,
    },
    updated: data.updated,
    values: data.value,
  };
  return output;
}

async function renderConsoleTable(stationData, weatherData) {
  console.clear();
  console.table(weatherData);
  console.table(stationData);
}

function renderTableHeader({ text, isSortable, targetData }) {
  const tableHeaderRow = document.querySelector("#test-headers");
  const th = document.createElement("th");
  if (isSortable) {
    th.setAttribute("data-sorted", "false");
    th.setAttribute("data-order", "asc");
    th.setAttribute("data-targetdata", targetData);
  }
  th.innerText = text;
  tableHeaderRow.appendChild(th);
}

function renderTableBody(data) {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";
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

function renderStationData(stationData) {}
