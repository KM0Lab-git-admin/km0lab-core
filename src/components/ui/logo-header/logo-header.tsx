import type { VariantProps } from 'class-variance-authority';
import type React from 'react';

import { cn } from '@/components/ui/primitives/utils';

import { logoHeaderVariants, logoVariants } from './logo-header.styles';

export interface LogoHeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof logoHeaderVariants> {
  /** Elemento HTML a renderizar (default: 'div' para compatibilidad con AppHeader). */
  as?: 'header' | 'div' | 'section';
  /** Texto alternativo para el logo (default: 'KMØ LAB®' para compatibilidad con AppHeader). */
  logoAlt?: string;
  /** Escala del header padding (default: 'none' para compatibilidad con AppHeader). */
  scale?: VariantProps<typeof logoHeaderVariants>['scale'];
  /** Escala del logo (default: 'none' para compatibilidad con AppHeader). */
  logoScale?: VariantProps<typeof logoVariants>['scale'];
}

/**
 * Header genérico con logo centrado y padding responsivo.
 * Por defecto se comporta como AppHeader (sin padding, sin escalado).
 * Útil para pantallas que requieren un header simple con logo.
 */
const LogoHeader = ({
  as: Component = 'div',
  scale = 'none',
  logoAlt = 'KMØ LAB®',
  logoScale = 'none',
  className,
  ...props
}: LogoHeaderProps) => {
  return (
    <Component
      className={cn(logoHeaderVariants({ scale }), className)}
      {...props}
    >
      <div
        className={logoVariants({ scale: logoScale })}
        role="img"
        aria-label={logoAlt}
      />
    </Component>
  );
};

LogoHeader.displayName = 'LogoHeader';

export { LogoHeader };

