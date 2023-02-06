import * as model from './model'
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';

console.log('hello!');
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import { search } from 'core-js/fn/symbol';

// https://forkify-api.herokuapp.com/v2

const showSearchResults = async function() {
  try{
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    await model.loadSearchResults(query)
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state)
    searchView.clearInput();
  }catch (err) {
    console.log(err)
    recipeView.renderError();
  }
}

const controlPagination = function(page) {
  resultsView.render(model.getSearchResultsPage(page))
  paginationView.render(model.state);
}

const controlRecipes = async function() {
  try{
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    resultsView.update(model.getSearchResultsPage());
    recipeView.render(model.state.recipe);
    bookmarksView.update(model.state.bookmarks);
  }catch (err) {
    console.error(err)
    recipeView.renderError();
  }
};

const controlServings = function(newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function() {
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();
    bookmarksView.render(model.state.bookmarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(() => addRecipeView.toggleWindow(), 1500)
  }catch(err){
    console.error('✨', err);
    addRecipeView.renderError(err.message)
  }
}


// Run on start-up, adds eventlisteners from view component and not the controller.
const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(controlServings);
  searchView.addSearchHandler(showSearchResults);
  paginationView.addPaginationHandler(controlPagination);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};
init();