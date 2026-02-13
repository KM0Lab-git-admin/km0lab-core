import { cva } from 'class-variance-authority';

/** Header personalizado: campanita | nombre poblacion | logo KM0 */
export const townHomeHeader = cva(
  'w-full flex items-center justify-between px-4 py-2',
  {
    variants: {
      scale: {
        sm: 'py-1.5',
        md: 'py-2 mobile-p:py-3',
        lg: 'py-3 tablet:py-4',
      },
    },
    defaultVariants: { scale: 'md' },
  },
);

/** Nombre de la poblacion en el header (pequeno) */
export const townHomeHeaderTitle = cva(
  'font-brand text-km0-blue-700 uppercase tracking-wide',
  {
    variants: {
      scale: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: { scale: 'md' },
  },
);

/** Seccion hero central */
export const townHomeHero = cva(
  'w-full flex flex-col items-center',
  {
    variants: {
      scale: {
        sm: 'gap-2 py-3',
        md: 'gap-3 py-4 mobile-p:py-5',
        lg: 'gap-4 py-6',
      },
    },
    defaultVariants: { scale: 'md' },
  },
);

/** Nombre grande de la poblacion en hero */
export const townHomeHeroTitle = cva(
  'font-brand text-km0-blue-700 uppercase text-center leading-tight',
  {
    variants: {
      scale: {
        sm: 'text-2xl',
        md: 'text-3xl mobile-p:text-4xl',
        lg: 'text-4xl tablet:text-5xl',
      },
    },
    defaultVariants: { scale: 'md' },
  },
);

/** Label "Chat" bajo el nombre */
export const townHomeChatLabel = cva(
  'font-ui text-km0-blue-500 uppercase tracking-widest',
  {
    variants: {
      scale: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: { scale: 'md' },
  },
);

/** Contenedor circular del logo de chat */
export const townHomeChatLogo = cva(
  'rounded-full overflow-hidden shadow-md',
  {
    variants: {
      scale: {
        sm: 'w-16 h-16',
        md: 'w-20 h-20 mobile-p:w-24 mobile-p:h-24',
        lg: 'w-28 h-28',
      },
    },
    defaultVariants: { scale: 'md' },
  },
);

/** Contenedor de tarjetas de categoria */
export const townHomeCardsContainer = cva(
  'w-full flex flex-col',
  {
    variants: {
      scale: {
        sm: 'gap-2',
        md: 'gap-3',
        lg: 'gap-4',
      },
    },
    defaultVariants: { scale: 'md' },
  },
);

/** Tarjeta de categoria individual */
export const townHomeCategoryCard = cva(
  [
    'w-full flex items-center gap-3 rounded-xl p-4',
    'bg-km0-beige-50 border border-km0-beige-100',
    'cursor-pointer hover:bg-km0-beige-100 transition-colors',
  ].join(' '),
  {
    variants: {
      scale: {
        sm: 'p-3 gap-2',
        md: 'p-4 gap-3',
        lg: 'p-5 gap-4',
      },
    },
    defaultVariants: { scale: 'md' },
  },
);

/** Contenedor del icono de categoria */
export const townHomeCategoryIcon = cva(
  'flex items-center justify-center rounded-lg bg-km0-beige-100 text-km0-blue-700 shrink-0',
  {
    variants: {
      scale: {
        sm: 'w-10 h-10',
        md: 'w-12 h-12',
        lg: 'w-14 h-14',
      },
    },
    defaultVariants: { scale: 'md' },
  },
);

/** Contenedor de texto de categoria */
export const townHomeCategoryText = cva('flex flex-col gap-0.5');

/** Titulo de la tarjeta de categoria */
export const townHomeCategoryTitle = cva(
  'font-brand font-bold text-km0-blue-700',
  {
    variants: {
      scale: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: { scale: 'md' },
  },
);

/** Descripcion de la tarjeta de categoria */
export const townHomeCategoryDescription = cva(
  'font-body text-km0-blue-500',
  {
    variants: {
      scale: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: { scale: 'md' },
  },
);
