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
  const searchWord = input.value.trim().toLowerCase();

  if (searchWord === '') {
    iziToast.error({
      position: 'topRight',
      message: 'Search query cannot be empty. Please enter a keyword!',
    });
    return;
  }

  clearGallery();
  loader.classList.remove('hidden');

  fetchImages(searchWord)
    .then(data => {
      if (data.total === 0) {
        iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        renderImageCard(data);
      }
    })
    .catch(error => {
      iziToast.error({
        position: 'topRight',
        message:
          'An error occurred while fetching data. Please try again later.',
      });
      console.error(error);
    })
    .finally(() => {
      loader.classList.add('hidden');
    });

  searchForm.reset();
}
