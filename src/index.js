import { render } from './api.js/pattern';
import { fechApi, config } from './api.js/fetchApi';
import Notiflix from 'notiflix';
const axios = require('axios/dist/browser/axios.cjs');
const [form, gallery, btn, img] = [
  '#search-form',
  '.gallery',
  '.load-more',
  '.loading',
].map(item => document.querySelector(item));
let groop = 1;

form.addEventListener('submit', showSearch);

function showRespons(data) {
  // const arr = Object.values(res);
  // for (const data of arr) {
  //   if (typeof data === 'object') {
  //     return data
  //       .map(item => {
  //         return pattern(item);
  //       })
  //       .join('');
  //   }
  // }
  console.log(data);
  if (data.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  gallery.insertAdjacentHTML('beforeEnd', render(data));
  if (img.classList.contains('load')) {
    img.classList.remove('load');
  }
}

let query = '';

function showSearch(event) {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value;
  if (!img.classList.contains('load')) {
    img.classList.add('load');
  }

  const URL_API = `https://pixabay.com/api/?orientation=horizontal&per_page=4&page=${groop}&q=${query}&image_type=photo&safesearch=true&key=36116088-deee45cedc6b935fbf33378b4`;
  if (query === '') return;
  gallery.innerHTML = '';
  btn.classList.remove('hidden');

  return fechApi(URL_API, config)
    .then(showRespons)
    .catch(error => {
      console.error(error, 'not found');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
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
    .then(showRespons)
    .catch(error => {
      console.error(error, 'not found');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}
