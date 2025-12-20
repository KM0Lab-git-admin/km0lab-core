'use client';

import { cn } from '@/components/ui/utils';

type SlideIndicatorsProps = {
  totalSlides: number;
  currentSlide: number;
};

const SlideIndicators = ({ totalSlides, currentSlide }: SlideIndicatorsProps) => {
  return (
    <div
      className={cn('flex items-center', 'gap-1.5', 'h700:gap-1', 'h520:gap-1')}
      aria-label="Progreso"
    >
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'rounded-full transition-all duration-200',
            'h-2.5',
            'h700:h-2',
            'h520:h-2',
            currentSlide === index
              ? cn('bg-neutral-900', 'w-6', 'h700:w-5', 'h520:w-5')
              : cn('bg-neutral-300', 'w-2.5', 'h700:w-2', 'h520:w-2'),
          )}
        />
      ))}
    </div>
  );
};

export { SlideIndicators };

