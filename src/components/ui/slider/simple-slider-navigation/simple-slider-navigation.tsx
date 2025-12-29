'use client';

import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/components/ui/primitives/utils';

import { SliderArrowButton } from '../slider-arrow-button';
import { SliderDots } from '../slider-dots';
import { simpleSliderNavigationVariants } from './simple-slider-navigation.styles';

export type SimpleSliderNavigationProps = VariantProps<typeof simpleSliderNavigationVariants>
  & {
    /** Current slide index (0-based). */
    currentSlide: number;
    /** Total number of slides. */
    totalSlides: number;
    /** Handler for the previous action. */
    onPrev: () => void;
    /** Handler for the next action. */
    onNext: () => void;
    /** Additional class names. */
    className?: string;
    /** Toggle dot indicators. */
    showDots?: boolean;
    /** Toggle arrow buttons. */
    showArrows?: boolean;
    /** Force disable the previous arrow. */
    disabledPrev?: boolean;
    /** Force disable the next arrow. */
    disabledNext?: boolean;
    /** Optional dot selection handler. */
    onDotSelect?: (index: number) => void;
    /** Arrow visual variant. */
    arrowVariant?: 'ghost' | 'solid';
    /** Dots color tone. */
    dotsTone?: 'default' | 'brand';
  };

const SimpleSliderNavigation = ({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  className,
  layout = 'default',
  showDots = true,
  showArrows = true,
  disabledPrev,
  disabledNext,
  onDotSelect,
  arrowVariant = 'ghost',
  dotsTone = 'default',
}: SimpleSliderNavigationProps) => {
  const safeTotal = Math.max(0, totalSlides);
  const lastIndex = Math.max(safeTotal - 1, 0);
  const safeCurrent = Math.min(Math.max(currentSlide, 0), lastIndex);
  const isPrevDisabled = disabledPrev ?? safeCurrent <= 0;
  const isNextDisabled = disabledNext ?? safeCurrent >= lastIndex;
  const arrowSize = arrowVariant === 'solid' ? 'sm' : 'md';
  const dotsSize = 'md';

  return (
    <div
      className={cn(simpleSliderNavigationVariants({ layout }), className)}
      role="navigation"
      aria-label="Slider navigation"
    >
      {showArrows && (
        <SliderArrowButton
          direction="prev"
          onClick={onPrev}
          disabled={isPrevDisabled}
          ariaLabel="Anterior"
          size={arrowSize}
          variant={arrowVariant}
        />
      )}

      {showDots && (
        <SliderDots
          total={safeTotal}
          current={safeCurrent}
          size={dotsSize}
          tone={dotsTone}
          onSelect={onDotSelect}
        />
      )}

      {showArrows && (
        <SliderArrowButton
          direction="next"
          onClick={onNext}
          disabled={isNextDisabled}
          ariaLabel="Siguiente"
          size={arrowSize}
          variant={arrowVariant}
        />
      )}
    </div>
  );
};

SimpleSliderNavigation.displayName = 'SimpleSliderNavigation';

export { SimpleSliderNavigation };
