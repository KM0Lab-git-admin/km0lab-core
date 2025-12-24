import type { ComponentEntry } from '../registry';
import CodeSnippet from './CodeSnippet';
import ErrorBoundary from './ErrorBoundary';

type PreviewPanelProps = {
  entry: ComponentEntry;
  screenshots: string[];
  importStatement: string;
  usageSnippet: string;
  onCopyImport: () => void | Promise<void>;
};

const PendingDemoMessage = ({ title }: { title: string }) => (
  <div className="rounded-lg border border-dashed border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
    Demo pendiente para
    {' '}
    <span className="font-semibold">{title}</span>
    . Se renderiza el componente con props mínimas.
  </div>
);

export default function PreviewPanel({
  entry,
  screenshots,
  importStatement,
  usageSnippet,
  onCopyImport,
}: PreviewPanelProps) {
  const DemoComponent = entry.Demo ?? entry.Component;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <header className="flex flex-col gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
            {entry.group === 'ui' ? 'UI / Primitives' : entry.group === 'features' ? 'Features' : 'Screens'}
          </p>
          <h2 className="text-2xl font-bold text-slate-900">{entry.title}</h2>
          {entry.description && (
            <p className="text-sm text-slate-600">{entry.description}</p>
          )}
          <p className="text-[11px] font-mono text-slate-500">
            {entry.filePath}
          </p>
        </div>
        <button
          type="button"
          onClick={onCopyImport}
          className="h-9 rounded-md border border-slate-200 bg-indigo-50 px-3 text-sm font-semibold text-indigo-700 transition hover:border-indigo-300 hover:bg-indigo-100"
        >
          Copiar import
        </button>
      </header>

      <div className="grid gap-5 py-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <ErrorBoundary>
              {DemoComponent ? (
                <DemoComponent />
              ) : (
                <PendingDemoMessage title={entry.title} />
              )}
            </ErrorBoundary>
          </div>
          {entry.notes?.length ? (
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
              {entry.notes.map(note => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="space-y-3">
          <CodeSnippet code={importStatement} label="Import" />
          <CodeSnippet code={usageSnippet} label="Snippet" />
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
            <p>
              <span className="font-semibold">Export:</span>
              {' '}
              {entry.exportType === 'named' ? 'named' : 'default'}
            </p>
            <p>
              <span className="font-semibold">Path:</span>
              {' '}
              {entry.importPath}
            </p>
          </div>
        </div>
      </div>

      {screenshots.length > 0 && (
        <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">Screenshots</h3>
            <span className="text-[11px] text-slate-500">{screenshots.length} assets</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {screenshots.map(src => (
              <div
                key={src}
                className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
              >
                <img src={src} alt={src} className="h-40 w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
