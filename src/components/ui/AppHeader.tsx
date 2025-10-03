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
  logoSrc = "/assets/images/logo.png",
  logoAlt = "KMØ LAB®",
  logoWidth = 147,
  logoHeight = 34,
  className = ""
}: AppHeaderProps) {
  return (
    <div className={`w-full px-3.5 py-2 inline-flex flex-col justify-start items-center ${className}`}>
      <Image
        className="w-logo h-logo"
        src={logoSrc}
        alt={logoAlt}
        width={logoWidth}
        height={logoHeight}
        priority
      />
    </div>
  );
}