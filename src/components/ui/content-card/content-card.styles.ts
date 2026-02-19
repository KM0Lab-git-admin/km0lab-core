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

    // max-h: reserva mínima para header/footer reducida para dar más altura al contenido (sin scroll)
    'max-h-[calc(100dvh-clamp(100px,18vh,140px))]',
    'mobile-p:max-h-[calc(100dvh-clamp(90px,16vh,120px))]',
    'tablet:max-h-[calc(100dvh-clamp(120px,20vh,160px))]',
    'desktop:max-h-[calc(100dvh-clamp(140px,24vh,180px))]',
  ].join(' '),
);
