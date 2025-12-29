import { cva } from 'class-variance-authority';

export const heroSlideVariants = cva(
  'flex w-full min-h-0 transition-all',
  {
    variants: {
      layout: {
        /** Stack: Imagen arriba, texto abajo (vertical). */
        stack: 'flex-col items-center gap-4 mobile-p:gap-6 tablet:gap-8',
        /** Side: Horizontal (imagen izquierda, texto derecha). */
        side: 'flex-row items-center gap-3 text-left',
      },
      density: {
        default: '',
        /** Compact: reduce gaps para pantallas cortas. */
        compact: 'gap-2',
      },
    },
    defaultVariants: {
      layout: 'stack',
      density: 'default',
    },
  },
);

export const heroContentVariants = cva(
  'flex flex-1 flex-col min-w-0',
  {
    variants: {
      align: {
        center: 'items-center text-center',
        left: 'items-start text-left',
      },
      layout: {
        stack: 'short-landscape:items-start short-landscape:text-left',
        side: 'items-start text-left',
      },
    },
    defaultVariants: {
      align: 'center',
      layout: 'stack',
    },
  },
);

export const heroTextWrapperVariants = cva('flex flex-col gap-1', {
  variants: {
    density: {
      default: 'mobile-p:gap-2 tablet:gap-4 short-landscape:gap-1',
      compact: 'gap-1 short-landscape:gap-1',
    },
  },
  defaultVariants: {
    density: 'default',
  },
});
