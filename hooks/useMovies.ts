import { useState, useEffect } from 'react';
import { fetchPopularMovies } from '../lib/tmdb';
import { Movie, TMDBResponse } from '../types/movie';
import { RESULTS_PER_PAGE } from '../lib/constants';

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (pageNum: number) => {
    setLoading(true);
    setError(null);
    try {
      const data: TMDBResponse<Movie> = await fetchPopularMovies(pageNum);
      const slicedMovies = data.results.slice(0, RESULTS_PER_PAGE);
      setMovies(slicedMovies);
      setTotalPages(Math.min(data.total_pages, 500));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const resetPage = () => {
    setPage(1);
  };

  return {
    movies,
    loading,
    error,
    page,
    totalPages,
    nextPage,
    prevPage,
    resetPage,
    retry: () => fetchMovies(page),
  };
}
