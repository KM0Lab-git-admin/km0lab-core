'use client';

import type { VariantProps } from 'class-variance-authority';
import type React from 'react';

import { MediaFrame } from '@/components/ui/media-frame';
import { cn } from '@/components/ui/primitives/utils';

import {
  heroSlideContentVariants,
  heroSlideSubtitleVariants,
  heroSlideTextContainerVariants,
  heroSlideTitleVariants,
} from './hero-slide.styles';

export type HeroSlideProps = React.HTMLAttributes<HTMLDivElement>
  & VariantProps<typeof heroSlideContentVariants>
  & {
    /** First line of the title. */
    titleLine1: string;
    /** Second line of the title. */
    titleLine2: string;
    /** Subtitle/description text. */
    subtitle: string;
    /** Image source URL. */
    imageSrc: string;
    /** Background color class for image frame. */
    bgColor?: string;
    /** Optional badge text. */
    badgeText?: string;
    /** Size variant for title/subtitle. */
    size?: 'default' | 'compact';
    /** Additional class names. */
    className?: string;
  };

/**
 * Hero slide content with image and title/subtitle.
 * Supports stack (vertical) and side (horizontal) layouts.
 * Layout adapts automatically based on breakpoints.
 */
const HeroSlide = ({
  titleLine1,
  titleLine2,
  subtitle,
  imageSrc,
  bgColor = 'bg-km0-yellow-100',
  badgeText,
  layout = 'side',
  size = 'default',
  className,
  ...props
}: HeroSlideProps) => (
  <>
    {/* Image */}
    <MediaFrame
      src={imageSrc}
      alt={`${titleLine1} ${titleLine2}`}
      bgColor={bgColor}
      badgeText={badgeText}
      layout={layout}
    />

    {/* Text content */}
    <div
      className={cn(heroSlideContentVariants({ layout }), className)}
      {...props}
    >
      <div className={cn(heroSlideTextContainerVariants({ layout }))}>
        <h1 className={cn(heroSlideTitleVariants({ size }))}>
          {titleLine1}
          <br className="mobile-l:hidden laptop-short:hidden" />
          <span className="hidden mobile-l:inline laptop-short:inline"> </span>
          {titleLine2}
        </h1>

        <p className={cn(heroSlideSubtitleVariants({ size }))}>
          {subtitle}
        </p>
      </div>
    </div>
  </>
);

HeroSlide.displayName = 'HeroSlide';

export { HeroSlide };

