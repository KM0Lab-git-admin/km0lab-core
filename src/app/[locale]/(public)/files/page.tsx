import SafeHydration from '@/components/ui/safe-hydration/SafeHydration';
import { LogoHeader } from '@/components/ui/logo-header';
import FilesList from '@/components/files/FilesList/FilesList';

export default function FilesPage() {
  return (
    <SafeHydration>
      <div className="w-full min-h-screen flex flex-col">
        {/* AppHeader */}
        <LogoHeader />
        
        {/* Files Container */}
        <div className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="w-full max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
                Gestión de Archivos
              </h1>
              <p className="text-neutral-600">
                Archivos de tu repositorio de OpenAI
              </p>
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-800 text-sm">
                <p className="font-medium">🚫 Limitación de OpenAI</p>
                <p className="mt-1">
                  OpenAI NO permite descargar archivos a través de su API, independientemente del propósito.
                  Para descargar tus archivos JSON, debes acceder manualmente al{' '}
                  <a 
                    href="https://platform.openai.com/storage/files" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:text-red-900"
                  >
                    dashboard de OpenAI Platform
                  </a>.
                </p>
              </div>
            </div>
            
            <FilesList />
          </div>
        </div>
      </div>
    </SafeHydration>
  );
}
