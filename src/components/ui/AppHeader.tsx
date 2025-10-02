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
    <div className={`w-96 h-16 flex justify-center items-center pt-3 ${className}`}>
      <Image
        className="w-70 h-17"
        src={logoSrc}
        alt={logoAlt}
        width={logoWidth}
        height={logoHeight}
        priority
      />
    </div>
  );
}