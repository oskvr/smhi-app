import { on } from "../lib/helpers.js";
import { getActiveStations, setStation } from "../lib/stationService.js";
const results = document.querySelector(".results");
const input = document.querySelector("#stationSearchInput");
const toggleBtn = document.querySelector("#stationSearchToggle");
let isOpen = false;
let focusIndex = 0;

on("keydown", "#stationSearchInput", (e) => {
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
    const resultItems = document.querySelectorAll(".results__item");
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focusIndex++;
        if (focusIndex === resultItems.length) {
          focusIndex = 0;
        }
        resultItems[focusIndex].focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        focusIndex--;
        if (focusIndex === -1) {
          focusIndex = resultItems.length - 1;
        }
        resultItems[focusIndex].focus();
        break;
      case "Enter":
        updateStation(+e.target.dataset.id);
        break;
    }
  }
});
function updateStation(stationId) {
  if (stationId) {
    setStation(stationId);
    hideResults();
    input.value = "";
  }
}
toggleBtn.addEventListener("click", () => {
  if (!input.value) return;
  if (isOpen) {
    hideResults();
  } else {
    showResults();
  }
});

on("click", ".results__item", (e) => {
  updateStation(+e.target.dataset.id);
});
on("click", "!.results__item", (e) => {
  if (isOpen) {
    if (e.target === toggleBtn) return;
    toggleBtn.classList.remove("active");
    hideResults();
  }
});
on("click", "#stationSearchInput", () => {
  if (input.value) {
    showResults();
  }
});

on("input", "#stationSearchInput", () => {
  const results = document.querySelector(".results");
  if (!input.value) {
    hideResults();
    return;
  }
  const filtered = getActiveStations().filter(({ name }) => {
    const inputToLower = input.value.toLowerCase();
    const nameToLower = name.toLowerCase();
    return nameToLower.includes(inputToLower);
  });
  const sorted = sortByMatch(filtered, input.value);

  showResults();
  if (sorted.length && sorted) {
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
function sortByMatch(data, term) {
  return data.sort((a, b) => {
    return a.name.toLowerCase().indexOf(term) <
      b.name.toLowerCase().indexOf(term)
      ? -1
      : 1;
  });
}

function showResults() {
  toggleBtn.classList.add("active");
  results.classList.add("show");
  isOpen = true;
  focusIndex = 0;
}

function hideResults() {
  toggleBtn.classList.remove("active");
  results.classList.remove("show");
  isOpen = false;
  focusIndex = 0;
}
