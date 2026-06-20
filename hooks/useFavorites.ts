import { useState, useEffect } from 'react';
import { FavoriteMovie } from '../types/movie';

const FAVORITES_KEY = 'movie-finder-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to parse favorites from localStorage', err);
      }
    }
  }, []);

  const saveFavorites = (newFavorites: FavoriteMovie[]) => {
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  };

  const addFavorite = (movie: FavoriteMovie) => {
    const exists = favorites.some((fav) => fav.id === movie.id);
    if (!exists) {
      saveFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (id: number) => {
    saveFavorites(favorites.filter((fav) => fav.id !== id));
  };

  const isFavorite = (id: number) => {
    return favorites.some((fav) => fav.id === id);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
