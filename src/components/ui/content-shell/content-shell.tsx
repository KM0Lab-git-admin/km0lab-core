import type React from 'react';

import { cn } from '@/components/ui/primitives/utils';

import { contentShellVariants } from './content-shell.styles';

export interface ContentShellProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Elemento HTML a renderizar (default: 'div'). */
  as?: 'div' | 'main' | 'section';
}

/**
 * Contenedor de contenido principal - Fuente de verdad para spacing.
 *
 * Define CSS Variables (--shell-padding, --shell-gap) que los componentes hijos
 * pueden heredar para mantener consistencia en toda la página.
 *
 * El fondo (bg-gradient-white-beige) está en el Layout para cubrir todo el viewport.
 */
const ContentShell = ({
  as: Component = 'div',
  className,
  ...props
}: ContentShellProps) => {
  return (
    <Component
      className={cn(contentShellVariants(), className)}
      {...props}
    />
  );
};

ContentShell.displayName = 'ContentShell';

export { ContentShell };
