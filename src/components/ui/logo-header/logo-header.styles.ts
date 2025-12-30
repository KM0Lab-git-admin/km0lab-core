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

export const logoVariants = cva('logo-1', {
  variants: {
    scale: {
      none: '', // Sin escalado - tamaño por defecto del logo-1
      sm: 'scale-[clamp(0.5,8vw,0.65)]',
      md: [
        'scale-[clamp(0.55,8.5vw,0.65)]',
        'mobile-p:scale-[clamp(0.6,9vw,0.7)]',
        'tablet:scale-[clamp(0.7,10vw,0.8)]',
        'laptop-short:scale-[clamp(0.65,9vw,0.75)]',
        'desktop:scale-[clamp(0.85,11vw,0.95)]',
        'ultra-wide:scale-[clamp(0.9,12vw,1)]',
      ].join(' '),
      lg: [
        'scale-[clamp(0.6,9vw,0.7)]',
        'mobile-p:scale-[clamp(0.65,9.5vw,0.75)]',
        'tablet:scale-[clamp(0.75,10.5vw,0.85)]',
        'laptop-short:scale-[clamp(0.7,10vw,0.8)]',
        'desktop:scale-[clamp(0.9,11.5vw,0.98)]',
        'ultra-wide:scale-100',
      ].join(' '),
    },
  },
  defaultVariants: {
    scale: 'none', // Por defecto sin escalado para compatibilidad con AppHeader
  },
});

