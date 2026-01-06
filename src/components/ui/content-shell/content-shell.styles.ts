import { cva } from 'class-variance-authority';

export const contentShellVariants = cva(
  'flex-1 min-h-0 flex flex-col items-center justify-start w-full overflow-hidden',
  {
    variants: {
      scale: {
        sm: [
          'p-[clamp(8px,1.5vw,16px)]',
          'gap-[clamp(8px,1.5vh,16px)]',
          // Constrained por defecto
          'tablet:max-w-[570px]',
          'tablet:mx-auto',
          'laptop-short:max-w-[570px]',
          'laptop-short:mx-auto',
          'desktop:max-w-[570px]',
          'desktop:mx-auto',
          'ultra-wide:max-w-[570px]',
          'ultra-wide:mx-auto',
        ].join(' '),
        md: [
          // Padding adaptativo
          'p-[clamp(8px,2vw,24px)]',
          'gap-[clamp(8px,2vh,24px)]',
          // Mobile-P: más ajustado
          'mobile-p:p-[clamp(8px,1.5vw,20px)]',
          'mobile-p:gap-[clamp(6px,1.5vh,20px)]',
          // Tablet: intermedio
          'tablet:p-[clamp(16px,2.5vw,32px)]',
          'tablet:gap-[clamp(12px,2vh,32px)]',
          // Desktop: generoso
          'desktop:p-[clamp(24px,3.5vw,48px)]',
          'desktop:gap-[clamp(20px,3vh,40px)]',
          // Constrained por defecto
          'tablet:max-w-[570px]',
          'tablet:mx-auto',
          'laptop-short:max-w-[570px]',
          'laptop-short:mx-auto',
          'desktop:max-w-[570px]',
          'desktop:mx-auto',
          'ultra-wide:max-w-[570px]',
          'ultra-wide:mx-auto',
        ].join(' '),
        lg: [
          'p-[clamp(12px,2.5vw,32px)]',
          'gap-[clamp(12px,2.5vh,28px)]',
          'tablet:p-[clamp(24px,3.5vw,48px)]',
          'tablet:gap-[clamp(20px,3vh,40px)]',
          'desktop:p-[clamp(32px,4.5vw,64px)]',
          'desktop:gap-[clamp(24px,3.5vh,56px)]',
          // Constrained por defecto
          'tablet:max-w-[570px]',
          'tablet:mx-auto',
          'laptop-short:max-w-[570px]',
          'laptop-short:mx-auto',
          'desktop:max-w-[570px]',
          'desktop:mx-auto',
          'ultra-wide:max-w-[570px]',
          'ultra-wide:mx-auto',
        ].join(' '),
      },
    },
    defaultVariants: {
      scale: 'md',
    },
  },
);
