import type { FC } from 'react';

interface SliderNavigationProps {
  totalSlides: number;
  currentSlide: number;
  onPrevious: () => void;
  onNext: () => void;
  onSlideSelect: (index: number) => void;
  className?: string;
}

const SliderNavigation: FC<SliderNavigationProps> = ({
  totalSlides,
  currentSlide,
  onPrevious,
  onNext,
  onSlideSelect,
  className = '',
}) => {
  const handlePrevious = () => {
    onPrevious();
  };

  const handleNext = () => {
    onNext();
  };

  const handleSlideSelect = (index: number) => {
    onSlideSelect(index);
  };

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} role="navigation" aria-label="Navegación del slider">
      {/* Botón anterior */}
      <button
        onClick={handlePrevious}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handlePrevious();
          }
        }}
        className="flex items-center justify-center w-7 h-7 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-km0-blue-500 focus:ring-offset-2 transition-colors duration-200"
        aria-label="Slide anterior"
        tabIndex={0}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 h-3.5"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Indicadores */}
      <div className="flex items-center gap-1.5" role="tablist" aria-label="Indicadores de slides">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideSelect(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSlideSelect(index);
              }
            }}
            className={`w-7 h-2.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-km0-blue-500 focus:ring-offset-2 ${
              index === currentSlide
                ? 'bg-neutral-900 scale-105'
                : 'bg-neutral-300 hover:bg-neutral-400'
            }`}
            role="tab"
            aria-selected={index === currentSlide}
            aria-label={`Ir al slide ${index + 1}`}
            tabIndex={index === currentSlide ? 0 : -1}
          />
        ))}
      </div>

      {/* Botón siguiente */}
      <button
        onClick={handleNext}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleNext();
          }
        }}
        className="flex items-center justify-center w-7 h-7 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-km0-blue-500 focus:ring-offset-2 transition-colors duration-200"
        aria-label="Slide siguiente"
        tabIndex={0}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 h-3.5"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default SliderNavigation;
