import * as weatherData from "./weatherData.js";
import { renderAll } from "./render.js";
export let paginatedData = [];
let currentPage = +localStorage.getItem("currentPage") || 1;
let resultsPerPage = +localStorage.getItem("resultsPerPage") || 25;
let totalPages = 0;
let totalResults = 0;
export function render() {
  const paginateSection = document.querySelector(".pagination");
  paginateSection.innerHTML = `
      <div class="pagination__count">
      <p>
      Visar <strong>${
        resultsPerPage * currentPage - resultsPerPage
      }</strong> till <strong>${
    currentPage === totalPages ? totalResults : resultsPerPage * currentPage
  }</strong> av
      <strong>${totalResults}</strong> resultat
      </p>     
      <label>
      Max resultat per sida: 
      <select name="" id="results-select">
      <option value="25" ${resultsPerPage === 25 && "selected"}>25</option>
      <option value="50" ${resultsPerPage === 50 && "selected"}>50</option>
      <option value="100" ${resultsPerPage === 100 && "selected"}>100</option>
      <option value=${totalResults} ${
    resultsPerPage === totalResults ? "selected" : ""
  }>Visa alla</option>
    </select>
      </label>
      </div>
        <div class="pagination__buttons">
          <button id="previouspage" class="${
            currentPage === 1 && "disabled"
          } btn btn-paginate">
            <i class="fa fa-chevron-left">
            </i>
          </button>
          ${(function addPageButtons() {
            let html = "";
            for (let i = 1; i <= totalPages; i++) {
              html += `
                <button class="btn btn-paginate ${
                  i === currentPage && "active"
                }">${i}</button>
              `;
            }
            return html;
          })()}
          <button id="nextpage" class="${
            currentPage === totalPages && "disabled"
          } btn btn-paginate">
            <i class="fa fa-chevron-right">
            </i>
          </button>
        </div>
      </div>
    `;
}

export function setPaginatedData(rawData) {
  paginatedData = getPaginatedData(rawData);
}

function setCurrentPage(value) {
  currentPage = value;
  localStorage.setItem("currentPage", value);
  setPaginatedData(weatherData.cachedWeatherData.value);
  render();
  weatherData.render();
}
function previousPage() {
  if (currentPage === 1) return;
  setCurrentPage(currentPage - 1);
}
function nextPage() {
  if (currentPage === totalPages) return;
  setCurrentPage(currentPage + 1);
}
export function setResultsPerPage(value) {
  resultsPerPage = value;
  totalPages = Math.ceil(totalResults / resultsPerPage);
  setCurrentPage(1);
  localStorage.setItem("resultsPerPage", value);
  render();
}

export function setResultsLength(dataLength) {
  totalResults = dataLength;
  totalPages = Math.ceil(totalResults / resultsPerPage);
}

export function getPaginatedData(array) {
  if (resultsPerPage === totalResults) return array;
  const minIndex = currentPage * resultsPerPage - resultsPerPage;
  const maxIndex = minIndex + resultsPerPage;
  return array.filter((_, i) => i >= minIndex && i < maxIndex);
}

document.addEventListener("click", ({ target }) => {
  if (target.closest(".btn-paginate")) {
    if (target.closest("#nextpage")) {
      nextPage();
    } else if (target.closest("#previouspage")) {
      previousPage();
    } else {
      setCurrentPage(+target.innerText);
    }
  }
});

document.addEventListener("change", ({ target }) => {
  if (target.closest("#results-select")) {
    const selectedValue = +target.value;
    setResultsPerPage(selectedValue);
    setPaginatedData(weatherData.cachedWeatherData.value);
    weatherData.render(paginatedData);
  }
});