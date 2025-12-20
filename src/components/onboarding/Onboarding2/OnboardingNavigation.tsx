'use client';

import { cn } from '@/components/ui/utils';
import { NavigationArrow } from './NavigationArrow';
import { SlideIndicators } from './SlideIndicators';

type OnboardingNavigationProps = {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
};

const OnboardingNavigation = ({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
}: OnboardingNavigationProps) => {
  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === totalSlides - 1;

  return (
    <div
      className={cn(
        'flex-1 min-w-0 flex items-center justify-center',
        'gap-1',
        'h520:gap-0.5',
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

export { OnboardingNavigation };

