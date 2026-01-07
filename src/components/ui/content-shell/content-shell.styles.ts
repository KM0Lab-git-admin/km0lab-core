import { cva } from 'class-variance-authority';

export const contentShellVariants = cva(
  // Clases base - padding mínimo de 12px siempre (todas las variantes y todos los breakpoints)
  'flex-1 min-h-0 flex flex-col items-center justify-start w-full overflow-hidden max-w-[570px] mx-auto p-[clamp(12px,2vw,24px)] gap-[clamp(8px,2vh,24px)]',
  {
    variants: {
      scale: {
        sm: [
          // Solo sobrescribir con valores específicos de sm
          'p-[clamp(12px,1.5vw,16px)]',
          'gap-[clamp(8px,1.5vh,16px)]',
        ].join(' '),
        md: [
          // Base ya tiene el padding, solo añadir breakpoints específicos
          'mobile-p:p-[clamp(12px,1.5vw,20px)]',
          'mobile-p:gap-[clamp(6px,1.5vh,20px)]',
          'tablet:p-[clamp(16px,2.5vw,32px)]',
          'tablet:gap-[clamp(12px,2vh,32px)]',
          'desktop:p-[clamp(24px,3.5vw,48px)]',
          'desktop:gap-[clamp(20px,3vh,40px)]',
        ].join(' '),
        lg: [
          // Sobrescribir base con valores de lg
          'p-[clamp(12px,2.5vw,32px)]',
          'gap-[clamp(12px,2.5vh,28px)]',
          'tablet:p-[clamp(24px,3.5vw,48px)]',
          'tablet:gap-[clamp(20px,3vh,40px)]',
          'desktop:p-[clamp(32px,4.5vw,64px)]',
          'desktop:gap-[clamp(24px,3.5vh,56px)]',
        ].join(' '),
      },
    },
    defaultVariants: {
      scale: 'md',
    },
  },
);
