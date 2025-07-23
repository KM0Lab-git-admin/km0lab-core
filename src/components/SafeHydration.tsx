"use client";
import { useEffect, useState } from "react";

/**
 * SafeHydration: Renderiza los hijos solo en el cliente para evitar hydration mismatch
 * Úsalo envolviendo el contenido de tus page.tsx o componentes problemáticos.
 */
const SafeHydration = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Mientras no esté en el cliente, no renderiza nada
    return null;
  }

  return <>{children}</>;
};

export default SafeHydration; 