import type { VariantProps } from 'class-variance-authority';
import type React from 'react';

import { cn } from '@/components/ui/primitives/utils';

import { logoVariants } from './logo.styles';

export interface LogoProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof logoVariants> {
  /** Texto alternativo para el logo */
  alt?: string;
}

/**
 * Componente Logo reutilizable que utiliza el sprite de logos del sistema.
 * Útil para mostrar el logo de KM0 Lab en diferentes contextos.
 */
const Logo = ({
  alt = 'KMØ LAB®',
  scale = 'none',
  context = 'none',
  className,
  ...props
}: LogoProps) => {
  return (
    <div
      className={cn(logoVariants({ scale, context }), className)}
      role="img"
      aria-label={alt}
      {...props}
    />
  );
};

Logo.displayName = 'Logo';

export { Logo };

