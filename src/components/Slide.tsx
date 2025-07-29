import Image, { StaticImageData } from 'next/image';
import type { FC } from 'react';

export interface SlideProps {
  title: string;
  subtitle: string;
  imageSrc: string | StaticImageData;
  xp?: number;
  logoSrc?: string;
}

const Slide: FC<SlideProps> = ({ title, subtitle, imageSrc, xp, logoSrc }) => (
  <div className="flex flex-col items-center justify-center h-full w-full px-2">
    <div className="relative w-full max-w-xs mx-auto rounded-xl bg-km0-beige-100 shadow-lg p-4 flex flex-col items-center">
      <h2 className="font-brand text-3xl md:text-4xl text-km0-blue-700 text-left w-full leading-tight mb-2">
        {title}
      </h2>
      <div className="w-full flex-1 flex items-center justify-center my-2">
        <Image
          src={imageSrc}
          alt="Ilustración slide"
          width={180}
          height={180}
          className="object-contain mx-auto"
          priority
        />
      </div>
      {xp && (
        <div className="absolute left-4 bottom-4">
          <span className="bg-km0-coral-400 text-white text-sm font-semibold rounded-lg px-3 py-1 shadow">
            + {xp} XP
          </span>
        </div>
      )}
      {logoSrc && (
        <div className="absolute right-4 bottom-4">
          <Image
            src={logoSrc}
            alt="Logo KM0LAB"
            width={60}
            height={24}
            className="object-contain"
            priority
          />
        </div>
      )}
    </div>
    <div className="mt-6 w-full text-center">
      <h3 className="font-brand text-2xl md:text-3xl font-bold mb-2">{subtitle}</h3>
    </div>
  </div>
);

export default Slide; 