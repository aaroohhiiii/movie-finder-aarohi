import { Movie } from '../types/movie';
import MovieCard from './MovieCard';
import SkeletonCard from './SkeletonCard';
import EmptyState from './EmptyState';

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  onMovieClick: (movie: Movie) => void;
  onFavoriteToggle: (movieId: number, e: React.MouseEvent) => void;
  isFavorite: (id: number) => boolean;
  emptyMessage?: string;
  showClearButton?: boolean;
  onClear?: () => void;
}

export default function MovieGrid({
  movies,
  loading,
  error,
  onMovieClick,
  onFavoriteToggle,
  isFavorite,
  emptyMessage = 'No movies found',
  showClearButton,
  onClear,
}: MovieGridProps) {
  if (error) {
    return (
      <EmptyState
        message="Something went wrong."
        subtext="We couldn't load movies right now."
        showClearButton={true}
        onClear={() => window.location.reload()}
        buttonText="Try again"
        icon="warning"
      />
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <EmptyState
        message={emptyMessage}
        subtext="Try a different title or clear your search."
        showClearButton={showClearButton}
        onClear={onClear}
        buttonText="Clear search"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => onMovieClick(movie)}
          isFavorite={isFavorite(movie.id)}
          onFavoriteToggle={(e) => onFavoriteToggle(movie.id, e)}
          index={index}
        />
      ))}
    </div>
  );
}
