import type { VariantProps } from 'class-variance-authority';
import type React from 'react';

import { cn } from '@/components/ui/primitives/utils';

import { contentShellVariants } from './content-shell.styles';

export interface ContentShellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contentShellVariants> {
  /** Elemento HTML a renderizar (default: 'div'). */
  as?: 'div' | 'main' | 'section';
}

/**
 * Contenedor de contenido principal - Fuente de verdad para spacing.
 *
 * Define CSS Variables (--shell-padding, --shell-gap) que los componentes hijos
 * pueden heredar para mantener consistencia en toda la página.
 *
 * Absorbe los estilos de PageContainer (bg-gradient, font-ui) para reducir anidación.
 */
const ContentShell = ({
  as: Component = 'div',
  background = 'gradient',
  className,
  ...props
}: ContentShellProps) => {
  return (
    <Component
      className={cn(contentShellVariants({ background }), className)}
      {...props}
    />
  );
};

ContentShell.displayName = 'ContentShell';

export { ContentShell };
