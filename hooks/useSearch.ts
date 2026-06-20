import { useState, useEffect } from 'react';
import { searchMovies } from '../lib/tmdb';
import { Movie, TMDBResponse } from '../types/movie';
import { RESULTS_PER_PAGE } from '../lib/constants';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        performSearch(query, 1);
      } else {
        setMovies([]);
        setTotalResults(0);
        setTotalPages(1);
        setPage(1);
        setLoading(false);
        setError(null);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const performSearch = async (searchQuery: string, pageNum: number) => {
    setLoading(true);
    setError(null);
    try {
      const data: TMDBResponse<Movie> = await searchMovies(searchQuery, pageNum);
      const slicedMovies = data.results.slice(0, RESULTS_PER_PAGE);
      setMovies(slicedMovies);
      setTotalPages(Math.min(data.total_pages, 500));
      setTotalResults(data.total_results);
      setPage(pageNum);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search movies');
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => {
    if (page < totalPages) {
      performSearch(query, page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      performSearch(query, page - 1);
    }
  };

  const resetPage = () => {
    if (query.trim()) {
      performSearch(query, 1);
    }
  };

  return {
    query,
    setQuery,
    movies,
    loading,
    error,
    page,
    totalPages,
    totalResults,
    nextPage,
    prevPage,
    resetPage,
    retry: () => performSearch(query, page),
  };
}
