import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '../src/css/styles.css';
import { fetchImages } from './js/pixabay-api';
import { renderImageCard, clearGallery } from './js/render-functions';

const searchForm = document.querySelector('.search-form');
const loader = document.querySelector('.loader');
const input = document.querySelector('.input-text');

searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();
  clearGallery();
  loader.classList.remove('hidden');

  const searchWord = input.value.trim().toLowerCase();
  fetchImages(`${searchWord}`).then(data => {
    if (data.total === 0 || searchWord === '') {
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      loader.classList.add('hidden');
      return;
    } else {
      renderImageCard(data);
    }
    loader.classList.add('hidden');
  });
  searchForm.reset();
}
