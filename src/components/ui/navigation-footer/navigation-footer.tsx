import type { VariantProps } from 'class-variance-authority';
import type React from 'react';

import { cn } from '@/components/ui/primitives/utils';

import { navigationFooterVariants } from './navigation-footer.styles';

export interface NavigationFooterProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navigationFooterVariants> {
  /** Elemento a renderizar en el slot izquierdo. */
  left?: React.ReactNode;
  /** Elemento a renderizar en el slot central. */
  center?: React.ReactNode;
  /** Elemento a renderizar en el slot derecho. */
  right?: React.ReactNode;
}

/**
 * Footer de navegación con tres slots equidistantes.
 * Garantiza el mismo espacio entre left-center y center-right.
 */
const NavigationFooter = ({
  scale = 'md',
  left,
  center,
  right,
  className,
  ...props
}: NavigationFooterProps) => {
  return (
    <footer
      className={cn(navigationFooterVariants({ scale }), className)}
      {...props}
    >
      <div className="shrink-0">{left}</div>
      <div className="shrink-0">{center}</div>
      <div className="shrink-0">{right}</div>
    </footer>
  );
};

NavigationFooter.displayName = 'NavigationFooter';

export { NavigationFooter };

