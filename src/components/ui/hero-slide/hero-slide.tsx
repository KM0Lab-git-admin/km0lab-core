import type { VariantProps } from 'class-variance-authority';
import type React from 'react';

import { MediaFrame } from '@/components/ui/media-frame';
import { Subtitle } from '@/components/ui/primitives/subtitle';
import { Title } from '@/components/ui/primitives/title';
import { cn } from '@/components/ui/primitives/utils';

import {
  heroContentVariants,
  heroSlideVariants,
  heroTextWrapperVariants,
} from './hero-slide.styles';

export interface HeroSlideProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof heroSlideVariants> {
  /** Título principal (ReactNode para permitir énfasis). */
  title: React.ReactNode;
  /** Subtítulo o descripción (ReactNode). */
  subtitle?: React.ReactNode;
  /** Fuente de la imagen hero. */
  imageSrc: string;
  /** Texto alternativo de la imagen. */
  imageAlt?: string;
  /** Texto del badge sobre la imagen (ej: '+ 10 XP'). */
  badgeText?: string;
  /** Clase de color de fondo para el MediaFrame. */
  bgColor?: string;
  /** Alineación del texto en modo stack (default: center). */
  align?: VariantProps<typeof heroContentVariants>['align'];
}

/**
 * Componente de composición para slides o héroes.
 * Usa Title y Subtitle primitives.
 * Layout 'stack' cambia a horizontal en laptop-short automáticamente vía CSS.
 */
const HeroSlide = ({
  title,
  subtitle,
  imageSrc,
  imageAlt = '',
  badgeText,
  bgColor,
  layout = 'stack',
  density = 'default',
  align = 'center',
  className,
  ...props
}: HeroSlideProps) => {
  const isSide = layout === 'side';

  return (
    <div
      className={cn(heroSlideVariants({ layout, density }), className)}
      {...props}
    >
      <MediaFrame
        src={imageSrc}
        alt={imageAlt}
        badgeText={badgeText}
        tone={bgColor ? undefined : 'default'}
        className={cn(
          'shrink-0 transition-all',
          !isSide && 'laptop-short:w-[45%]',
          bgColor,
        )}
        layout={isSide ? 'side' : 'stack'}
      />

      <div className={cn(heroContentVariants({ align: isSide ? 'left' : align, layout }))}>
        <div className={cn(heroTextWrapperVariants({ density }))}>
          <Title
            as="h1"
            size="h1"
            align={isSide ? 'left' : align as any}
            className="laptop-short:text-2xl"
          >
            {title}
          </Title>

          {subtitle && (
            <Subtitle
              size="md"
              align={isSide ? 'left' : align as any}
              className="max-w-[45ch] laptop-short:text-xs"
            >
              {subtitle}
            </Subtitle>
          )}
        </div>
      </div>
    </div>
  );
};

HeroSlide.displayName = 'HeroSlide';

export { HeroSlide };
