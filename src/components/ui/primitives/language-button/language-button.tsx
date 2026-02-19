'use client';

import type { VariantProps } from 'class-variance-authority';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import * as React from 'react';

import { cn } from '../utils';
import {
  languageButtonVariants,
  languageButtonContentVariants,
  languageButtonTextContainerVariants,
  languageButtonTitleVariants,
  languageButtonSubtitleVariants,
  languageButtonFlagVariants,
  languageButtonIconVariants,
} from './language-button.styles';

export type LanguageButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof languageButtonVariants> & {
    /** Ruta o StaticImageData de la bandera del idioma */
    flagSrc: string | StaticImageData;
    /** Texto alternativo para la bandera */
    flagAlt: string;
    /** Título principal del botón */
    title: string;
    /** Subtítulo del botón */
    subtitle: string;
    /** Ancho de la bandera en píxeles */
    flagWidth?: number;
    /** Alto de la bandera en píxeles */
    flagHeight?: number;
  };

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('w-[18px] h-[18px]', className)}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.36569 0.234315C1.05327 -0.0781049 0.546734 -0.0781049 0.234315 0.234315C-0.0781049 0.546734 -0.0781049 1.05327 0.234315 1.36569L4.86863 6L0.234315 10.6343C-0.0781049 10.9467 -0.0781049 11.4533 0.234315 11.7657C0.546734 12.0781 1.05327 12.0781 1.36569 11.7657L6.56569 6.56569C6.71572 6.41566 6.8 6.21217 6.8 6C6.8 5.78783 6.71572 5.58434 6.56569 5.43431L1.36569 0.234315Z"
      fill="currentColor"
    />
  </svg>
);

const LanguageButton = React.forwardRef<HTMLButtonElement, LanguageButtonProps>(
  (
    {
      className,
      variant,
      size,
      flagSrc,
      flagAlt,
      title,
      subtitle,
      flagWidth = 24,
      flagHeight = 24,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(languageButtonVariants({ variant, size }), className)}
        {...props}
      >
        <div className={languageButtonContentVariants()}>
          <div className={languageButtonFlagVariants()}>
            <Image
              src={flagSrc}
              alt={flagAlt}
              width={flagWidth}
              height={flagHeight}
              className={cn(
                'rounded-full',
                (variant === 'fold' || variant === 'default' || variant === 'destructive') && 'ring-[1.5px] ring-white',
                variant === 'secondary' && 'ring-[1.5px] ring-km0-blue-700',
              )}
            />
          </div>
          <div className={languageButtonTextContainerVariants()}>
            <span className={cn(languageButtonTitleVariants({ variant }), size === 'xs' ? 'text-xs' : size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-base' : 'text-sm')}>
              {title}
            </span>
            <span className={cn(languageButtonSubtitleVariants({ variant }), size === 'xs' ? 'text-[10px]' : size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-sm' : 'text-xs')}>
              {subtitle}
            </span>
          </div>
        </div>
        <ChevronRightIcon className={languageButtonIconVariants()} />
      </button>
    );
  },
);

LanguageButton.displayName = 'LanguageButton';

export { LanguageButton };

