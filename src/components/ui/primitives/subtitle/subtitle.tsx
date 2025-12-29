import type { VariantProps } from 'class-variance-authority';
import type React from 'react';

import { cn } from '../utils';
import { subtitleVariants } from './subtitle.styles';

export type SubtitleProps = React.HTMLAttributes<HTMLElement>
  & VariantProps<typeof subtitleVariants>
  & {
    /** HTML tag to render. */
    as?: 'p' | 'span';
    /** Visual size of the subtitle. */
    size?: 'lg' | 'md' | 'sm' | 'xs';
    /** Text alignment. */
    align?: 'left' | 'center';
    /** Color tone. */
    tone?: 'default' | 'muted';
    /** Additional class names. */
    className?: string;
    /** Subtitle content. */
    children: React.ReactNode;
  };

const Subtitle = ({
  as: Component = 'p',
  size = 'md',
  align = 'left',
  tone = 'default',
  className,
  children,
  ...props
}: SubtitleProps) => (
  <Component
    className={cn(subtitleVariants({ size, align, tone }), className)}
    {...props}
  >
    {children}
  </Component>
);

Subtitle.displayName = 'Subtitle';

export { Subtitle };
