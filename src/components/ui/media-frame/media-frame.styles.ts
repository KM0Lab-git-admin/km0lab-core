import { cva } from 'class-variance-authority';

/**
 * MediaFrame - Contenedor de imagen simplificado.
 * Fusiona los estilos de mediaFrameInnerVariants para reducir anidación DOM.
 */
export const mediaFrameVariants = cva(
  // Fusionado: border, overflow, position + padding y shadow-inner de Inner
  'relative flex items-center justify-center overflow-hidden border border-black/5 transition-all p-2 shadow-inner',
  {
    variants: {
      layout: {
        stack: 'w-full',
        side: 'w-[40%] min-w-[180px] max-w-[280px] shrink-0',
      },
      tone: {
        default: 'bg-white shadow-sm',
        soft: 'bg-neutral-50/50',
      },
      radius: {
        md: 'rounded-lg',
        lg: 'rounded-xl',
        xl: 'rounded-2xl',
      },
      shadow: {
        none: 'shadow-none',
        sm: 'shadow-sm',
        md: 'shadow-md',
      },
    },
    defaultVariants: {
      layout: 'stack',
      tone: 'default',
      radius: 'lg',
      shadow: 'sm',
    },
  },
);

export const badgeVariants = cva(
  'absolute z-10 flex items-center justify-center bg-km0-coral-400 font-bold text-white shadow-md transition-all',
  {
    variants: {
      position: {
        'top-left': 'left-2 top-2',
        'top-right': 'right-2 top-2',
        'bottom-left': 'bottom-2 left-2',
        'bottom-right': 'bottom-2 right-2',
      },
      size: {
        default: 'px-3 py-1 text-xs mobile-p:text-sm laptop-short:px-2 laptop-short:py-0.5 laptop-short:text-[10px]',
      },
    },
    defaultVariants: {
      position: 'bottom-left',
      size: 'default',
    },
  },
);

export const imageVariants = cva('h-full w-full object-contain', {
  variants: {
    maxHeight: {
      default: [
        'max-h-[clamp(140px,22dvh,260px)]',
        'portrait:max-h-[clamp(160px,25dvh,300px)]',
        'landscape:max-h-[clamp(140px,22dvh,260px)]',
        'tablet:max-h-[clamp(220px,32dvh,380px)]',
        'desktop:max-h-[clamp(300px,42dvh,480px)]',
      ].join(' '),
      compact: [
        'max-h-[clamp(100px,18dvh,200px)]',
        'portrait:max-h-[clamp(120px,20dvh,220px)]',
        'landscape:max-h-[clamp(100px,18dvh,180px)]',
      ].join(' '),
      full: 'max-h-full',
    },
  },
  defaultVariants: {
    maxHeight: 'default',
  },
});
