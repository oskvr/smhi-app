import { on } from "./helpers.js";
import * as weatherData from "./weatherData.js";
export let paginatedData = [];
export let currentPage = +localStorage.getItem("currentPage") || 1;
export let resultsPerPage = +localStorage.getItem("resultsPerPage") || 25;
export let totalPages = 0;
export let totalResults = 0;
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
                <button class="btn btn-paginate btn-paginate__number ${
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

export function setCurrentPage(value) {
  currentPage = value;
  localStorage.setItem("currentPage", value);
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
  totalPages = getTotalPages();
  setCurrentPage(1);
  localStorage.setItem("resultsPerPage", value);
  render();
}

export function setResultsLength(dataLength) {
  totalResults = dataLength;
  totalPages = getTotalPages();
}

function getTotalPages() {
  return Math.ceil(totalResults / resultsPerPage);
}

on("click", "#nextpage", nextPage);
on("click", "#previouspage", previousPage);
on("click", ".btn-paginate__number", ({ target }) => {
  setCurrentPage(+target.innerText);
});

// document.addEventListener("click", ({ target }) => {
//   if (target.closest(".btn-paginate")) {
//     if (target.closest("#nextpage")) {
//       nextPage();
//     } else if (target.closest("#previouspage")) {
//       previousPage();
//     } else {
//       setCurrentPage(+target.innerText);
//     }
//   }
// });

document.addEventListener("change", ({ target }) => {
  if (target.closest("#results-select")) {
    setResultsPerPage(+target.value);
  }
});
