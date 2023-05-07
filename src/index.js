import { render } from './api.js/pattern';
import { fechApi, config } from './api.js/fetchApi';
import Notiflix from 'notiflix';
const axios = require('axios/dist/browser/axios.cjs');
const [form, gallery, btn] = ['#search-form', '.gallery', '.load-more'].map(
  item => document.querySelector(item)
);
let groop = 1;
const URL_API = `https://pixabay.com/api/?orientation=horizontal&per_page=40&page=${groop}&q=${form.elements.searchQuery.value}&image_type=photo&safesearch=true&key=36116088-deee45cedc6b935fbf33378b4`;

form.addEventListener('submit', showSearch);

function showRespons(data) {
  const img = document.querySelector('.loading');
  if (!img.classList.contains('load')) {
    img.classList.add('load');
  }
  if (data.length === 0) {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  gallery.insertAdjacentHTML('beforeEnd', render(data));
  if (img.classList.contains('load')) {
    img.classList.remove('load');
  }
}

function showSearch(event) {
  event.preventDefault();

  if (form.elements.searchQuery.value === '') return;
  gallery.innerHTML = '';
  btn.classList.remove('hidden');
  renderPage();
}

function renderPage() {
  return fechApi(URL_API, config)
    .then(showRespons)
    .catch(error => {
      console.error(error, 'not found');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}
