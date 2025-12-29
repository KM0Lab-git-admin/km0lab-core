import type { VariantProps } from 'class-variance-authority';
import type React from 'react';

import { cn } from '../utils';
import { titleVariants } from './title.styles';

export type TitleProps = React.HTMLAttributes<HTMLHeadingElement>
  & VariantProps<typeof titleVariants>
  & {
    /** HTML heading tag to render. */
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    /** Visual size of the title. */
    size?: 'hero' | 'heroCompact' | 'h1' | 'h2' | 'h3' | 'xl' | 'lg' | 'md' | 'sm';
    /** Text alignment. */
    align?: 'left' | 'center';
    /** Color tone. */
    tone?: 'default' | 'muted' | 'brand';
    /** Enable uppercase styling. */
    uppercase?: boolean;
    /** Additional class names. */
    className?: string;
    /** Title content. */
    children: React.ReactNode;
  };

const Title = ({
  as: Component = 'h1',
  size = 'h1',
  align = 'left',
  tone = 'default',
  uppercase = false,
  className,
  children,
  ...props
}: TitleProps) => (
  <Component
    className={cn(titleVariants({ size, align, tone, uppercase }), className)}
    {...props}
  >
    {children}
  </Component>
);

Title.displayName = 'Title';

export { Title };
