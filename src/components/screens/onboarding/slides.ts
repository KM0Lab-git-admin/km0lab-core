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
  /** XP numeric value for badge display. */
  xp: number;
  /** Emoji visual placeholder for the slide. */
  emoji: string;
  /** CSS color value for the emoji area background. */
  color: string;
};

type OnboardingSlidesTranslations = {
  welcome: {
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    xpBadge: string;
  };
  discover: {
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    xpBadge: string;
  };
  connect: {
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    xpBadge: string;
  };
  spaces: {
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    xpBadge: string;
  };
  start: {
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    xpBadge: string;
  };
};

export const getOnboardingSlides = (t: OnboardingSlidesTranslations): SlideData[] => [
  {
    id: 'welcome',
    titleLine1: t.welcome.titleLine1,
    titleLine2: t.welcome.titleLine2,
    subtitle: t.welcome.subtitle,
    imageSrc: '/images/glovo-style-welcome.png',
    bgColor: 'bg-km0-yellow-100',
    xpBadge: t.welcome.xpBadge,
    xp: 10,
    emoji: '🤝',
    color: '#f9dd8e',
  },
  {
    id: 'discover',
    titleLine1: t.discover.titleLine1,
    titleLine2: t.discover.titleLine2,
    subtitle: t.discover.subtitle,
    imageSrc: '/images/glovo-style-discover.png',
    bgColor: 'bg-km0-blue-100',
    xpBadge: t.discover.xpBadge,
    xp: 20,
    emoji: '🛒',
    color: '#40D9D0',
  },
  {
    id: 'connect',
    titleLine1: t.connect.titleLine1,
    titleLine2: t.connect.titleLine2,
    subtitle: t.connect.subtitle,
    imageSrc: '/images/glovo-style-connect.png',
    bgColor: 'bg-km0-coral-100',
    xpBadge: t.connect.xpBadge,
    xp: 30,
    emoji: '🎯',
    color: '#ff8570',
  },
  {
    id: 'spaces',
    titleLine1: t.spaces.titleLine1,
    titleLine2: t.spaces.titleLine2,
    subtitle: t.spaces.subtitle,
    imageSrc: '/images/glovo-style-public.png',
    bgColor: 'bg-km0-success-100',
    xpBadge: t.spaces.xpBadge,
    xp: 40,
    emoji: '🏆',
    color: '#b5c3f0',
  },
  {
    id: 'start',
    titleLine1: t.start.titleLine1,
    titleLine2: t.start.titleLine2,
    subtitle: t.start.subtitle,
    imageSrc: '/images/glovo-style-start.png',
    bgColor: 'bg-km0-yellow-100',
    xpBadge: t.start.xpBadge,
    xp: 50,
    emoji: '📚',
    color: '#fdeea9',
  },
];
