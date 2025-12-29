import type { VariantProps } from 'class-variance-authority';
import type React from 'react';

import { cn } from '@/components/ui/primitives/utils';

import { pageContainerVariants } from './page-container.styles';

export interface PageContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageContainerVariants> {
  /** Elemento HTML a renderizar (default: 'div'). */
  as?: 'div' | 'main' | 'section';
}

/**
 * Contenedor de página genérico con fondo degradado y altura completa.
 * Útil para pantallas completas con fondo degradado blanco-beige.
 */
const PageContainer = ({
  as: Component = 'div',
  className,
  ...props
}: PageContainerProps) => {
  return (
    <Component
      className={cn(pageContainerVariants(), className)}
      {...props}
    />
  );
};

PageContainer.displayName = 'PageContainer';

export { PageContainer };

