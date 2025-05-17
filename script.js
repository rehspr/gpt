const apiKey = '0b192501e1b0251de14dfe6c5059de19';
const apiUrl = 'https://api.themoviedb.org/3';

document.addEventListener('DOMContentLoaded', () => {
  fetchPopularMovies();
  fetchPopularTVShows();

  document.getElementById('search').addEventListener('input', (e) => {
    const query = e.target.value;
    if (query) {
      searchContent(query);
    } else {
      fetchPopularMovies();
      fetchPopularTVShows();
    }
  });
});

async function fetchPopularMovies() {
  const response = await fetch(`${apiUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
  const data = await response.json();
  displayContent(data.results, 'movie');
}

async function fetchPopularTVShows() {
  const response = await fetch(`${apiUrl}/tv/popular?api_key=${apiKey}&language=en-US&page=1`);
  const data = await response.json();
  displayContent(data.results, 'tv');
}

async function searchContent(query) {
  const movieResponse = await fetch(`${apiUrl}/search/movie?api_key=${apiKey}&query=${query}`);
  const tvResponse = await fetch(`${apiUrl}/search/tv?api_key=${apiKey}&query=${query}`);
  const movieData = await movieResponse.json();
  const tvData = await tvResponse.json();
  displayContent(movieData.results, 'movie');
  displayContent(tvData.results, 'tv');
}

function displayContent(items, type) {
  const list = type === 'movie' ? document.getElementById('movie-list') : document.getElementById('tv-show-list');
  list.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('content-item');
    div.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title || item.name}">
      <p>${item.title || item.name}</p>
    `;
    div.addEventListener('click', () => {
      window.location.href = `${type === 'movie' ? 'movie' : 'tv-show'}.html?id=${item.id}`;
    });
    list.appendChild(div);
  });
}
