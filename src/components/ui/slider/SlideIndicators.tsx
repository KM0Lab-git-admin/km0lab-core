'use client';

import { cn } from '@/components/ui/primitives/utils';

type SlideIndicatorsProps = {
  totalSlides: number;
  currentSlide: number;
};

const SlideIndicators = ({ totalSlides, currentSlide }: SlideIndicatorsProps) => {
  return (
    <div
      className={cn('flex items-center', 'gap-1', 'mobile-p:gap-1.5')}
      aria-label="Progreso"
    >
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'rounded-full transition-all duration-200',
            'h-2',
            'mobile-p:h-2.5',
            currentSlide === index
              ? cn('bg-neutral-900', 'w-5', 'mobile-p:w-6')
              : cn('bg-neutral-300', 'w-2', 'mobile-p:w-2.5'),
          )}
        />
      ))}
    </div>
  );
};

export { SlideIndicators };

