export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
}

export interface MovieDetail {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genres: Array<{
    id: number;
    name: string;
  }>;
  runtime: number;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface FavoriteMovie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}
