import View from './Views';

class SearchView extends View {
    _parentElement = document.querySelector('.search')

    getQuery() {
        return this._parentElement.querySelector('.search__field').value;
    }
    clearInput() {
        this._parentElement.querySelector('.search__field').value = ''
    }
    addSearchHandler(handler) {
        this._parentElement.querySelector('.search__btn').addEventListener('click', function(e) {
          e.preventDefault();
          handler();
        })
      }
}

export default new SearchView();