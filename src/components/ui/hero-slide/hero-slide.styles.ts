import { cva } from 'class-variance-authority';

export const heroSlideVariants = cva(
  'flex w-full min-h-0 transition-all',
  {
    variants: {
      layout: {
        /** Stack: Vertical por defecto (portrait). En landscape se convierte en side automáticamente. */
        stack: [
          'flex-col items-center',
          'portrait:flex-col portrait:items-center portrait:text-center',
          'landscape:flex-row landscape:items-center landscape:text-left',
        ].join(' '),
        /** Side: Siempre horizontal. */
        side: 'flex-row items-center text-left',
      },
      density: {
        default: '',
        compact: '',
      },
      scale: {
        sm: 'gap-3 portrait:gap-4 landscape:gap-3',
        md: 'gap-4 portrait:gap-6 landscape:gap-4 tablet:gap-6 tablet:portrait:gap-8',
        lg: 'gap-5 portrait:gap-7 landscape:gap-5 tablet:gap-8 tablet:portrait:gap-10 desktop:gap-10 desktop:portrait:gap-12',
      },
    },
    defaultVariants: {
      layout: 'stack',
      density: 'default',
      scale: 'md',
    },
  },
);

export const heroContentVariants = cva(
  // flex-1 min-w-0 min-h-0: permite que el texto tome el espacio restante y haga wrap, sin cortarse
  'flex flex-1 flex-col min-w-0 min-h-0 overflow-visible',
  {
    variants: {
      align: {
        center: 'items-center text-center',
        left: 'items-start text-left',
      },
      layout: {
        // Stack: centrado en portrait, left en landscape
        stack: [
          'portrait:items-center portrait:text-center',
          'landscape:items-start landscape:text-left landscape:justify-center',
        ].join(' '),
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

export const heroTextWrapperVariants = cva('flex flex-col', {
  variants: {
    density: {
      default: '',
      compact: '',
    },
    scale: {
      sm: 'gap-1',
      md: 'gap-1 portrait:gap-2 tablet:gap-4',
      lg: 'gap-2 portrait:gap-3 tablet:gap-5 desktop:gap-6',
    },
  },
  defaultVariants: {
    density: 'default',
    scale: 'md',
  },
});
