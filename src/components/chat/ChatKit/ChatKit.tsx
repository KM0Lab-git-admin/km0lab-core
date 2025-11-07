'use client';

import { ChatKit, useChatKit } from '@openai/chatkit-react';
import { useEffect, useState } from 'react';

type ChatKitProps = {
  className?: string;
};

const ChatKitComponent: React.FC<ChatKitProps> = ({ className }) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { control } = useChatKit({
    api: {
      async getClientSecret() {
        try {
          const res = await fetch('/api/chatkit/session', { method: 'POST' });

          if (!res.ok) {
            const errorData = await res.json().catch(() => ({ error: 'Error desconocido' }));
            throw new Error(errorData.error || 'No se pudo crear la sesión ChatKit');
          }

          const data = await res.json();
          return data.client_secret;
        }
        catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
          setError(errorMessage);
          throw err;
        }
      },
    },
  });

  useEffect(() => {
    if (control) {
      setIsLoading(false);
    }
  }, [control]);

  if (error) {
    return (
      <div className={`${className} min-h-[600px] w-full flex items-center justify-center bg-white rounded-lg shadow-lg p-4`}>
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-red-700 text-sm max-w-md">
          <p className="font-medium mb-1">Error al cargar ChatKit</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading || !control) {
    return (
      <div className={`${className} min-h-[600px] w-full flex items-center justify-center bg-white rounded-lg shadow-lg`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-km0-blue rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-km0-blue rounded-full animate-bounce animate-delay-200" />
            <div className="w-2 h-2 bg-km0-blue rounded-full animate-bounce animate-delay-400" />
          </div>
          <p className="text-neutral-500 text-sm">Cargando asistente...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} bg-white rounded-lg shadow-lg flex items-center justify-center`}>
      <ChatKit control={control} className="h-[600px] w-full max-w-[800px]" />
    </div>
  );
};

export default ChatKitComponent;
