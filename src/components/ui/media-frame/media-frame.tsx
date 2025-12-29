'use client';

import type { VariantProps } from 'class-variance-authority';
import type React from 'react';

import { cn } from '@/components/ui/primitives/utils';

import {
  mediaFrameBadgeVariants,
  mediaFrameContainerVariants,
  mediaFrameImageVariants,
  mediaFrameInnerVariants,
} from './media-frame.styles';

export type MediaFrameProps = React.HTMLAttributes<HTMLDivElement>
  & VariantProps<typeof mediaFrameContainerVariants>
  & VariantProps<typeof mediaFrameImageVariants>
  & {
    /** Image source URL. */
    src: string;
    /** Image alt text. */
    alt: string;
    /** Background color class (e.g., 'bg-km0-yellow-100'). */
    bgColor?: string;
    /** Optional badge text (e.g., '+ 10 XP'). */
    badgeText?: string;
    /** Badge size variant. */
    badgeSize?: 'sm' | 'md' | 'lg';
    /** Additional class names for container. */
    className?: string;
  };

/**
 * Framed image container with optional XP badge.
 * Used for hero images in slides and cards.
 */
const MediaFrame = ({
  src,
  alt,
  bgColor = 'bg-km0-yellow-100',
  badgeText,
  badgeSize = 'md',
  layout = 'side',
  maxHeight = 'default',
  rounded = 'sm',
  className,
  ...props
}: MediaFrameProps) => (
  <div
    className={cn(mediaFrameContainerVariants({ layout }), bgColor, className)}
    {...props}
  >
    <div className={cn(mediaFrameInnerVariants({ rounded, padding: 'md' }))}>
      <img
        src={src}
        alt={alt}
        className={cn(mediaFrameImageVariants({ rounded, maxHeight }))}
        draggable={false}
      />
    </div>

    {badgeText && (
      <div className={cn(mediaFrameBadgeVariants({ size: badgeSize }))}>
        {badgeText}
      </div>
    )}
  </div>
);

MediaFrame.displayName = 'MediaFrame';

export { MediaFrame };

