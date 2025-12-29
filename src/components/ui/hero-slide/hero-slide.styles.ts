import { cva } from 'class-variance-authority';

export const heroSlideVariants = cva(
  'flex w-full flex-col items-center transition-all',
  {
    variants: {
      layout: {
        /** Stack: Imagen arriba, texto abajo. En laptop-short cambia a horizontal por CSS. */
        stack: [
          'gap-4 mobile-p:gap-6 tablet:gap-8',
          'laptop-short:flex-row laptop-short:items-start laptop-short:gap-8 laptop-short:text-left',
        ].join(' '),
        /** Side: Siempre horizontal (imagen izquierda, texto derecha). */
        side: 'flex-row items-start gap-4 mobile-p:gap-6 laptop-short:gap-8 text-left',
      },
      density: {
        default: 'mobile-p:gap-6 tablet:gap-8',
        compact: 'gap-2 mobile-p:gap-3 laptop-short:gap-4',
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
        stack: 'laptop-short:items-start laptop-short:text-left',
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
      default: 'mobile-p:gap-2 tablet:gap-4',
      compact: 'gap-1 laptop-short:gap-2',
    },
  },
  defaultVariants: {
    density: 'default',
  },
});
