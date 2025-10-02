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
    <div className={`w-full h-auto flex justify-center items-center py-1 ${className}`}>
      <Image
        className="w-auto h-10 xs:h-12 sm:h-14 md:h-16"
        src={logoSrc}
        alt={logoAlt}
        width={logoWidth}
        height={logoHeight}
        priority
      />
    </div>
  );
}