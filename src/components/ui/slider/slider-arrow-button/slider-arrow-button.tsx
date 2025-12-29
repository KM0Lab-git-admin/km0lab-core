'use client';

import type React from 'react';
import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/components/ui/primitives/utils';

import { sliderArrowButtonVariants, sliderArrowIconVariants } from './slider-arrow-button.styles';

export type SliderArrowButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
  & VariantProps<typeof sliderArrowButtonVariants>
  & {
    /** Direction of the arrow icon. */
    direction: 'prev' | 'next';
    /** Accessible label for screen readers. */
    ariaLabel: string;
  };

const SliderArrowButton = ({
  direction,
  ariaLabel,
  size = 'md',
  variant = 'ghost',
  disabled = false,
  className,
  type = 'button',
  ...props
}: SliderArrowButtonProps) => {
  const path = direction === 'prev' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6';

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      className={cn(sliderArrowButtonVariants({ size, variant, disabled }), className)}
      {...props}
    >
      <svg
        className={sliderArrowIconVariants({ size })}
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={path} />
      </svg>
    </button>
  );
};

SliderArrowButton.displayName = 'SliderArrowButton';

export { SliderArrowButton };
