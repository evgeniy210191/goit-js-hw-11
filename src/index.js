import { pattern } from './api.js/pattern';
import { fechApi } from './api.js/fetchApi';
const axios = require('axios');
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const URL_API = `https://pixabay.com/api/?key=36116088-deee45cedc6b935fbf33378b4&orientation=horizontal&q=${form.elements.searchQuery.value}&image_type=photo&safesearch=true`;
const config = {
  method: 'GET',
  headers: {
    'cache-control': 'max-age=86400',
    'content-language': 'en',
    'content-type': 'application/json',
    'last-modified': 'Sun, 07 May 2023 12:50:28 GMT',
    'last-modified': 'Sun, 07 May 2023 12:50:28 GMT',
    'x-ratelimit-limit': '100',
    'x-ratelimit-remaining': '99',
    'x-ratelimit-reset': '0.6',
  },
};

function render(res) {
  const arr = Object.values(res);
  for (const data of arr) {
    if (typeof data === 'object') {
      return data
        .map(item => {
          return pattern(item);
        })
        .join('');
    }
  }
}

form.addEventListener('submit', showSearch);

function showSearch(event) {
  event.preventDefault();

  if (form.elements.searchQuery.value === '') return;
  gallery.innerHTML = '';
  fechApi(URL_API, config)
    .then(data => {
      console.log(data);
      return gallery.insertAdjacentHTML('beforeEnd', render(data));
    })
    .catch(console.error('not found'));
}
// axios
//   .get('/user')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });
