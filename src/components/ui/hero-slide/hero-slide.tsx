import type { VariantProps } from 'class-variance-authority';
import type React from 'react';

import { MediaFrame } from '@/components/ui/media-frame';
import type { MediaFrameProps } from '@/components/ui/media-frame';
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
  /** Controla la altura máxima de la imagen (fluido por defecto). */
  imageMaxHeight?: MediaFrameProps['imageMaxHeight'];
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
  imageMaxHeight = 'fluid',
  className,
  ...props
}: HeroSlideProps) => {
  const isSide = layout === 'side';
  const resolvedAlign: 'left' | 'center' = isSide ? 'left' : (align ?? 'center');
  const resolvedTitleSize = density === 'compact' ? 'heroCompact' : 'hero';
  const resolvedSubtitleSize = density === 'compact' ? 'heroCompact' : 'hero';
  const resolvedImageMaxHeight = density === 'compact' ? 'compact' : imageMaxHeight;

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
          bgColor,
        )}
        layout={isSide ? 'side' : 'stack'}
        imageMaxHeight={resolvedImageMaxHeight}
      />

      <div className={cn(heroContentVariants({ align: resolvedAlign, layout }))}>
        <div className={cn(heroTextWrapperVariants({ density }))}>
          <Title
            as="h1"
            size={resolvedTitleSize}
            align={resolvedAlign}
          >
            {title}
          </Title>

          {subtitle && (
            <Subtitle
              size={resolvedSubtitleSize}
              align={resolvedAlign}
              className="max-w-[clamp(32ch,5vw,52ch)]"
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
