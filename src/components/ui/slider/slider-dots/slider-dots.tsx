'use client';

import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/components/ui/primitives/utils';

import { sliderDotsContainerVariants, sliderDotVariants } from './slider-dots.styles';

export type SliderDotsProps = VariantProps<typeof sliderDotsContainerVariants>
  & {
    /** Total number of dots. */
    total: number;
    /** Active dot index (0-based). */
    current: number;
    /** Tone for dots. */
    tone?: 'default' | 'brand';
    /** Callback when a dot is selected. */
    onSelect?: (index: number) => void;
    /** Accessible label for the dots group. */
    ariaLabel?: string;
    /** Additional class names for the container. */
    className?: string;
  };

const SliderDots = ({
  total,
  current,
  tone = 'default',
  size = 'md',
  onSelect,
  ariaLabel,
  className,
}: SliderDotsProps) => {
  const safeTotal = Math.max(0, total);
  if (safeTotal === 0) return null;

  const lastIndex = Math.max(safeTotal - 1, 0);
  const safeCurrent = Math.min(Math.max(current, 0), lastIndex);
  const isInteractive = typeof onSelect === 'function';
  const label = ariaLabel ?? (isInteractive ? 'Slide selection' : 'Progreso');

  return (
    <div
      className={cn(sliderDotsContainerVariants({ size }), className)}
      role={isInteractive ? 'tablist' : undefined}
      aria-label={label}
    >
      {Array.from({ length: safeTotal }).map((_, index) => {
        const isCurrent = index === safeCurrent;
        const dotClassName = sliderDotVariants({
          size,
          tone,
          current: isCurrent,
          interactive: isInteractive,
        });

        if (!isInteractive) {
          return (
            <span
              key={index}
              className={dotClassName}
              aria-current={isCurrent ? 'step' : undefined}
            />
          );
        }

        return (
          <button
            key={index}
            type="button"
            className={dotClassName}
            onClick={() => onSelect(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={isCurrent}
            role="tab"
            tabIndex={isCurrent ? 0 : -1}
          />
        );
      })}
    </div>
  );
};

SliderDots.displayName = 'SliderDots';

export { SliderDots };
