import type React from 'react';

import { cn } from '@/components/ui/primitives/utils';

import { contentCardVariants } from './content-card.styles';

export interface ContentCardProps
  extends React.HTMLAttributes<HTMLElement> {
  /** Elemento HTML a renderizar (default: 'section'). */
  as?: 'section' | 'div' | 'article' | 'aside';
}

/**
 * Tarjeta de contenido principal.
 *
 * Hereda spacing de ContentShell via CSS Variables (--shell-padding, --shell-gap).
 * Solo define estilos visuales propios: fondo blanco, sombra, border-radius.
 */
const ContentCard = ({
  as: Component = 'section',
  className,
  ...props
}: ContentCardProps) => {
  return (
    <Component
      className={cn(contentCardVariants(), className)}
      {...props}
    />
  );
};

ContentCard.displayName = 'ContentCard';

export { ContentCard };
