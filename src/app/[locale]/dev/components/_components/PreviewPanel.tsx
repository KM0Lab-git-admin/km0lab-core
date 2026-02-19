import type { ComponentEntry } from '../registry';
import { useTranslations } from 'next-intl';
import CodeSnippet from './CodeSnippet';
import ErrorBoundary from './ErrorBoundary';

type PreviewPanelProps = {
  entry: ComponentEntry;
  screenshots: string[];
  importStatement: string;
  usageSnippet: string;
  onCopyImport: () => void | Promise<void>;
};

const PendingDemoMessage = ({ title }: { title: string }) => {
  const t = useTranslations('ComponentRegistry');
  return (
    <div className="rounded-lg border border-dashed border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
      {t('pending_demo')}
      {' '}
      <span className="font-semibold">{title}</span>
      . {t('pending_demo_description')}
    </div>
  );
};

export default function PreviewPanel({
  entry,
  screenshots,
  importStatement,
  usageSnippet,
  onCopyImport,
}: PreviewPanelProps) {
  const t = useTranslations('ComponentRegistry');
  const DemoComponent = entry.Demo ?? entry.Component;

  const getGroupLabel = (group: ComponentEntry['group']) => {
    switch (group) {
      case 'ui':
        return t('ui_primitives');
      case 'features':
        return t('features');
      case 'screens':
        return t('screens');
      default:
        return group;
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <header className="flex flex-col gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
            {getGroupLabel(entry.group)}
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
          {t('copy_import')}
        </button>
      </header>

      <div className="space-y-4 py-4">
        {/* Preview - ancho completo */}
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

        {/* Import y Snippet - debajo en grid horizontal */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <CodeSnippet code={importStatement} label={t('import')} />
          <CodeSnippet code={usageSnippet} label={t('snippet')} />
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
            <p>
              <span className="font-semibold">{t('export')}:</span>
              {' '}
              {entry.exportType === 'named' ? t('named') : t('default')}
            </p>
            <p>
              <span className="font-semibold">{t('path')}:</span>
              {' '}
              {entry.importPath}
            </p>
          </div>
        </div>
      </div>

      {screenshots.length > 0 && (
        <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">{t('screenshots')}</h3>
            <span className="text-[11px] text-slate-500">{screenshots.length} {t('assets')}</span>
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
