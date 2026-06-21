interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Search movies, directors, genres...' }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 px-4 pl-10 pr-10 bg-surface border border-[#2A2A3A] rounded-full text-snow placeholder-mist focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 text-sm"
        aria-label="Search movies"
      />
      <svg
        className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-mist"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-mist hover:text-snow transition-colors"
          aria-label="Clear search"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
