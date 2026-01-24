import { cva } from 'class-variance-authority';

/**
 * TitleSubtitle - Contenedor para título y subtítulo.
 *
 * Variantes:
 * - align: alineación del texto (left, center)
 * - spacing: gap entre título y subtítulo (sm, md, lg)
 */
export const titleSubtitleVariants = cva(
  'flex flex-col',
  {
    variants: {
      align: {
        left: 'items-start text-left',
        center: 'items-center text-center',
      },
      spacing: {
        sm: [
          'gap-1',
          'mobile-p:gap-1.5',
          'short-landscape:gap-0.5',
          'tablet:gap-2',
          'desktop:gap-3',
        ].join(' '),
        md: [
          'gap-2',
          'mobile-p:gap-3',
          'short-landscape:gap-1',
          'tablet:gap-4',
          'desktop:gap-5',
        ].join(' '),
        lg: [
          'gap-3',
          'mobile-p:gap-4',
          'short-landscape:gap-1.5',
          'tablet:gap-5',
          'desktop:gap-6',
        ].join(' '),
      },
    },
    defaultVariants: {
      align: 'center',
      spacing: 'md',
    },
  },
);

