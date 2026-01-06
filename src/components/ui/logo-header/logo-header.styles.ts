import { cva } from 'class-variance-authority';

export const logoHeaderVariants = cva('flex items-center justify-center shrink-0 w-full', {
  variants: {
    scale: {
      none: '', // Sin padding - modo simple como AppHeader
      sm: 'pb-[clamp(8px,1.5vh,12px)]',
      md: [
        'pb-[clamp(8px,1.2vh,16px)]',
        'mobile-p:pb-[clamp(10px,1.5vh,20px)]',
        'tablet:pb-[clamp(12px,2vh,24px)]',
        'desktop:pb-[clamp(16px,2.5vh,32px)]',
      ].join(' '),
      lg: [
        'pb-[clamp(12px,2vh,24px)]',
        'mobile-p:pb-[clamp(14px,2.2vh,28px)]',
        'tablet:pb-[clamp(16px,2.5vh,32px)]',
        'desktop:pb-[clamp(20px,3vh,40px)]',
        'ultra-wide:pb-[clamp(24px,3.5vh,48px)]',
      ].join(' '),
    },
  },
  defaultVariants: {
    scale: 'none', // Por defecto sin padding para compatibilidad con AppHeader
  },
});


