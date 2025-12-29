import { cva } from 'class-variance-authority';

const frameBase = 'relative flex items-center justify-center overflow-hidden border border-black/5 transition-all';
const stackSizing = [
  'w-full',
  'max-w-[clamp(240px,80vw,560px)]',
  'short-landscape:flex-[0_0_42%]',
  'short-landscape:max-w-[420px]',
].join(' ');
const sideSizing = [
  'w-full',
  'max-w-[clamp(240px,70vw,520px)]',
  'short-landscape:flex-[0_0_40%]',
  'short-landscape:max-w-[460px]',
].join(' ');

export const mediaFrameVariants = cva(frameBase, {
  variants: {
    layout: {
      stack: stackSizing,
      side: sideSizing,
    },
    tone: {
      default: 'bg-white shadow-sm',
      soft: 'bg-neutral-50/50',
    },
    radius: {
      md: 'rounded-lg',
      lg: 'rounded-xl',
      xl: 'rounded-2xl',
    },
    shadow: {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
    },
  },
  defaultVariants: {
    layout: 'stack',
    tone: 'default',
    radius: 'lg',
    shadow: 'sm',
  },
});

const innerPadding = 'p-[clamp(0.5rem,2vw,1rem)]';

export const mediaFrameInnerVariants = cva(
  `relative flex h-full w-full items-center justify-center ${innerPadding} shadow-inner`,
  {
    variants: {
      radius: {
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
      },
    },
    defaultVariants: {
      radius: 'lg',
    },
  },
);

export const badgeVariants = cva(
  'absolute z-10 flex items-center justify-center bg-km0-coral-400 font-bold text-white shadow-md transition-all',
  {
    variants: {
      position: {
        'top-left': 'left-2 top-2',
        'top-right': 'right-2 top-2',
        'bottom-left': 'bottom-2 left-2',
        'bottom-right': 'bottom-2 right-2',
      },
      size: {
        default: [
          'px-3 py-1 text-[clamp(0.65rem,1.5vw,0.85rem)]',
          'mobile-p:text-sm',
          'short-landscape:px-2 short-landscape:py-0.5 short-landscape:text-[10px]',
        ].join(' '),
      },
    },
    defaultVariants: {
      position: 'bottom-left',
      size: 'default',
    },
  },
);

const fluidImage = [
  'max-h-[clamp(220px,45vh,420px)]',
  'short-landscape:max-h-[clamp(180px,55dvh,320px)]',
].join(' ');
const compactImage = [
  'max-h-[clamp(160px,45dvh,280px)]',
  'short-landscape:max-h-[clamp(150px,50dvh,240px)]',
].join(' ');

export const imageVariants = cva('h-full w-full object-contain', {
  variants: {
    maxHeight: {
      default: fluidImage,
      fluid: fluidImage,
      compact: compactImage,
      full: 'max-h-full',
    },
  },
  defaultVariants: {
    maxHeight: 'fluid',
  },
});
