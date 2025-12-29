import { cva } from 'class-variance-authority';

export const heroSlideVariants = cva(
  'flex w-full items-center transition-all short-landscape:max-h-[calc(100dvh-160px)]',
  {
    variants: {
      layout: {
        /**
         * Stack: Imagen arriba, texto abajo (default).
         * En short-landscape pasa a horizontal vía CSS sin JS.
         */
        stack: 'flex-col short-landscape:flex-row short-landscape:items-center',
        /** Side: Fuerza layout horizontal. */
        side: 'flex-row items-center',
      },
      density: {
        default: [
          'gap-[clamp(1.25rem,4vw,3rem)]',
          'short-landscape:gap-[clamp(0.75rem,3vw,1.5rem)]',
          'px-[clamp(0rem,1vw,0.75rem)]',
        ].join(' '),
        compact: [
          'gap-[clamp(0.75rem,3vw,1.5rem)]',
          'short-landscape:gap-[clamp(0.5rem,2vw,1rem)]',
          'px-[clamp(0rem,0.5vw,0.5rem)]',
        ].join(' '),
      },
    },
    defaultVariants: {
      layout: 'stack',
      density: 'default',
    },
  },
);

const textWidth = [
  'w-full',
  'max-w-[clamp(280px,70vw,560px)]',
  'short-landscape:max-w-[420px]',
].join(' ');

export const heroContentVariants = cva(
  `flex flex-1 flex-col min-w-0 ${textWidth}`,
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

export const heroTextWrapperVariants = cva('flex flex-col', {
  variants: {
    density: {
      default: [
        'gap-[clamp(0.75rem,2vw,1.5rem)]',
        'short-landscape:gap-[clamp(0.5rem,1.5vw,1rem)]',
      ].join(' '),
      compact: 'gap-[clamp(0.5rem,1.5vw,0.9rem)]',
    },
  },
  defaultVariants: {
    density: 'default',
  },
});
