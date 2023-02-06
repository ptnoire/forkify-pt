import icons from 'url:../../img/icons.svg';
import View from './Views';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addPaginationHandler(handler) {
        this._parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            const btn = e.target.closest('.btn--inline');
            if(!btn) return;
            const goto = +btn.dataset.goto;
            handler(goto);
        })
    }

    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        // On Page 1:
        if (curPage === 1 && numPages > 1) {
            return `
            <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
            `;
        }
        // On Last Page:
        if(curPage === numPages && numPages > 1) {
            return `
            <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
            `;
        }
        // Anywhere in between:
        if(curPage < numPages) {
            return `
            <button data-goto="${curPage - 1}"  class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
            `;
        }
        // Only One Page:
        return '';
    }
}

export default new PaginationView();