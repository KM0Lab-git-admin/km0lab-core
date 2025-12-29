import type { VariantProps } from 'class-variance-authority';
import type React from 'react';

import { cn } from '@/components/ui/primitives/utils';

import { contentCardVariants } from './content-card.styles';

export interface ContentCardProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof contentCardVariants> {
  /** Elemento HTML a renderizar (default: 'section'). */
  as?: 'section' | 'div' | 'article' | 'aside';
}

/**
 * Componente genérico de tarjeta de contenido con estilos responsivos.
 * Incluye sombra, redondeado, fondo blanco y variantes de escala.
 * Útil para contenedores de contenido principal en diferentes contextos.
 */
const ContentCard = ({
  as: Component = 'section',
  scale = 'md',
  className,
  ...props
}: ContentCardProps) => {
  return (
    <Component
      className={cn(contentCardVariants({ scale }), className)}
      {...props}
    />
  );
};

ContentCard.displayName = 'ContentCard';

export { ContentCard };

