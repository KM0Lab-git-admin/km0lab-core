import { cva } from 'class-variance-authority';

export const mediaFrameVariants = cva(
  'relative flex items-center justify-center overflow-hidden border border-black/5 transition-all',
  {
    variants: {
      /**
       * Layout del contenedor:
       * - stack: Ocupa el ancho disponible (default genérico).
       * - side: Pensado para layouts horizontales, ocupa un porcentaje.
       */
      layout: {
        stack: 'w-full',
        side: 'w-2/5 mobile-p:w-full laptop-short:w-[45%]',
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

export const mediaFrameInnerVariants = cva(
  'relative flex h-full w-full items-center justify-center p-2 shadow-inner',
  {
    variants: {
      radius: {
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
      },
    },
    defaultVariants: {
      radius: 'lg',
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
      default: 'max-h-[280px] mobile-p:max-h-[320px] laptop-short:max-h-[220px] desktop:max-h-[400px]',
      full: 'max-h-full',
    },
  },
  defaultVariants: {
    maxHeight: 'default',
  },
});
