import type { VariantProps } from 'class-variance-authority';
import type React from 'react';

import { MediaFrame } from '@/components/ui/media-frame';
import { Subtitle } from '@/components/ui/primitives/subtitle';
import { Title } from '@/components/ui/primitives/title';
import { cn } from '@/components/ui/primitives/utils';

import {
  heroSlideVariants,
  heroTextVariants,
} from './hero-slide.styles';

export type HeroSlideProps = {
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
  /** Alineación del texto (default: center). */
  align?: VariantProps<typeof heroTextVariants>['align'];
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & VariantProps<typeof heroSlideVariants>;

/**
 * Componente de composición para slides o héroes.
 * Simplificado: 1 solo wrapper para texto (antes eran 2).
 *
 * - layout="stack": vertical en portrait, horizontal en landscape (default)
 * - layout="side": siempre horizontal
 * - density="compact": reduce gaps, Title h2, Subtitle sm
 * - scale="sm|md|lg": controla el escalado proporcional
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
  scale = 'md',
  align = 'center',
  className,
  ...props
}: HeroSlideProps) => {
  const isSide = layout === 'side';
  const isCompact = density === 'compact';

  const resolvedAlign = isSide ? 'left' : (align ?? 'center');
  const titleSize = isCompact ? 'h2' : 'h1';
  const subtitleSize = isCompact ? 'sm' : 'md';
  const imageMaxHeight = isCompact ? 'compact' : 'default';

  return (
    <div
      className={cn(heroSlideVariants({ layout, density, scale }), className)}
      {...props}
    >
      <MediaFrame
        src={imageSrc}
        alt={imageAlt}
        badgeText={badgeText}
        tone={bgColor ? undefined : 'default'}
        className={cn(
          'shrink-0 transition-all',
          'portrait:w-full portrait:max-w-none portrait:flex-shrink',
          'landscape:w-[40%] landscape:min-w-[180px] landscape:max-w-[280px]',
          bgColor,
        )}
        layout={isSide ? 'side' : 'stack'}
        imageMaxHeight={imageMaxHeight}
      />

      {/* Un solo wrapper para texto (antes eran ContentWrapper + TextWrapper) */}
      <div className={cn(heroTextVariants({ align: resolvedAlign, layout, scale }))}>
        <Title
          as="h1"
          size={titleSize}
          align={resolvedAlign}
        >
          {title}
        </Title>

        {subtitle && (
          <Subtitle
            size={subtitleSize}
            align={resolvedAlign}
            className="max-w-[45ch]"
          >
            {subtitle}
          </Subtitle>
        )}
      </div>
    </div>
  );
};

HeroSlide.displayName = 'HeroSlide';

export { HeroSlide };
