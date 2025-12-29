import { cva } from 'class-variance-authority';

export const heroSlideVariants = cva(
  'flex w-full min-h-0 transition-all',
  {
    variants: {
      layout: {
        /** Stack: Vertical por defecto, horizontal en mobile-l (667x375) via CSS. */
        stack: [
          'flex-col items-center gap-4 mobile-p:gap-6 tablet:gap-8',
          // En mobile-l (667x375) cambia a horizontal
          'mobile-l:flex-row mobile-l:items-center mobile-l:gap-3 mobile-l:text-left',
          // Vuelve a vertical en mobile-p (375x667 portrait)
          'mobile-p:flex-col mobile-p:items-center mobile-p:text-center',
        ].join(' '),
        /** Side: Siempre horizontal. */
        side: 'flex-row items-center gap-3 text-left',
      },
      density: {
        default: '',
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
  // flex-1 min-w-0: permite que el texto tome el espacio restante y haga wrap
  'flex flex-1 flex-col min-w-0 overflow-visible',
  {
    variants: {
      align: {
        center: 'items-center text-center',
        left: 'items-start text-left',
      },
      layout: {
        // Stack: centrado por defecto, left en mobile-l
        stack: 'mobile-l:items-start mobile-l:text-left mobile-l:justify-center mobile-p:items-center mobile-p:text-center',
        // Side: siempre left
        side: 'items-start text-left justify-center',
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
