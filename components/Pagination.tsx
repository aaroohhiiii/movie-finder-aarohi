interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Pagination({ currentPage, totalPages, onPrevious, onNext }: PaginationProps) {
  const cappedTotalPages = Math.min(totalPages, 20);

  return (
    <div className="flex items-center justify-center gap-8 mt-12 mb-12">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="font-body font-semibold text-[0.9rem] text-snow hover:text-primary disabled:opacity-30 disabled:hover:text-snow disabled:cursor-not-allowed transition-all duration-200 flex items-center"
        aria-label="Previous page"
      >
        ← Previous
      </button>
      <span className="font-body font-medium text-mist text-[0.9rem] px-4">
        Page {currentPage} of {cappedTotalPages}
      </span>
      <button
        onClick={onNext}
        disabled={currentPage === cappedTotalPages}
        className="font-body font-semibold text-[0.9rem] text-snow hover:text-primary disabled:opacity-30 disabled:hover:text-snow disabled:cursor-not-allowed transition-all duration-200 flex items-center"
        aria-label="Next page"
      >
        Next →
      </button>
    </div>
  );
}
