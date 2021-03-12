import { on } from "../lib/helpers.js";
import { renderAll } from "../lib/render.js";
export let currentPage = 1;
export let resultsPerPage = +localStorage.getItem("resultsPerPage") || 50;
export let totalPages = 0;
export let totalResults = 0;
const container = document.querySelector(".pagination");
const bottomContainer = document.querySelector(".pagination__bottom");

export function render() {
  bottomContainer.innerHTML = "";
  const html = `
      <div class="pagination__count">
      <p>
      Visar <strong>${getCurrentPageMin()}</strong> till <strong>${getCurrentPageMax()}</strong> av
      <strong>${totalResults}</strong> resultat
      </p>     
      <label>
      Per sida: 
      <select name="" id="results-select">
      <option value="25" ${resultsPerPage === 25 ? "selected" : ""}>25</option>
      <option value="50" ${resultsPerPage === 50 ? "selected" : ""}>50</option>
      <option value="100" ${
        resultsPerPage === 100 ? "selected" : ""
      }>100</option>
      <option value=${totalResults} ${
    resultsPerPage === totalResults ? "selected" : ""
  }>Visa alla</option>
    </select>
      </label>
      </div>
        <div class="pagination__buttons">
          <button id="previouspage" class="${
            currentPage === 1 ? "disabled" : ""
          } btn btn-paginate" aria-label="Previous page">
            <i class="fa fa-chevron-left">
            </i>
          </button>
          ${(function addPageButtons() {
            let html = "";
            for (let i = 1; i <= totalPages; i++) {
              if (shouldTruncateButtons()) {
                const truncatedCount = 2;
                if (
                  (i > currentPage - truncatedCount &&
                    i < currentPage + truncatedCount) ||
                  i === 1 ||
                  i === totalPages
                ) {
                  html += `
                    <button class="btn btn-paginate btn-paginate__number ${
                      i === currentPage ? "active" : ""
                    }">${i}</button>
                  `;
                }
              } else {
                html += `
                <button class="btn btn-paginate btn-paginate__number ${
                  i === currentPage ? "active" : ""
                }">${i}</button>
              `;
              }
            }
            return html;
          })()}
          <button id="nextpage" class="${
            currentPage === totalPages && "disabled"
          } btn btn-paginate" aria-label="Next page">
            <i class="fa fa-chevron-right">
            </i>
          </button>
        </div>
      </div>
    `;
  container.innerHTML = html;

  // Show paging buttons below the table as well
  bottomContainer.innerHTML = html;
}

export function setCurrentPage(value) {
  currentPage = value;
  // localStorage.setItem("currentPage", value);
  renderAll();
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
}

export function setResultsLength(dataLength) {
  totalResults = dataLength;
  totalPages = getTotalPages();
}

function getTotalPages() {
  return Math.ceil(totalResults / resultsPerPage);
}
function getCurrentPageMin() {
  return resultsPerPage * currentPage - resultsPerPage + 1;
}
function getCurrentPageMax() {
  return currentPage === totalPages
    ? totalResults
    : resultsPerPage * currentPage;
}
function shouldTruncateButtons() {
  return totalPages > 8;
}

on("click", "#nextpage", nextPage);
on("click", "#previouspage", previousPage);
on("click", ".btn-paginate__number", ({ target }) => {
  setCurrentPage(+target.innerText);
});
on("change", "#results-select", ({ target }) => {
  setResultsPerPage(+target.value);
});
