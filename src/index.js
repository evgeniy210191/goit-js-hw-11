import { render } from './api.js/pattern';
import { fechApi, config } from './api.js/fetchApi';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.photo-card a', {
  captionPosition: 'bottom',
  scrollZoom: false,
  disableScroll: true,
  captionDelay: 250,
  captions: true,
  captionsData: 'alt',
});

const [form, galleryList, btn, img, body] = [
  '#search-form',
  '.gallery',
  '.load-more',
  '.loading',
  'body',
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
  if (data.hits.length > 0) {
    Notiflix.Notify.info(`Hooray! We found ${data.hits.length} images.`);
    if (data.hits.length === page) {
      btn.classList.remove('hidden');
    } else {
      if (!btn.classList.contains('hidden')) {
        btn.classList.add('hidden');
      }
    }
  }

  galleryList.insertAdjacentHTML('beforeEnd', render(data));
  if (img.classList.contains('load')) {
    img.classList.remove('load');
  }
  lightbox.refresh();
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

  galleryList.insertAdjacentHTML('beforeEnd', render(data));
  lightbox.refresh();
  if (img.classList.contains('load')) {
    img.classList.remove('load');
  }

  if (window.innerHeight < galleryList.getBoundingClientRect().height) {
    window.scrollTo({
      top: body.getBoundingClientRect().height - window.innerHeight,
      behavior: 'smooth',
    });
  }
  if (data.hits.length < page) {
    btn.classList.add('hidden');
  }
}

let query = '';

function showSearch(event) {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value.trim();
  if (!img.classList.contains('load')) {
    img.classList.add('load');
  }
  groop = 1;
  const URL_API = `https://pixabay.com/api/?orientation=horizontal&per_page=${page}&page=${groop}&q=${query}&image_type=photo&safesearch=true&key=36116088-deee45cedc6b935fbf33378b4`;
  if (query === '') return;
  galleryList.innerHTML = '';

  return fechApi(URL_API)
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
  const URL_API = `https://pixabay.com/api/?orientation=horizontal&per_page=${page}&page=${groop}&q=${query}&image_type=photo&safesearch=true&key=36116088-deee45cedc6b935fbf33378b4`;

  return fechApi(URL_API, config)
    .then(addData)
    .catch(error => {
      console.error(error, 'not found');
    });
}
