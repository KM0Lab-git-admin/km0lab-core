/**
 * Slide data for the onboarding carousel.
 * Separated from UI to allow reuse and easy content updates.
 */

export type SlideData = {
  /** Unique slide identifier. */
  id: string;
  /** First line of the title. */
  titleLine1: string;
  /** Second line of the title. */
  titleLine2: string;
  /** Subtitle/description text. */
  subtitle: string;
  /** Image source path. */
  imageSrc: string;
  /** Background color class for the image frame. */
  bgColor: string;
  /** Optional XP badge text. */
  xpBadge?: string;
};

export const onboardingSlides: SlideData[] = [
  {
    id: 'welcome',
    titleLine1: 'BIENVENIDO',
    titleLine2: 'A KM0 LAB',
    subtitle:
      'Tu comercio local, más cerca que nunca. Descubre una nueva forma de interactuar con tus vecinos y apoyar el comercio de proximidad en tu barrio, todo desde una única plataforma diseñada para ti.',
    imageSrc: '/images/glovo-style-welcome.png',
    bgColor: 'bg-km0-yellow-100',
    xpBadge: '+ 10 XP',
  },
  {
    id: 'discover',
    titleLine1: 'DESCUBRE',
    titleLine2: 'TIENDAS',
    subtitle: 'Explora los mejores productos de tu barrio.',
    imageSrc: '/images/glovo-style-discover.png',
    bgColor: 'bg-km0-blue-100',
    xpBadge: '+ 10 XP',
  },
  {
    id: 'connect',
    titleLine1: 'CONECTA CON',
    titleLine2: 'VECINOS',
    subtitle: 'Forma parte de una comunidad activa y solidaria.',
    imageSrc: '/images/glovo-style-connect.png',
    bgColor: 'bg-km0-coral-100',
    xpBadge: '+ 10 XP',
  },
  {
    id: 'spaces',
    titleLine1: 'ESPACIOS',
    titleLine2: 'PÚBLICOS',
    subtitle: 'Disfruta y cuida los espacios de todos.',
    imageSrc: '/images/glovo-style-public.png',
    bgColor: 'bg-km0-success-100',
    xpBadge: '+ 10 XP',
  },
  {
    id: 'start',
    titleLine1: 'EMPIEZA',
    titleLine2: 'AHORA',
    subtitle: 'Únete a la revolución del comercio local.',
    imageSrc: '/images/glovo-style-start.png',
    bgColor: 'bg-km0-yellow-100',
    xpBadge: '+ 10 XP',
  },
];

