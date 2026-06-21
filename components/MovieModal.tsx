'use client';

import { useEffect, useState } from 'react';
import { MovieDetail } from '../types/movie';
import { fetchMovieDetail } from '../lib/tmdb';
import { BACKDROP_BASE_URL } from '../lib/constants';

interface MovieModalProps {
  movieId: number | null;
  onClose: () => void;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

export default function MovieModal({ movieId, onClose, isFavorite, onFavoriteToggle }: MovieModalProps) {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const detail = await fetchMovieDetail(movieId);
        setMovie(detail);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [movieId]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!movieId) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-surface border border-rim rounded-none w-full h-auto sm:h-fit max-w-none sm:rounded-2xl sm:max-w-[640px] sm:w-[90vw] sm:max-h-[90vh] overflow-y-auto relative animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors text-snow"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {loading ? (
          <div className="px-6 pb-6 space-y-4">
            <div className="aspect-[16/7] bg-ghost rounded-t-[14px]" />
            <div className="h-8 bg-ghost rounded w-3/4 animate-shimmer" style={{
              background: 'linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)',
              backgroundSize: '800px 100%',
            }} />
            <div className="h-4 bg-ghost rounded w-1/2 animate-shimmer" style={{
              background: 'linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)',
              backgroundSize: '800px 100%',
            }} />
            <div className="space-y-2">
              <div className="h-4 bg-ghost rounded animate-shimmer" style={{
                background: 'linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)',
                backgroundSize: '800px 100%',
              }} />
              <div className="h-4 bg-ghost rounded animate-shimmer" style={{
                background: 'linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)',
                backgroundSize: '800px 100%',
              }} />
              <div className="h-4 bg-ghost rounded w-3/4 animate-shimmer" style={{
                background: 'linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)',
                backgroundSize: '800px 100%',
              }} />
            </div>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-crimson mb-4">{error}</p>
            <button
              onClick={() => {
                setLoading(true);
                setError(null);
                fetchMovieDetail(movieId).then(setMovie).catch(setError).finally(() => setLoading(false));
              }}
              className="px-6 py-2 border border-crimson text-crimson rounded-full hover:bg-crimson hover:text-void transition-colors font-body font-semibold text-[0.85rem]"
            >
              Try Again
            </button>
          </div>
        ) : movie ? (
          <>
            <div className="relative aspect-[16/7]">
              {movie.backdrop_path ? (
                <img
                  src={`${BACKDROP_BASE_URL}${movie.backdrop_path}`}
                  alt={`${movie.title} backdrop`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-ghost" />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface" />
            </div>

            <div className="px-6 pb-6">
              <h2 id="modal-title" className="font-body font-bold text-snow text-[1.75rem] leading-tight -mt-8 relative z-10">
                {movie.title}
              </h2>

              <div className="font-body text-mist text-[0.85rem] mt-2 flex flex-wrap gap-2">
                <span>{new Date(movie.release_date).getFullYear()}</span>
                <span>·</span>
                <span>{movie.runtime} min</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="font-body font-medium text-[0.75rem] border border-primary/40 text-primary bg-primary/5 rounded-full px-3 py-0.5"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="mt-5">
                <h3 className="font-body font-semibold text-[0.65rem] uppercase tracking-widest text-mist">Overview</h3>
                <p className="font-body text-mist text-[0.93rem] leading-relaxed mt-2">{movie.overview}</p>
              </div>

              <button
                onClick={onFavoriteToggle}
                className={`w-full h-11 rounded-lg font-body font-semibold text-[0.88rem] flex items-center justify-center gap-2 mt-6 transition-all duration-150 ${
                  isFavorite
                    ? 'bg-crimson/10 border border-crimson text-crimson hover:bg-crimson/20'
                    : 'border border-rim text-snow hover:border-crimson hover:text-crimson'
                }`}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <svg
                  className={`w-4 h-4 ${isFavorite ? 'fill-crimson' : 'fill-none'}`}
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
