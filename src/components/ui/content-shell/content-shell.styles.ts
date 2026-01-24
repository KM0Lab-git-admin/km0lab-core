import { cva } from 'class-variance-authority';

/**
 * ContentShell - Fuente de verdad para spacing por breakpoint.
 *
 * Define CSS Variables que los componentes hijos pueden heredar:
 * - --shell-padding: padding del contenedor
 * - --shell-gap: gap entre elementos
 *
 * Los hijos pueden usar: p-[var(--shell-padding)], gap-[var(--shell-gap)]
 */
export const contentShellVariants = cva(
  [
    // Layout base
    'flex-1 min-h-0 flex flex-col items-center justify-start w-full overflow-hidden',
    'max-w-[570px] mx-auto',

    // === CSS VARIABLES - FUENTE DE VERDAD PARA SPACING ===
    // Base (xs/mobile pequeño)
    '[--shell-padding:12px]',
    '[--shell-gap:8px]',

    // mobile-p (480px+)
    'mobile-p:[--shell-padding:16px]',
    'mobile-p:[--shell-gap:12px]',

    // tablet (768px+)
    'tablet:[--shell-padding:24px]',
    'tablet:[--shell-gap:16px]',

    // desktop (1280px+)
    'desktop:[--shell-padding:32px]',
    'desktop:[--shell-gap:24px]',

    // Aplicar las variables
    'p-[var(--shell-padding)]',
    'gap-[var(--shell-gap)]',

    // === ESTILOS VISUALES (absorbidos de PageContainer) ===
    'bg-gradient-white-beige',
    'font-ui',
  ].join(' '),
  {
    variants: {
      /**
       * Variante de fondo - permite diferentes fondos por página.
       * Por defecto usa bg-gradient-white-beige.
       */
      background: {
        gradient: '', // default, ya está en base
        none: '!bg-transparent',
      },
    },
    defaultVariants: {
      background: 'gradient',
    },
  },
);
