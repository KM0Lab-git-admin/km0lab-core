'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export type UseCarouselOptions = {
  /** Total number of slides. */
  totalSlides: number;
  /** Initial slide index (default: 0). */
  initialIndex?: number;
  /** Maximum drag distance in pixels (default: 100). */
  maxDrag?: number;
  /** Threshold to trigger slide change (default: 50). */
  threshold?: number;
};

export type UseCarouselReturn = {
  /** Current slide index. */
  currentIndex: number;
  /** Current drag offset in pixels. */
  dragOffset: number;
  /** Whether user is currently dragging. */
  isDragging: boolean;
  /** Go to next slide. */
  next: () => void;
  /** Go to previous slide. */
  prev: () => void;
  /** Go to specific slide index. */
  goTo: (index: number) => void;
  /** Skip to last slide. */
  skipToEnd: () => void;
  /** Whether on first slide. */
  isFirst: boolean;
  /** Whether on last slide. */
  isLast: boolean;
  /** Touch start handler. */
  handleTouchStart: (e: React.TouchEvent) => void;
  /** Touch move handler. */
  handleTouchMove: (e: React.TouchEvent) => void;
  /** Touch end handler. */
  handleTouchEnd: () => void;
  /** Mouse down handler. */
  handleMouseDown: (e: React.MouseEvent) => void;
};

/**
 * Generic carousel hook for managing slide navigation and drag/swipe gestures.
 * Encapsulates all carousel state and event handling logic.
 */
export const useCarousel = ({
  totalSlides,
  initialIndex = 0,
  maxDrag = 100,
  threshold = 50,
}: UseCarouselOptions): UseCarouselReturn => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const touchStartX = useRef<number>(0);
  const mouseStartX = useRef<number>(0);
  const currentIndexRef = useRef(currentIndex);
  const dragOffsetRef = useRef(0);

  const lastIndex = Math.max(totalSlides - 1, 0);
  const safeIndex = Math.min(Math.max(currentIndex, 0), lastIndex);

  // Keep ref in sync
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const next = useCallback(() => {
    if (currentIndexRef.current < lastIndex) {
      setCurrentIndex((prev) => {
        const nextIdx = prev + 1;
        currentIndexRef.current = nextIdx;
        return nextIdx;
      });
    }
  }, [lastIndex]);

  const prev = useCallback(() => {
    if (currentIndexRef.current > 0) {
      setCurrentIndex((prev) => {
        const nextIdx = prev - 1;
        currentIndexRef.current = nextIdx;
        return nextIdx;
      });
    }
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const clampedIndex = Math.min(Math.max(index, 0), lastIndex);
      setCurrentIndex(clampedIndex);
      currentIndexRef.current = clampedIndex;
    },
    [lastIndex],
  );

  const skipToEnd = useCallback(() => {
    setCurrentIndex(lastIndex);
    currentIndexRef.current = lastIndex;
  }, [lastIndex]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? 0;
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      const currentX = e.touches[0]?.clientX ?? 0;
      const diff = currentX - touchStartX.current;
      const clampedDiff = Math.max(-maxDrag, Math.min(maxDrag, diff));
      dragOffsetRef.current = clampedDiff;
      setDragOffset(clampedDiff);
    },
    [isDragging, maxDrag],
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    const finalOffset = dragOffsetRef.current;

    if (finalOffset < -threshold && currentIndexRef.current < lastIndex) {
      next();
    } else if (finalOffset > threshold && currentIndexRef.current > 0) {
      prev();
    }

    setDragOffset(0);
    dragOffsetRef.current = 0;
  }, [threshold, lastIndex, next, prev]);

  // Mouse handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    mouseStartX.current = e.clientX;
    setIsDragging(true);
  }, []);

  // Global mouse move/up listeners
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const diff = currentX - mouseStartX.current;
      const clampedDiff = Math.max(-maxDrag, Math.min(maxDrag, diff));
      dragOffsetRef.current = clampedDiff;
      setDragOffset(clampedDiff);
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      const finalOffset = dragOffsetRef.current;

      if (finalOffset < -threshold && currentIndexRef.current < lastIndex) {
        next();
      } else if (finalOffset > threshold && currentIndexRef.current > 0) {
        prev();
      }

      setDragOffset(0);
      dragOffsetRef.current = 0;
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, maxDrag, threshold, lastIndex, next, prev]);

  return {
    currentIndex: safeIndex,
    dragOffset,
    isDragging,
    next,
    prev,
    goTo,
    skipToEnd,
    isFirst: safeIndex === 0,
    isLast: safeIndex === lastIndex,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
  };
};

