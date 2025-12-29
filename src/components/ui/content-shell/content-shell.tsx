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
 * Contenedor de contenido con padding y gap responsivos.
 * Incluye variantes de escala para diferentes contextos de uso.
 */
const ContentShell = ({
  as: Component = 'div',
  scale = 'md',
  className,
  ...props
}: ContentShellProps) => {
  return (
    <Component
      className={cn(contentShellVariants({ scale }), className)}
      {...props}
    />
  );
};

ContentShell.displayName = 'ContentShell';

export { ContentShell };

