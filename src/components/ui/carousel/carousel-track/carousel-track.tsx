'use client';

import type { VariantProps } from 'class-variance-authority';
import type React from 'react';

import { cn } from '@/components/ui/primitives/utils';

import { carouselTrackVariants } from './carousel-track.styles';

export type CarouselTrackProps = React.HTMLAttributes<HTMLDivElement>
  & VariantProps<typeof carouselTrackVariants>
  & {
    /** Current slide index (0-based). */
    currentIndex: number;
    /** Drag offset in pixels. */
    dragOffset?: number;
    /** Whether user is dragging (disables animation). */
    isDragging?: boolean;
    /** Additional class names. */
    className?: string;
    /** Slide children. */
    children: React.ReactNode;
  };

/**
 * Horizontal track that holds slides and applies translateX based on index.
 * Animates transitions when not dragging.
 */
const CarouselTrack = ({
  currentIndex,
  dragOffset = 0,
  isDragging = false,
  className,
  children,
  ...props
}: CarouselTrackProps) => {
  const translateX = `calc(-${currentIndex * 100}% + ${dragOffset}px)`;

  return (
    <div
      className={cn(carouselTrackVariants({ animate: !isDragging }), className)}
      style={{ transform: `translateX(${translateX})` }}
      aria-live="polite"
      {...props}
    >
      {children}
    </div>
  );
};

CarouselTrack.displayName = 'CarouselTrack';

export { CarouselTrack };

