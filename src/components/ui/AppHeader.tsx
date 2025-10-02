import React from 'react';
import Image from 'next/image';

interface AppHeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
  className?: string;
}

export function AppHeader({ 
  logoSrc = "/assets/images/logo1.svg",
  logoAlt = "KM0 LAB Logo",
  logoWidth = 280,
  logoHeight = 70,
  className = ""
}: AppHeaderProps) {
  return (
    <div className={`w-full h-auto flex justify-center items-center ${className}`}>
      <Image
        className="w-auto h-8 xs:h-10 sm:h-12 md:h-14"
        src={logoSrc}
        alt={logoAlt}
        width={logoWidth}
        height={logoHeight}
        priority
      />
    </div>
  );
}