import { on } from "./helpers.js";
import { getActiveStations, setStation } from "./lib/stationService.js";
const results = document.querySelector(".results");
const input = document.querySelector("#stationSearchInput");
const toggleBtn = document.querySelector("#stationSearchToggle");
let isOpen = false;
let focusIndex = 0;

on("keydown", "#stationSearchInput", (e) => {
  console.log("Hej");
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
        const selectedId = +resultItems[focusIndex].dataset.id;
        if (selectedId) {
          setStation(selectedId);
          hideResults();
          input.value = "";
        }
        break;
    }
  }
});

on("click", "#stationSearchToggle", (e) => {
  if (isOpen) {
    hideResults();
  } else {
    showResults();
  }
});
on("click", ".results__item", (e) => {
  const selectedId = +e.target.dataset.id;
  if (selectedId) {
    setStation(selectedId);
    input.value = "";
    hideResults();
  }
});
on("click", "!.results__item", () => {
  if (isOpen) {
    toggleBtn.classList.remove("active");
    hideResults();
  }
});
on("click", "#stationSearchInput", () => {
  if (input.value) {
    toggleBtn.classList.add("active");
    showResults();
  }
});

on("input", "#stationSearchInput", (e) => {
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
