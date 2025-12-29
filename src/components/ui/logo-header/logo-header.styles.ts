import { cva } from 'class-variance-authority';

export const logoHeaderVariants = cva('flex items-center justify-center shrink-0 w-full', {
  variants: {
    scale: {
      none: '', // Sin padding - modo simple como AppHeader
      sm: 'pb-[clamp(8px,1.5vh,12px)]',
      md: 'pb-[clamp(12px,2vh,16px)] tablet:pb-[clamp(16px,2.5vh,24px)]',
      lg: 'pb-[clamp(16px,2.5vh,24px)] tablet:pb-[clamp(20px,3vh,32px)] desktop:pb-[clamp(24px,3.5vh,40px)]',
    },
  },
  defaultVariants: {
    scale: 'none', // Por defecto sin padding para compatibilidad con AppHeader
  },
});

export const logoVariants = cva('logo-1', {
  variants: {
    scale: {
      none: '', // Sin escalado - tamaño por defecto del logo-1
      sm: 'scale-[clamp(0.5,8vw,0.65)]',
      md: 'scale-[clamp(0.6,9vw,0.75)] tablet:scale-[clamp(0.7,10vw,0.85)]',
      lg: 'scale-[clamp(0.7,10vw,0.85)] tablet:scale-[clamp(0.8,11vw,0.95)] desktop:scale-[clamp(0.85,12vw,1)]',
    },
  },
  defaultVariants: {
    scale: 'none', // Por defecto sin escalado para compatibilidad con AppHeader
  },
});

