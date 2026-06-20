import { API_BASE_URL } from './constants';
import { Movie, MovieDetail, TMDBResponse } from '../types/movie';

const getApiKey = () => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_TMDB_API_KEY is not set in environment variables');
  }
  return apiKey;
};

export async function fetchPopularMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
  const apiKey = getApiKey();
  const response = await fetch(
    `${API_BASE_URL}/movie/popular?page=${page}&api_key=${apiKey}`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch popular movies: ${response.statusText}`);
  }
  
  return response.json();
}

export async function searchMovies(query: string, page: number = 1): Promise<TMDBResponse<Movie>> {
  const apiKey = getApiKey();
  const response = await fetch(
    `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}&api_key=${apiKey}`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to search movies: ${response.statusText}`);
  }
  
  return response.json();
}

export async function fetchMovieDetail(id: number): Promise<MovieDetail> {
  const apiKey = getApiKey();
  const response = await fetch(
    `${API_BASE_URL}/movie/${id}?api_key=${apiKey}`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch movie detail: ${response.statusText}`);
  }
  
  return response.json();
}
