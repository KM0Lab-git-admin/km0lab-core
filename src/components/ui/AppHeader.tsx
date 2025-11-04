import React from 'react';

type AppHeaderProps = {
  logoAlt?: string;
  className?: string;
};

export function AppHeader({
  logoAlt = 'KMØ LAB®',
  className = '',
}: AppHeaderProps) {
  return (
    <div className={`w-full px-3.5 py-3 sm:py-12 sm:px-12 md-h:py-6 lg-h:py-8 inline-flex flex-col justify-start items-center ${className}`}>
      <div
        className="logo-1"
        aria-label={logoAlt}
      />
    </div>
  );
}
