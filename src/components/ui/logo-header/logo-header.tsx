import type { VariantProps } from 'class-variance-authority';
import type React from 'react';

import { Logo } from '@/components/ui/logo';
import { cn } from '@/components/ui/primitives/utils';

import { logoHeaderVariants } from './logo-header.styles';

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
  logoScale?: 'none' | 'sm' | 'md' | 'lg';
  /** Elemento a mostrar a la izquierda del logo (ej: botón atrás) */
  leftAction?: React.ReactNode;
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
  leftAction,
  className,
  ...props
}: LogoHeaderProps) => {
  return (
    <Component
      className={cn(
        logoHeaderVariants({ scale }),
        leftAction ? 'relative !justify-between' : '',
        className
      )}
      {...props}
    >
      {leftAction && (
        <div className="flex-shrink-0">
          {leftAction}
        </div>
      )}
      <Logo
        scale={logoScale}
        alt={logoAlt}
        className={leftAction ? 'absolute left-1/2 -translate-x-1/2' : undefined}
      />
      {leftAction && <div className="flex-shrink-0 w-9" />}
    </Component>
  );
};

LogoHeader.displayName = 'LogoHeader';

export { LogoHeader };

