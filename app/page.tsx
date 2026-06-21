'use client';

import { useState } from 'react';
import { useMovies } from '../hooks/useMovies';
import { useSearch } from '../hooks/useSearch';
import { useFavorites } from '../hooks/useFavorites';
import { Movie, FavoriteMovie } from '../types/movie';
import MovieGrid from '../components/MovieGrid';
import MovieModal from '../components/MovieModal';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const {
    movies: popularMovies,
    loading: popularLoading,
    error: popularError,
    page: popularPage,
    totalPages: popularTotalPages,
    nextPage: popularNextPage,
    prevPage: popularPrevPage,
    resetPage: popularResetPage,
  } = useMovies();

  const {
    query,
    setQuery,
    movies: searchResults,
    loading: searchLoading,
    error: searchError,
    page: searchPage,
    totalPages: searchTotalPages,
    totalResults,
    nextPage: searchNextPage,
    prevPage: searchPrevPage,
    resetPage: searchResetPage,
  } = useSearch();

  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const isSearchActive = query.trim().length > 0;
  const displayMovies = isSearchActive ? searchResults : popularMovies;
  const displayLoading = isSearchActive ? searchLoading : popularLoading;
  const displayError = isSearchActive ? searchError : popularError;
  const displayPage = isSearchActive ? searchPage : popularPage;
  const displayTotalPages = isSearchActive ? searchTotalPages : popularTotalPages;
  const displayNextPage = isSearchActive ? searchNextPage : popularNextPage;
  const displayPrevPage = isSearchActive ? searchPrevPage : popularPrevPage;

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleFavoriteToggle = (movieId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(movieId)) {
      removeFavorite(movieId);
    } else {
      const movie = displayMovies.find((m) => m.id === movieId);
      if (movie) {
        const favorite: FavoriteMovie = {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
          release_date: movie.release_date,
        };
        addFavorite(favorite);
      }
    }
  };

  const handleModalFavoriteToggle = () => {
    if (selectedMovie) {
      if (isFavorite(selectedMovie.id)) {
        removeFavorite(selectedMovie.id);
      } else {
        const favorite: FavoriteMovie = {
          id: selectedMovie.id,
          title: selectedMovie.title,
          poster_path: selectedMovie.poster_path,
          vote_average: selectedMovie.vote_average,
          release_date: selectedMovie.release_date,
        };
        addFavorite(favorite);
      }
    }
  };

  const handleClearSearch = () => {
    setQuery('');
    popularResetPage();
  };

  const favoritesPage = 1;
  const favoritesTotalPages = Math.ceil(favorites.length / 12) || 1;
  const paginatedFavorites: Movie[] = favorites.slice(0, 12).map((fav) => ({
    ...fav,
    backdrop_path: null,
    overview: '',
    genre_ids: [],
  }));

  return (
    <main className="min-h-screen bg-transparent">
      <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-rim">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-auto sm:h-16 py-3 sm:py-0 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 relative">
          
          <div className="w-full flex items-center justify-between sm:w-auto">
            {/* Left: Circle Logo */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center text-black shrink-0 shadow-sm">
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-black" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="5" fill="currentColor" />
                  <ellipse cx="12" cy="12" rx="9" ry="2.5" transform="rotate(-25 12 12)" />
                </svg>
              </div>
              <span className="font-body font-bold text-white text-[1rem] sm:text-[1.1rem] tracking-tight">Movieletters</span>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex sm:hidden items-center gap-4 h-full">
              <button
                onClick={() => setShowFavorites(false)}
                className={`font-body font-semibold text-[0.88rem] tracking-wide transition-colors h-full py-1 border-b-2 flex items-center ${
                  !showFavorites ? 'text-primary border-primary' : 'text-mist border-transparent hover:text-white'
                }`}
              >
                Browse
              </button>
              <button
                onClick={() => setShowFavorites(true)}
                className={`font-body font-semibold text-[0.88rem] tracking-wide transition-colors h-full py-1 border-b-2 flex items-center ${
                  showFavorites ? 'text-primary border-primary' : 'text-mist border-transparent hover:text-white'
                }`}
              >
                Favorites
              </button>
            </nav>
          </div>

          {/* Desktop Navigation Links (Centered) */}
          <nav className="hidden sm:flex items-center gap-6 sm:gap-8 h-full absolute left-1/2 -translate-x-1/2">
            <button
              onClick={() => setShowFavorites(false)}
              className={`font-body font-semibold text-[0.88rem] tracking-wide transition-colors h-full border-b-2 flex items-center ${
                !showFavorites ? 'text-primary border-primary' : 'text-mist border-transparent hover:text-white'
              }`}
            >
              Browse
            </button>
            <button
              onClick={() => setShowFavorites(true)}
              className={`font-body font-semibold text-[0.88rem] tracking-wide transition-colors h-full border-b-2 flex items-center ${
                showFavorites ? 'text-primary border-primary' : 'text-mist border-transparent hover:text-white'
              }`}
            >
              Favorites
            </button>
          </nav>

          {/* Right: Search Bar */}
          <div className="w-full sm:w-60 md:w-72 shrink-0">
            <SearchBar value={query} onChange={setQuery} placeholder="Search movies..." />
          </div>
        </div>
      </header>

      <div className="pt-6 sm:pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          {!isSearchActive && !showFavorites && (
            <div className="text-center mb-8 sm:mb-12 mt-2 sm:mt-6">
              <p className="font-body text-mist text-[1.1rem] sm:text-xl font-medium tracking-wide">Find films you'll actually want to watch.</p>
            </div>
          )}

          {isSearchActive && (
            <div className="text-center mb-8 sm:mb-12 mt-2 sm:mt-6 font-body text-mist text-[0.88rem]">
              {totalResults} results for "{query}"
            </div>
          )}

          {showFavorites ? (
            <>
              {favorites.length === 0 ? (
                <EmptyState
                  message="Your watchlist is empty."
                  subtext="Save movies you want to watch later."
                  showClearButton={true}
                  onClear={() => setShowFavorites(false)}
                  buttonText="Browse movies"
                  icon="bookmark"
                />
              ) : (
                <>
                  <MovieGrid
                    movies={paginatedFavorites}
                    loading={false}
                    error={null}
                    onMovieClick={handleMovieClick}
                    onFavoriteToggle={handleFavoriteToggle}
                    isFavorite={isFavorite}
                  />
                  {favoritesTotalPages > 1 && (
                    <Pagination
                      currentPage={favoritesPage}
                      totalPages={favoritesTotalPages}
                      onPrevious={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      onNext={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <MovieGrid
                movies={displayMovies}
                loading={displayLoading}
                error={displayError}
                onMovieClick={handleMovieClick}
                onFavoriteToggle={handleFavoriteToggle}
                isFavorite={isFavorite}
                emptyMessage={`No movies found for "${query}"`}
                showClearButton={isSearchActive}
                onClear={handleClearSearch}
              />
              {!displayLoading && !displayError && displayMovies.length > 0 && (
                <Pagination
                  currentPage={displayPage}
                  totalPages={displayTotalPages}
                  onPrevious={() => {
                    displayPrevPage();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onNext={() => {
                    displayNextPage();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>

      {selectedMovie && (
        <MovieModal
          movieId={selectedMovie.id}
          onClose={() => setSelectedMovie(null)}
          isFavorite={isFavorite(selectedMovie.id)}
          onFavoriteToggle={handleModalFavoriteToggle}
        />
      )}
    </main>
  );
}
