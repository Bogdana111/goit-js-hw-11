export function fetchImages(query) {
  const URL = 'https://pixabay.com/api/';
  const API_KEY = '45282736-76f00277f987f73abb95d9f87';

  return fetch(
    `${URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
}
