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
        sm: [
          'gap-[clamp(6px,1.2vh,16px)]',
          'portrait:gap-[clamp(8px,1.5vh,20px)]',
          'landscape:gap-[clamp(6px,1.2vh,16px)]',
        ].join(' '),
        md: [
          'gap-[clamp(8px,1.5vh,24px)]',
          'portrait:gap-[clamp(10px,2vh,32px)]',
          'landscape:gap-[clamp(8px,1.5vh,24px)]',
          'tablet:gap-[clamp(12px,2vh,40px)]',
          'tablet:portrait:gap-[clamp(16px,2.5vh,48px)]',
          'desktop:gap-[clamp(16px,2.5vh,48px)]',
          'desktop:portrait:gap-[clamp(20px,3vh,60px)]',
        ].join(' '),
        lg: [
          'gap-[clamp(10px,2vh,28px)]',
          'portrait:gap-[clamp(12px,2.5vh,36px)]',
          'landscape:gap-[clamp(10px,2vh,28px)]',
          'tablet:gap-[clamp(16px,2.5vh,48px)]',
          'tablet:portrait:gap-[clamp(20px,3vh,60px)]',
          'desktop:gap-[clamp(20px,3vh,60px)]',
          'desktop:portrait:gap-[clamp(24px,3.5vh,72px)]',
        ].join(' '),
      },
    },
    defaultVariants: {
      layout: 'stack',
      density: 'default',
      scale: 'md',
    },
  },
);

/**
 * heroTextVariants - Fusiona heroContentVariants + heroTextWrapperVariants.
 * Reduce 2 divs a 1 solo contenedor para título y subtítulo.
 */
export const heroTextVariants = cva(
  // Base: flex column + permite que el texto tome espacio y haga wrap
  'flex flex-1 flex-col min-w-0 min-h-0 overflow-visible',
  {
    variants: {
      align: {
        center: 'items-center text-center',
        left: 'items-start text-left',
      },
      layout: {
        stack: [
          'portrait:items-center portrait:text-center',
          'landscape:items-start landscape:text-left landscape:justify-center',
        ].join(' '),
        side: 'items-start text-left justify-center',
      },
      scale: {
        sm: 'gap-[clamp(2px,0.5vh,8px)]',
        md: [
          'gap-[clamp(4px,0.8vh,16px)]',
          'portrait:gap-[clamp(6px,1vh,20px)]',
          'tablet:gap-[clamp(8px,1.5vh,24px)]',
          'desktop:gap-[clamp(12px,2vh,32px)]',
        ].join(' '),
        lg: [
          'gap-[clamp(6px,1.2vh,20px)]',
          'portrait:gap-[clamp(8px,1.5vh,24px)]',
          'tablet:gap-[clamp(12px,2vh,32px)]',
          'desktop:gap-[clamp(16px,2.5vh,40px)]',
        ].join(' '),
      },
    },
    defaultVariants: {
      align: 'center',
      layout: 'stack',
      scale: 'md',
    },
  },
);
