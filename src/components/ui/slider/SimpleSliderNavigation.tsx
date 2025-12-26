'use client';

import { cn } from '@/components/ui/primitives/utils';
import { NavigationArrow } from './NavigationArrow';
import { SlideIndicators } from './SlideIndicators';

type SimpleSliderNavigationProps = {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
};

const SimpleSliderNavigation = ({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
}: SimpleSliderNavigationProps) => {
  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === totalSlides - 1;

  return (
    <div
      className={cn(
        'flex-1 min-w-0 flex items-center justify-center',
        'gap-0.5',
        'mobile-p:gap-1',
      )}
    >
      <NavigationArrow
        direction="prev"
        onClick={onPrev}
        disabled={isFirstSlide}
        ariaLabel="Anterior"
      />

      <SlideIndicators totalSlides={totalSlides} currentSlide={currentSlide} />

      <NavigationArrow
        direction="next"
        onClick={onNext}
        disabled={isLastSlide}
        ariaLabel="Siguiente"
      />
    </div>
  );
};

export { SimpleSliderNavigation };

