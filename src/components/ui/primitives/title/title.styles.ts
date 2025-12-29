import { cva } from 'class-variance-authority';

export const titleVariants = cva(
  'font-brand font-black tracking-tight leading-tight',
  {
    variants: {
      size: {
        hero: [
          'text-[clamp(2rem,5vw,4rem)]',
          'leading-[clamp(2.4rem,5.5vw,4.5rem)]',
          'short-landscape:text-[clamp(1.65rem,3.6vw,2.5rem)]',
          'short-landscape:leading-[clamp(1.9rem,4.1vw,3rem)]',
        ].join(' '),
        heroCompact: [
          'text-[clamp(1.6rem,4.2vw,3rem)]',
          'leading-[clamp(1.9rem,4.6vw,3.25rem)]',
          'short-landscape:text-[clamp(1.35rem,3.2vw,2.2rem)]',
          'short-landscape:leading-[clamp(1.55rem,3.6vw,2.6rem)]',
        ].join(' '),
        h1: 'text-2xl mobile-p:text-3xl tablet:text-4xl laptop-short:text-3xl desktop:text-5xl ultra-wide:text-6xl',
        h2: 'text-xl mobile-p:text-2xl tablet:text-3xl laptop-short:text-2xl desktop:text-4xl ultra-wide:text-5xl',
        h3: 'text-lg mobile-p:text-xl tablet:text-2xl laptop-short:text-xl desktop:text-3xl ultra-wide:text-4xl',
        xl: 'text-base mobile-p:text-lg tablet:text-xl laptop-short:text-lg desktop:text-2xl ultra-wide:text-3xl',
        lg: 'text-base mobile-p:text-base tablet:text-lg laptop-short:text-base desktop:text-xl ultra-wide:text-2xl',
        md: 'text-sm mobile-p:text-base tablet:text-base laptop-short:text-sm desktop:text-lg ultra-wide:text-xl',
        sm: 'text-sm mobile-p:text-sm tablet:text-base laptop-short:text-sm desktop:text-base ultra-wide:text-lg',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
      },
      tone: {
        default: 'text-neutral-900',
        muted: 'text-neutral-600',
        brand: 'text-km0-blue-700',
      },
      uppercase: {
        true: 'uppercase',
        false: '',
      },
    },
    defaultVariants: {
      size: 'h1',
      align: 'left',
      tone: 'default',
      uppercase: false,
    },
  },
);
