import { cva } from 'class-variance-authority';

export const onboardingPage = cva(
  'w-full h-dvh-fallback flex flex-col bg-gradient-white-beige font-ui overflow-hidden',
);

export const onboardingShell = cva(
  'flex-1 min-h-0 flex flex-col items-center justify-start w-full overflow-hidden',
  {
    variants: {
      scale: {
        sm: 'px-3 py-3 gap-4',
        md: 'px-4 py-6 gap-6 tablet:px-6 tablet:py-8 desktop:px-10 desktop:py-10',
        lg: 'px-5 py-8 gap-7 tablet:px-8 tablet:py-12 desktop:px-12 desktop:py-14',
      },
    },
    defaultVariants: {
      scale: 'md',
    },
  },
);

export const onboardingHeader = cva('flex items-center justify-center shrink-0', {
  variants: {
    scale: {
      sm: 'pb-2',
      md: 'pb-3 tablet:pb-4',
      lg: 'pb-4 tablet:pb-5 desktop:pb-6',
    },
  },
  defaultVariants: {
    scale: 'md',
  },
});
export const onboardingLogo = cva('logo-1', {
  variants: {
    scale: {
      sm: 'scale-90',
      md: 'scale-100 tablet:scale-110',
      lg: 'scale-100 tablet:scale-110 desktop:scale-125',
    },
  },
  defaultVariants: {
    scale: 'md',
  },
});

export const onboardingCard = cva(
  'w-full flex flex-col flex-1 min-h-0 overflow-hidden rounded-2xl bg-white km0-card-shadow',
  {
    variants: {
      scale: {
        sm: 'max-w-onboarding-card-sm p-4 gap-4',
        md: 'max-w-onboarding-card-md p-5 gap-5 tablet:max-w-onboarding-card-lg tablet:p-8 desktop:p-10',
        lg: 'max-w-onboarding-card-lg p-6 gap-6 tablet:p-10 desktop:p-12',
      },
    },
    defaultVariants: {
      scale: 'md',
    },
  },
);

export const onboardingFooter = cva(
  'shrink-0 w-full flex items-center justify-between gap-3',
  {
    variants: {
      scale: {
        sm: 'max-w-xs px-2 pt-3',
        md: 'max-w-sm px-3 pt-4 tablet:max-w-md',
        lg: 'max-w-md px-4 pt-5 tablet:max-w-lg desktop:max-w-xl',
      },
    },
    defaultVariants: {
      scale: 'md',
    },
  },
);

export const onboardingCounter = cva(
  'text-km0-blue-700 font-bold shrink-0 text-sm w-10',
  {
    variants: {
      scale: {
        sm: '',
        md: 'text-base w-12',
        lg: 'text-base w-14',
      },
    },
    defaultVariants: {
      scale: 'md',
    },
  },
);

export const onboardingCta = cva('font-semibold uppercase tracking-wide', {
  variants: {
    scale: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    scale: 'md',
  },
});

