'use client';

import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/components/ui/primitives/utils';

import {
  sliderCountActionVariants,
  sliderCountValueVariants,
  sliderCountVariants,
} from './slider-count.styles';

export type SliderCountProps = VariantProps<typeof sliderCountVariants>
  & VariantProps<typeof sliderCountValueVariants>
  & {
    /** Current slide number. */
    current: number;
    /** Total number of slides. */
    total: number;
    /** Optional action label (e.g., Skip). */
    actionLabel?: string;
    /** Optional action handler. */
    onAction?: () => void;
    /** Additional class names. */
    className?: string;
  };

const SliderCount = ({
  current,
  total,
  actionLabel,
  onAction,
  layout = 'default',
  size = 'md',
  className,
}: SliderCountProps) => {
  const safeTotal = Math.max(0, total);
  const safeCurrent = Math.min(Math.max(current, 0), safeTotal);
  const showAction = Boolean(actionLabel);
  const isActionDisabled = !onAction;

  return (
    <div className={cn(sliderCountVariants({ layout }), className)}>
      <div className={sliderCountValueVariants({ size })}>
        {safeCurrent}
        /
        {safeTotal}
      </div>
      {showAction && (
        <button
          type="button"
          onClick={onAction}
          disabled={isActionDisabled}
          aria-label={actionLabel}
          className={sliderCountActionVariants({ size })}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

SliderCount.displayName = 'SliderCount';

export { SliderCount };
