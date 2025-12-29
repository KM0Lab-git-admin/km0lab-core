'use client';

import type { VariantProps } from 'class-variance-authority';
import type React from 'react';

import { cn } from '@/components/ui/primitives/utils';

import { carouselSlideVariants } from './carousel-slide.styles';

export type CarouselSlideProps = React.HTMLAttributes<HTMLDivElement>
  & VariantProps<typeof carouselSlideVariants>
  & {
    /** Unique slide identifier for accessibility. */
    slideId?: string;
    /** Whether this slide is currently active. */
    isActive?: boolean;
    /** Additional class names. */
    className?: string;
    /** Slide content. */
    children: React.ReactNode;
  };

/**
 * Individual slide container within the carousel.
 * Supports stack (vertical) and side (horizontal) layouts.
 * The layout automatically adapts based on breakpoints via Tailwind classes.
 */
const CarouselSlide = ({
  layout = 'side',
  slideId,
  isActive = false,
  className,
  children,
  ...props
}: CarouselSlideProps) => (
  <div
    className={cn(carouselSlideVariants({ layout }), className)}
    role="group"
    aria-roledescription="slide"
    aria-label={slideId ? `Slide ${slideId}` : undefined}
    aria-hidden={!isActive}
    {...props}
  >
    {children}
  </div>
);

CarouselSlide.displayName = 'CarouselSlide';

export { CarouselSlide };

