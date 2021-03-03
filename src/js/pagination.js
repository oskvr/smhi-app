let currentPage = 1;
let resultsPerPage = 25;
let totalPages = 0;
let resultCount = 0;

export function render() {
  const paginateSection = document.querySelector(".pagination");
  paginateSection.innerHTML = `
      <div class="pagination__count">
      <p>
      Visar <strong>${
        resultsPerPage * currentPage - resultsPerPage
      }</strong> till <strong>${
    currentPage === totalPages ? resultCount : resultsPerPage * currentPage
  }</strong> av
      <strong>${resultCount}</strong> resultat
      </p>     
      <label>
      Resultat per sida: 
      <select name="" id="results-select">
      <option value="25">25</option>
      <option value="50">50</option>
      <option value="100">100</option>
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

export function setPage(newPage) {
  currentPage = newPage;
  render();
}
export function previousPage() {
  if (currentPage === 1) return;
  currentPage--;
  render();
}
export function nextPage() {
  if (currentPage === totalPages) return;
  currentPage++;
  render();
}
export function setTotalPages(value) {
  resultsPerPage = value;
  render();
}

export function setResultsLength(dataLength) {
  resultCount = dataLength;
  totalPages = Math.ceil(resultCount / resultsPerPage);
}

export function getPaginatedData(array) {
  const minIndex =
    currentPage === 1 ? 0 : currentPage * resultsPerPage - resultsPerPage;
  const maxIndex = minIndex + resultsPerPage;
  return array.filter((_, i) => i >= minIndex && i < maxIndex);
}
