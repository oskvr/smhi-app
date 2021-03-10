import { on } from "./helpers.js";
import * as station from "./station.js";
const stations = station.cachedActiveStations;
const container = document.querySelector(".station");
let isOpen = false;
let focusIndex = 0;

function sortByMatch(data, term) {
  return data.sort((a, b) => {
    return a.name.toLowerCase().indexOf(term) <
      b.name.toLowerCase().indexOf(term)
      ? -1
      : 1;
  });
}

function showResults() {
  const results = document.querySelector(".results");
  results.classList.add("show");
  isOpen = true;
  focusIndex = 0;
}

function hideResults() {
  const results = document.querySelector(".results");
  results.classList.remove("show");
  isOpen = false;
  focusIndex = 0;
}

on("keydown", "#searchStationInput", (e) => {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    const result = document.querySelector(`[data-index='${focusIndex}']`);
    result.focus();
  }
});
on("mouseover", ".results__item", (e) => {
  focusIndex = e.target.dataset.index;
  e.target.focus();
});
on("keydown", ".results", (e) => {
  if (isOpen) {
    const results = document.querySelectorAll(".results__item");
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focusIndex++;
        if (focusIndex === results.length) {
          focusIndex = 0;
        }
        results[focusIndex].focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        focusIndex--;
        if (focusIndex === -1) {
          focusIndex = results.length - 1;
        }
        results[focusIndex].focus();
        break;
      case "Enter":
        const selectedId = results[focusIndex].dataset.id;
        if (selectedId) {
          console.log(selectedId);
        }
        break;
    }
  }
});

on("click", ".results__item", (e) => {
  console.log(e.target.dataset.id);
});
on("click", "!.results__item", () => {
  if (isOpen) {
    hideResults();
  }
});
on("click", "#searchStationInput", () => {
  const input = document.querySelector("#searchStationInput");
  if (input.value) {
    showResults();
  }
});

on("input", "#searchStationInput", (e) => {
  const input = document.querySelector("#searchStationInput");
  const results = document.querySelector(".results");
  if (!input.value) {
    hideResults();
    return;
  }
  const filtered =
    input.value &&
    stations.filter(({ name }) => {
      const inputToLower = input.value.toLowerCase();
      const nameToLower = name.toLowerCase();
      return nameToLower.includes(inputToLower);
    });
  const sorted = sortByMatch(filtered, input.value);

  if (sorted.length > 0) {
    showResults();
    results.innerHTML = `
        ${sorted
          .map((station, index) => {
            return `
              <li tabindex="0" data-id=${station.id} data-index=${index} class="results__item">
                ${station.name}
              </li>
            `;
          })
          .join("")}
      `;
  } else {
    results.innerHTML = `
        <li class="results__item">Inga orter hittades</li>
      `;
  }
});

export function render() {
  container.innerHTML = `
    <div class="search-station">
        <input id="searchStationInput" type="text" placeholder="Sök och välj en station">
        <ul class="results" role="navigation">
        </ul>
    </div>
  
    `;
}
