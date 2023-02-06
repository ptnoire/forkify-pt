import icons from 'url:../../img/icons.svg';
import View from './Views';
import previewView from './previewView';

class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found, please check spelling or try another search query!'

    _generateMarkup() {
        return this._data.map(result => previewView.render(result, false)).join('');
    }
}

export default new ResultsView();