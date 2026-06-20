interface EmptyStateProps {
  message: string;
  subtext?: string;
  showClearButton?: boolean;
  onClear?: () => void;
  buttonText?: string;
  icon?: 'film' | 'bookmark' | 'warning';
}

export default function EmptyState({ message, subtext, showClearButton, onClear, buttonText, icon = 'film' }: EmptyStateProps) {
  const getIcon = () => {
    switch (icon) {
      case 'bookmark':
        return (
          <svg className="w-12 h-12 text-mist" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-12 h-12 text-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return (
          <svg className="w-12 h-12 text-mist" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-12 h-12 mb-6 flex items-center justify-center">
        {getIcon()}
      </div>
      <p className="font-body font-semibold text-snow text-base text-center mb-2">{message}</p>
      {subtext && (
        <p className="font-body text-mist text-[0.88rem] text-center max-w-md mb-6">{subtext}</p>
      )}
      {showClearButton && onClear && (
        <button
          onClick={onClear}
          className="px-6 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-void transition-colors font-body font-semibold text-[0.85rem]"
        >
          {buttonText || 'Clear search'}
        </button>
      )}
    </div>
  );
}
