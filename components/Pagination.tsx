interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Pagination({ currentPage, totalPages, onPrevious, onNext }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-8 mt-12 mb-12">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="font-body font-semibold text-[0.85rem] text-snow bg-surface hover:bg-surfaceHover border border-rim px-5 py-2.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
        aria-label="Previous page"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>
      <span className="font-body font-medium text-mist text-[0.9rem] px-4">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="font-body font-semibold text-[0.85rem] text-snow bg-surface hover:bg-surfaceHover border border-rim px-5 py-2.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
        aria-label="Next page"
      >
        Next
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
