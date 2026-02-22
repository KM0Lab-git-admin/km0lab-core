import { cva } from 'class-variance-authority';

export const logoVariants = cva('logo-1', {
  variants: {
    scale: {
      none: '',
      xxs: '[--scale:0.25]',
      entry: '[--scale:0.3466]',
      xs: 'scale-[clamp(0.4,6vw,0.5)]',
      sm: 'scale-[clamp(0.5,8vw,0.65)]',
      md: [
        'scale-[clamp(0.55,8.5vw,0.65)]',
        'mobile-p:scale-[clamp(0.6,9vw,0.7)]',
        'short-landscape:scale-[0.55]',
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
    context: {
      none: '',
      onboarding: 'logo-context-onboarding',
      entry: 'logo-context-entry',
      chat: 'logo-context-chat',
    },
  },
  defaultVariants: {
    scale: 'none',
    context: 'none',
  },
});

