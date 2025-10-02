import Image, { StaticImageData } from 'next/image';
import type { FC } from 'react';

export interface SlideProps {
  title: React.ReactNode;
  subtitle: string;
  imageSrc: string | StaticImageData;
  xp?: number;
  logoSrc?: string;
}

const Slide: FC<SlideProps> = ({ title: _title, subtitle, imageSrc, xp, logoSrc }) => (
  <div className="flex flex-col items-center justify-center h-full w-full px-2">
    {/* Card with poster */}
    <div className="relative w-full max-w-sm mx-auto rounded-2xl bg-km0-beige-100 border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-3 overflow-hidden">
      <div className="relative w-full aspect-[3/4] rounded-xl bg-km0-beige-100 overflow-hidden flex items-center justify-center">
        <Image
          src={imageSrc}
          alt="Poster slide"
          fill
          className="object-contain"
          priority
        />
      </div>
      {xp && (
        <div className="absolute left-3 bottom-3 z-20">
          <span className="bg-km0-coral-400 text-white text-xs font-semibold rounded-md px-2.5 py-1 shadow">
            + {xp} XP
          </span>
        </div>
      )}
      {logoSrc && (
        <div className="absolute right-3 bottom-3 z-20">
          <Image
            src={logoSrc}
            alt="Logo KM0LAB"
            width={56}
            height={22}
            className="object-contain"
            priority
          />
        </div>
      )}
    </div>
    <div className="mt-5 w-full text-center">
      <h3 className="text-neutral-900 text-3xl font-black">{subtitle}</h3>
    </div>
  </div>
);

export default Slide; 