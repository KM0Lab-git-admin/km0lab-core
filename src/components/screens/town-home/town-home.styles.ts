import { cva } from 'class-variance-authority';

/** Bloque izquierdo del header: nombre + logo apilados (font-brand para Antique Olive) */
export const townHomeHeaderLeft = cva('flex flex-col items-start gap-0.5 font-brand');

/** Wrapper del logo en header: clase para override de --scale en globals (al final del archivo) */
export const townHomeHeaderLogo = cva('town-home-header-logo');

/** Header: izquierda (nombre + logo apilados) | derecha (campanilla) */
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

/** Nombre de la poblacion en el header (tipo + color brand) */
export const townHomeHeaderTitle = cva(
  'font-brand font-bold text-brand uppercase tracking-wide',
  {
    variants: {
      scale: {
        sm: 'text-lg',
        md: 'text-xl mobile-p:text-2xl tablet:text-2xl',
        lg: 'text-2xl mobile-p:text-3xl tablet:text-3xl',
      },
    },
    defaultVariants: { scale: 'md' },
  },
);

/** Seccion hero central (menos padding inferior para acercar logo a la barra de tabs) */
export const townHomeHero = cva(
  'w-full flex flex-col items-center',
  {
    variants: {
      scale: {
        sm: 'gap-2 pt-3 pb-1.5',
        md: 'gap-3 pt-4 pb-2 mobile-p:pt-5 mobile-p:pb-3',
        lg: 'gap-4 pt-6 pb-3',
      },
    },
    defaultVariants: { scale: 'md' },
  },
);

/** Nombre grande de la poblacion en hero (tipo + color brand) */
export const townHomeHeroTitle = cva(
  'font-brand font-bold text-brand uppercase text-center leading-tight',
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

/** Contenedor del logo KMØ CHAT (rectangular con bordes redondeados, sin sombra) */
export const townHomeChatLogo = cva(
  'overflow-hidden rounded-2xl',
  {
    variants: {
      scale: {
        sm: 'w-24 h-10',
        md: 'w-32 h-14 mobile-p:w-40 mobile-p:h-16',
        lg: 'w-44 h-20',
      },
    },
    defaultVariants: { scale: 'md' },
  },
);

/** Barra de tabs con degradado amarillo corporativo → blanco */
export const townHomeTabBar = cva(
  'w-full flex items-end justify-around rounded-t-xl bg-gradient-white-beige px-4 pt-5 pb-4',
);

/** Boton de tab individual (icono + label) */
export const townHomeTabButton = cva(
  'flex flex-col items-center gap-1.5 cursor-pointer transition-opacity',
  {
    variants: {
      active: {
        true: 'opacity-100',
        false: 'opacity-50',
      },
    },
    defaultVariants: { active: false },
  },
);

/** Circulo del icono dentro de un tab */
export const townHomeTabIcon = cva(
  'flex items-center justify-center rounded-full bg-white text-km0-blue-700 shrink-0 transition-shadow',
  {
    variants: {
      active: {
        true: 'shadow-md ring-2 ring-km0-beige-300',
        false: 'shadow-sm',
      },
      scale: {
        sm: 'w-12 h-12',
        md: 'w-14 h-14 mobile-p:w-16 mobile-p:h-16',
        lg: 'w-18 h-18',
      },
    },
    defaultVariants: { active: false, scale: 'md' },
  },
);

/** Label debajo del icono del tab */
export const townHomeTabLabel = cva(
  'font-brand text-brand text-center',
  {
    variants: {
      active: {
        true: 'font-bold',
        false: 'font-normal',
      },
      scale: {
        sm: 'text-xs',
        md: 'text-xs mobile-p:text-sm',
        lg: 'text-sm',
      },
    },
    defaultVariants: { active: false, scale: 'md' },
  },
);

/** Panel de contenido (bullets) debajo de la barra de tabs */
export const townHomeBulletPanel = cva(
  'w-full flex flex-1 min-h-0 flex-col gap-3 rounded-b-xl bg-white px-5 py-4 overflow-hidden',
);

/** Item individual de bullet (min-w-0 para que el texto haga wrap) */
export const townHomeBulletItem = cva(
  'flex min-w-0 items-start gap-2.5 font-body text-km0-blue-700',
  {
    variants: {
      scale: {
        sm: 'text-xs',
        md: 'text-sm mobile-p:text-base',
        lg: 'text-base',
      },
    },
    defaultVariants: { scale: 'md' },
  },
);

/** Dot decorativo del bullet */
export const townHomeBulletDot = cva(
  'shrink-0 mt-1.5 w-2 h-2 rounded-full bg-km0-beige-400',
);

/** Linea indicadora decorativa coral al final del panel (siempre visible) */
export const townHomeIndicator = cva(
  'w-full h-0.5 shrink-0 rounded-full bg-km0-coral-400 mt-2',
);
