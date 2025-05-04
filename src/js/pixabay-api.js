import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '50047920-024bf2fadca75537663b51516';
export async function getImagesByQuery(query, page = 1, per_page = 15) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
}
