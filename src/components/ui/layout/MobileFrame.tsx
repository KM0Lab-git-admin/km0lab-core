import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

import { cn } from '@/components/ui/primitives/utils';

import { mobileFrameVariants } from './mobile-frame.styles';

export type MobileFrameProps = VariantProps<typeof mobileFrameVariants> & {
  /** Contenido del frame. */
  children: ReactNode;
  /** Clases adicionales para personalización. */
  className?: string;
};

/**
 * Frame móvil que simula una ventana de aplicación móvil.
 * Incluye fondo degradado, bordes redondeados y ancho máximo limitado.
 */
export const MobileFrame = ({
  children,
  gap = 'sm',
  padding = 'sm',
  className,
}: MobileFrameProps) => {
  return (
    <div
      className={cn(mobileFrameVariants({ gap, padding }), className)}
    >
      {children}
    </div>
  );
};
