type ProgressIndicatorProps = {
  total: number;
  current: number;
  onPrevious?: () => void;
  onNext?: () => void;
  showChevrons?: boolean;
  className?: string;
};

export const ProgressIndicator = ({
  total,
  current,
  onPrevious,
  onNext,
  showChevrons = true,
  className = '',
}: ProgressIndicatorProps) => {
  return (
    <div className={`h-12 inline-flex justify-center items-center gap-2 ${className}`}>
      {/* Chevron Left */}
      {showChevrons && (
        <button
          onClick={onPrevious}
          disabled={current === 0}
          className="w-4 h-4 relative overflow-hidden disabled:opacity-30"
          aria-label="Previous"
        >
          <div className="w-1 h-2 left-[5.33px] top-[4px] absolute outline outline-2 outline-offset-[-1px] outline-neutral-900"></div>
        </button>
      )}

      {/* Progress Bars */}
      {Array.from({ length: total }).map((_, idx) => (
        <div key={idx} className="w-4 h-1 relative">
          <div
            className={`w-4 h-1 left-0 top-0 absolute rounded-sm ${
              idx === current ? 'bg-neutral-900' : 'bg-zinc-400'
            }`}
          >
          </div>
        </div>
      ))}

      {/* Chevron Right */}
      {showChevrons && (
        <button
          onClick={onNext}
          disabled={current === total - 1}
          className="w-4 h-4 relative overflow-hidden disabled:opacity-30"
          aria-label="Next"
        >
          <div className="w-1 h-2 left-[6.67px] top-[4px] absolute outline outline-2 outline-offset-[-1px] outline-neutral-900"></div>
        </button>
      )}
    </div>
  );
};
