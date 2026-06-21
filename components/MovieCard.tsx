import { Movie } from '../types/movie';
import { IMAGE_BASE_URL } from '../lib/constants';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
  isFavorite: boolean;
  onFavoriteToggle: (e: React.MouseEvent) => void;
  index?: number;
}

export default function MovieCard({ movie, onClick, isFavorite, onFavoriteToggle, index = 0 }: MovieCardProps) {
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const posterUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null;

  return (
    <div
      className="bg-surface rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl group relative border border-[#1E1E2A] animate-fade-in-up"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${movie.title}`}
      style={{
        animationDelay: `${index * 30}ms`,
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="relative aspect-[2/3] bg-surface">
        {posterUrl ? (
          <>
            <img
              src={posterUrl}
              alt={`${movie.title} poster`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-surface">
            <svg className="w-8 h-8 text-mist mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
            <span className="font-body font-medium text-mist text-center px-4 text-sm">{movie.title}</span>
          </div>
        )}
        <button
          onClick={onFavoriteToggle}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center transition-colors duration-150 hover:bg-black/90"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            className={`w-4 h-4 transition-colors duration-150 ${isFavorite ? 'fill-crimson text-crimson' : 'fill-none text-mist hover:text-crimson'}`}
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
      <div className="px-3 py-2.5">
        <h3 className="font-body font-semibold text-snow text-[0.9rem] leading-snug truncate">{movie.title}</h3>
        <div className="flex justify-between items-center mt-1">
          <span className="font-body text-mist text-[0.78rem]">{releaseYear}</span>
          {movie.vote_average > 0 ? (
            <div className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-body font-semibold text-snow text-[0.78rem]">{movie.vote_average.toFixed(1)}</span>
            </div>
          ) : (
            <span className="font-body font-semibold text-mist text-[0.78rem]">N/A</span>
          )}
        </div>
      </div>
    </div>
  );
}
