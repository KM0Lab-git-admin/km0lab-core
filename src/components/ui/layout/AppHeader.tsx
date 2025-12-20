type AppHeaderProps = {
  logoAlt?: string;
  className?: string;
};

export function AppHeader({
  logoAlt = 'KMØ LAB®',
  className = '',
}: AppHeaderProps) {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div
        className="logo-1"
        role="img"
        aria-label={logoAlt}
      />
    </div>
  );
}
