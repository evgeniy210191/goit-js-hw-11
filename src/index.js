import { render } from './api.js/pattern';
import { fechApi, config } from './api.js/fetchApi';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const [form, galleryList, btn, body] = [
  '#search-form',
  '.gallery',
  '.load-more',
  'body',
].map(item => document.querySelector(item));
let groop = 1;
const page = 40;

const lightbox = new SimpleLightbox('.photo-card a', {
  captionPosition: 'bottom',
  scrollZoom: false,
  disableScroll: true,
  captionDelay: 250,
  captions: true,
  captionsData: 'alt',
});

form.addEventListener('submit', showSearch);

function showRespons(data) {
  if (data.hits.length === 0) {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  if (data.hits.length > 0) {
    Notiflix.Notify.info(`Hooray! We found ${data.hits.length} images.`);
  }

  galleryList.insertAdjacentHTML('beforeEnd', render(data));

  lightbox.refresh();

  if (data.hits.length === page) {
    btn.classList.remove('hidden');
  }
}

function addData(data) {
  Notiflix.Notify.info(`Hooray! We found ${data.hits.length} images.`);

  if (data.hits.length < page) {
    Notiflix.Notify.failure(
      'We are sorry, but you have reached the end of search results.'
    );
  }

  galleryList.insertAdjacentHTML('beforeEnd', render(data));
  lightbox.refresh();

  if (data.hits.length === page) {
    btn.classList.remove('hidden');
  }
  if (window.innerHeight < galleryList.getBoundingClientRect().height) {
    window.scrollTo({
      top: body.getBoundingClientRect().height - window.innerHeight,
      behavior: 'smooth',
    });
  }
}

let query = '';

function showSearch(event) {
  event.preventDefault();

  query = event.currentTarget.elements.searchQuery.value.trim();

  btn.classList.add('hidden');

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
  groop += 1;
  const URL_API = `https://pixabay.com/api/?orientation=horizontal&per_page=${page}&page=${groop}&q=${query}&image_type=photo&safesearch=true&key=36116088-deee45cedc6b935fbf33378b4`;
  btn.classList.add('hidden');
  return fechApi(URL_API)
    .then(addData)
    .catch(error => {
      console.error(error, 'not found');
    });
}
