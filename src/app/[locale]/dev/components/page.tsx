import fs from 'fs';
import path from 'path';

import ComponentGallery from './_components/ComponentGallery';

function loadScreenshotPaths() {
  const screenshotsDir = path.join(process.cwd(), 'public', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) return [];

  return fs
    .readdirSync(screenshotsDir)
    .filter(file => /\.(png|jpe?g|gif|webp|svg)$/i.test(file))
    .map(file => `/screenshots/${file}`);
}

export default async function ComponentsPage() {
  const screenshots = loadScreenshotPaths();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Dev / Components
          </p>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Component Gallery & Playground
          </h1>
          <p className="text-sm text-slate-600">
            Catálogo manual para probar los componentes UI, features y pantallas sin autodescubrimiento.
          </p>
        </div>

        <ComponentGallery screenshots={screenshots} />
      </div>
    </div>
  );
}
