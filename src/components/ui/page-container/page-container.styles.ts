import { cva } from 'class-variance-authority';

export const pageContainerVariants = cva(
  // h-full para heredar la altura del contenedor padre (que tiene h-dvh-fallback)
  'w-full h-full flex flex-col bg-gradient-white-beige font-ui overflow-hidden',
);
