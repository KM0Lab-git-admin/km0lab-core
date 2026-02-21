import type { VariantProps } from 'class-variance-authority';

import { cn } from '../primitives/utils';
import { dotVariants, floatingDotsContainerVariants } from './floating-dots.styles';

type DotConfig = {
  size: NonNullable<VariantProps<typeof dotVariants>['size']>;
  position: NonNullable<VariantProps<typeof dotVariants>['position']>;
  delay: NonNullable<VariantProps<typeof dotVariants>['delay']>;
  opacity: string;
};

const dots: DotConfig[] = [
  { size: 'lg', position: 'top-left', delay: 'none', opacity: 'opacity-70' },
  { size: 'sm', position: 'bottom-left', delay: '400', opacity: 'opacity-50' },
  { size: 'xl', position: 'mid-left', delay: 'none', opacity: 'opacity-60' },
  { size: 'sm', position: 'bottom-right', delay: 'none', opacity: 'opacity-40' },
  { size: 'md', position: 'mid-right', delay: '200', opacity: 'opacity-55' },
  { size: 'md', position: 'top-right', delay: 'none', opacity: 'opacity-45' },
];

interface FloatingDotsProps {
  className?: string;
}

export default function FloatingDots({ className }: FloatingDotsProps) {
  return (
    <div className={cn(floatingDotsContainerVariants(), className)}>
      {dots.map((dot) => (
        <div
          key={`${dot.position}-${dot.size}`}
          className={cn(
            dotVariants({ size: dot.size, position: dot.position, delay: dot.delay }),
            dot.opacity,
          )}
        />
      ))}
    </div>
  );
}
