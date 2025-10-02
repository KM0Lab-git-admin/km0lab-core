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
  logoWidth = 144,
  logoHeight = 32,
  className = ""
}: AppHeaderProps) {
  return (
    <div className={`max-w-header h-header inline-flex justify-center items-center gap-header ${className}`}>
      <div className="p-logo-padding inline-flex flex-col justify-start items-start">
        <Image
          className="w-logo h-logo"
          src={logoSrc}
          alt={logoAlt}
          width={logoWidth}
          height={logoHeight}
          priority
        />
      </div>
    </div>
  );
}