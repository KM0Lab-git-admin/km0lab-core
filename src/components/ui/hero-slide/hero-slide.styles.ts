import { cva } from 'class-variance-authority';

export const heroSlideVariants = cva(
  'flex w-full flex-col items-center transition-all',
  {
    variants: {
      layout: {
        /**
         * Stack: Imagen arriba, texto abajo.
         * En short-landscape (667x375, 1280x550) cambia a horizontal por CSS.
         * NO cambia en desktop normal (1440x900, 1920x1080).
         */
        stack: [
          'gap-4 mobile-p:gap-6 tablet:gap-8',
          'short-landscape:flex-row short-landscape:items-center short-landscape:gap-4 short-landscape:text-left',
        ].join(' '),
        /** Side: Siempre horizontal (imagen izquierda, texto derecha). */
        side: 'flex-row items-start gap-4 mobile-p:gap-6 text-left',
      },
      density: {
        default: 'mobile-p:gap-6 tablet:gap-8 short-landscape:gap-4',
        compact: 'gap-2 mobile-p:gap-3 short-landscape:gap-3',
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
