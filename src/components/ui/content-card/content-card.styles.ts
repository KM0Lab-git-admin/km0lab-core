import { cva } from 'class-variance-authority';

/**
 * ContentCard - Tarjeta de contenido principal.
 *
 * Hereda las CSS Variables de ContentShell:
 * - p-[var(--shell-padding)] para padding consistente
 * - gap-[var(--shell-gap)] para gap consistente
 *
 * Solo define estilos visuales propios (bg, shadow, radius) y max-h específico.
 */
export const contentCardVariants = cva(
  [
    // Layout
    'w-full flex flex-col flex-1 min-h-0 overflow-hidden',

    // Estilos visuales (propios de ContentCard)
    'rounded-xl bg-white km0-card-shadow',

    // Spacing - hereda de ContentShell via CSS Variables
    'p-[var(--shell-padding)]',
    'gap-[var(--shell-gap)]',

    // max-h específico de ContentCard (reserva espacio para header + footer)
    'max-h-[calc(100dvh-clamp(160px,22vh,200px))]',
    'mobile-p:max-h-[calc(100dvh-clamp(150px,20vh,180px))]',
    'tablet:max-h-[calc(100dvh-clamp(180px,25vh,220px))]',
    'desktop:max-h-[calc(100dvh-clamp(200px,28vh,240px))]',
  ].join(' '),
);
