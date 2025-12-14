'use client';

import { useEffect, useState } from 'react';

type OpenAIFile = {
  id: string;
  object: string;
  bytes: number;
  created_at: number;
  filename: string;
  purpose: string;
};

type FilesListProps = {
  className?: string;
};

const FilesList: React.FC<FilesListProps> = ({ className }) => {
  const [files, setFiles] = useState<OpenAIFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch('/api/files/list');
        
        if (!res.ok) {
          throw new Error('Error al cargar archivos');
        }

        const data = await res.json();
        setFiles(data.data || []);
      }
      catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleCopyId = (fileId: string) => {
    navigator.clipboard.writeText(fileId);
    alert('ID copiado al portapapeles');
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Math.round(bytes / k ** i * 100) / 100} ${sizes[i]}`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className={`${className} flex items-center justify-center p-8`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-km0-blue rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-km0-blue rounded-full animate-bounce animate-delay-200" />
            <div className="w-2 h-2 bg-km0-blue rounded-full animate-bounce animate-delay-400" />
          </div>
          <p className="text-neutral-500 text-sm">Cargando archivos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className} p-4`}>
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className={`${className} p-8 text-center`}>
        <p className="text-neutral-500">No hay archivos disponibles</p>
      </div>
    );
  }

  return (
    <div className={`${className} p-4`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                  Tamaño
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                  Propósito
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-neutral-600 uppercase tracking-wider">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {files.map((file) => (
                <tr key={file.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-neutral-900 font-medium">
                    {file.filename}
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-600">
                    {formatBytes(file.bytes)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      file.purpose === 'assistants' 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {file.purpose}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-600">
                    {formatDate(file.created_at)}
                  </td>
                  <td className="px-4 py-3 text-xs text-neutral-500 font-mono">
                    {file.id}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => handleCopyId(file.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Copiar ID</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FilesList;

