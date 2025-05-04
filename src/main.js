import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');

let totalPages = 0;
let searchQuery = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

hideLoadMoreButton();

form.addEventListener('submit', async event => {
  event.preventDefault();

  searchQuery = event.target.elements['search-text'].value.trim();
  if (!searchQuery) {
    iziToast.warning({
      message: 'Please enter a search query',
      position: 'topRight',
    });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, page);
    totalHits = data.totalHits;
    totalPages = Math.ceil(totalHits / perPage);

    if (data.hits.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching<br> your search query. Please try again!',
        position: 'topRight',
        backgroundColor: '#ff6b6b',
        color: 'white',
      });
      return;
    }

    createGallery(data.hits);

    if (totalPages > 1) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }

    form.reset();
  } catch (error) {
    iziToast.error({
      message: 'An error occurred while fetching data. Try again later.',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    await new Promise(resolve => setTimeout(resolve, 1000));
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  loadMoreBtn.classList.add('is-hidden');
  showLoader();
  page += 1;

  try {
    const data = await getImagesByQuery(searchQuery, page);
    createGallery(data.hits);

    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 3000,
      });
    }

    const cardHeight =
      document.querySelector('.gallery-item')?.getBoundingClientRect().height ||
      0;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({
      message: 'An error occurred while loading more images.',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    await new Promise(resolve => setTimeout(resolve, 1000));
    hideLoader();

    if (page < totalPages) {
      loadMoreBtn.classList.remove('is-hidden');
    }
  }
});
