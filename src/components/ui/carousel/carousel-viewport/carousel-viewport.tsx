'use client';

import type { VariantProps } from 'class-variance-authority';
import type React from 'react';

import { cn } from '@/components/ui/primitives/utils';

import { carouselViewportVariants } from './carousel-viewport.styles';

export type CarouselViewportProps = React.HTMLAttributes<HTMLDivElement>
  & VariantProps<typeof carouselViewportVariants>
  & {
    /** Touch/mouse event handlers from useCarousel. */
    onTouchStart?: React.TouchEventHandler<HTMLDivElement>;
    onTouchMove?: React.TouchEventHandler<HTMLDivElement>;
    onTouchEnd?: React.TouchEventHandler<HTMLDivElement>;
    onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
    /** Accessible label for the carousel region. */
    ariaLabel?: string;
    /** Additional class names. */
    className?: string;
    /** Carousel slide content. */
    children: React.ReactNode;
  };

/**
 * Container that clips the carousel track and handles drag gestures.
 * Wraps CarouselTrack and provides overflow hidden + cursor styling.
 */
const CarouselViewport = ({
  fullHeight = true,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onMouseDown,
  ariaLabel = 'Carousel',
  className,
  children,
  ...props
}: CarouselViewportProps) => (
  <div
    className={cn(carouselViewportVariants({ fullHeight }), className)}
    onTouchStart={onTouchStart}
    onTouchMove={onTouchMove}
    onTouchEnd={onTouchEnd}
    onMouseDown={onMouseDown}
    role="region"
    aria-label={ariaLabel}
    aria-roledescription="carousel"
    {...props}
  >
    {children}
  </div>
);

CarouselViewport.displayName = 'CarouselViewport';

export { CarouselViewport };

