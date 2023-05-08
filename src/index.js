import { render } from './api.js/pattern';
import { fechApi, config } from './api.js/fetchApi';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const axios = require('axios/dist/browser/axios.cjs');
const [form, gallery, btn, img] = [
  '#search-form',
  '.gallery',
  '.load-more',
  '.loading',
].map(item => document.querySelector(item));
let groop = 1;
const page = 4;
form.addEventListener('submit', showSearch);

function showRespons(data) {
  if (data.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  Notiflix.Notify.info(`Hooray! We found ${data.hits.length} images.`);
  gallery.insertAdjacentHTML('beforeEnd', render(data));
  if (img.classList.contains('load')) {
    img.classList.remove('load');
  }
}

function addData(data) {
  if (data.hits.length === 0) {
    Notiflix.Notify.failure(
      'We are sorry, but you have reached the end of search results.'
    );
  }
  Notiflix.Notify.info(`Hooray! We found ${data.hits.length} images.`);
  if (!img.classList.contains('load')) {
    img.classList.add('load');
  }

  gallery.insertAdjacentHTML('beforeEnd', render(data));

  if (img.classList.contains('load')) {
    img.classList.remove('load');
  }

  if (data.hits.length < page) {
    btn.classList.add('hidden');
  }
}

let query = '';

function showSearch(event) {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value;
  if (!img.classList.contains('load')) {
    img.classList.add('load');
  }
  groop = 1;
  const URL_API = `https://pixabay.com/api/?orientation=horizontal&per_page=${page}&page=${groop}&q=${query}&image_type=photo&safesearch=true&key=36116088-deee45cedc6b935fbf33378b4`;
  if (query === '') return;
  gallery.innerHTML = '';
  btn.classList.remove('hidden');

  return fechApi(URL_API, config)
    .then(showRespons)
    .catch(error => {
      console.error(error, 'not found');
    });
}

btn.addEventListener('click', loadMore);

function loadMore() {
  if (!img.classList.contains('load')) {
    img.classList.add('load');
  }
  groop += 1;
  const URL_API = `https://pixabay.com/api/?orientation=horizontal&per_page=4&page=${groop}&q=${query}&image_type=photo&safesearch=true&key=36116088-deee45cedc6b935fbf33378b4`;

  return fechApi(URL_API, config)
    .then(addData)
    .catch(error => {
      console.error(error, 'not found');
    });
}
