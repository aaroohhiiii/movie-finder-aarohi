# Movie Finder

A cinematic movie discovery app built with Next.js 14 and the TMDB API. Browse popular movies, search for your favorites, and save them to your personal collection.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: TMDB (The Movie Database)
- **State Management**: React Hooks
- **Storage**: localStorage for favorites

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A TMDB API key (free from [themoviedb.org](https://themoviedb.org))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd movie-finder-aarohi
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your TMDB API key:
```env
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Source

This app uses the [TMDB API](https://themoviedb.org) for movie data.

## Features

- **Browse**: Discover popular movies with a responsive grid layout
- **Search**: Find movies with real-time search (debounced at 300ms)
- **Detail View**: View movie details in a modal overlay with backdrop, genres, and overview
- **Favorites**: Save movies to favorites with localStorage persistence
- **Pagination**: Navigate through results with manual pagination (12 movies per page)

## Live Demo

https://movie-finder-aarohi.vercel.app
