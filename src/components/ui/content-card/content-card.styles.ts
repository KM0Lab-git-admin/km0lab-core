import { cva } from 'class-variance-authority';

export const contentCardVariants = cva(
  // Clases base - w-full para heredar el ancho del ContentShell padre
  // Eliminar mx-auto porque ContentShell ya centra todo
  'w-full flex flex-col flex-1 min-h-0 overflow-hidden rounded-xl bg-white km0-card-shadow',
  {
    variants: {
      scale: {
        sm: [
          'p-[clamp(8px,1.5vw,16px)]',
          'gap-[clamp(8px,1.5vh,16px)]',
          'max-h-[calc(100dvh-clamp(150px,20vh,180px))]',
        ].join(' '),
        md: [
          // Padding adaptativo: se reduce cuando hay poco espacio
          'p-[clamp(8px,1.5vw,24px)]',
          'gap-[clamp(8px,1.5vh,24px)]',
          // Mobile-P: padding más ajustado
          'mobile-p:p-[clamp(8px,1.2vw,20px)]',
          'mobile-p:gap-[clamp(8px,1.2vh,20px)]',
          // Tablet: más espacio pero padding también ajustado
          'tablet:p-[clamp(16px,2vw,32px)]',
          'tablet:gap-[clamp(12px,1.8vh,28px)]',
          // Desktop: más generoso
          'desktop:p-[clamp(24px,3vw,48px)]',
          'desktop:gap-[clamp(16px,2.5vh,32px)]',
          // Altura máxima calculada: reserva espacio para header + footer + padding shell
          'max-h-[calc(100dvh-clamp(160px,22vh,200px))]',
          'mobile-p:max-h-[calc(100dvh-clamp(150px,20vh,180px))]',
          'tablet:max-h-[calc(100dvh-clamp(180px,25vh,220px))]',
          'desktop:max-h-[calc(100dvh-clamp(200px,28vh,240px))]',
        ].join(' '),
        lg: [
          'p-[clamp(12px,2vw,28px)]',
          'gap-[clamp(12px,2vh,28px)]',
          'tablet:p-[clamp(24px,3.5vw,48px)]',
          'tablet:gap-[clamp(16px,2.5vh,36px)]',
          'desktop:p-[clamp(32px,4.5vw,64px)]',
          'desktop:gap-[clamp(20px,3vh,40px)]',
          'max-h-[calc(100dvh-clamp(170px,24vh,210px))]',
          'tablet:max-h-[calc(100dvh-clamp(190px,27vh,230px))]',
          'desktop:max-h-[calc(100dvh-clamp(210px,30vh,250px))]',
        ].join(' '),
      },
    },
    defaultVariants: {
      scale: 'md',
    },
  },
);
