import { pattern } from './api.js/pattern';
import { fechApi } from './api.js/fetchApi';
const axios = require('axios');
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const URL_API = `https://pixabay.com/api/?key=36116088-deee45cedc6b935fbf33378b4&orientation=horizontal&q=${form.elements.searchQuery.value}&image_type=photo&safesearch=true`;

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
  fechApi(URL_API)
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
