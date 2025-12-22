'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ComponentEntry } from '../registry';
import { componentRegistry } from '../registry';
import PreviewPanel from './PreviewPanel';
import Sidebar from './Sidebar';

type ComponentGalleryProps = {
  screenshots: string[];
};

const buildImportStatement = (entry: ComponentEntry) => {
  const name = entry.exportName ?? entry.title;
  if (entry.exportType === 'named') {
    return `import { ${name} } from '${entry.importPath}';`;
  }
  return `import ${name} from '${entry.importPath}';`;
};

const buildUsageSnippet = (entry: ComponentEntry) => {
  const name = entry.exportName ?? entry.title;
  return `<${name} />`;
};

export default function ComponentGallery({ screenshots }: ComponentGalleryProps) {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(componentRegistry[0]?.id ?? '');

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return componentRegistry;
    return componentRegistry.filter((item) => {
      const haystack = `${item.title} ${item.description ?? ''} ${item.filePath}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [search]);

  useEffect(() => {
    if (!filtered.length) return;
    if (!filtered.some(item => item.id === selectedId)) {
      setSelectedId(filtered[0]?.id ?? selectedId);
    }
  }, [filtered, selectedId]);

  const selectedEntry = filtered.find(item => item.id === selectedId) ?? filtered[0] ?? componentRegistry[0];

  const importStatement = selectedEntry ? buildImportStatement(selectedEntry) : '';
  const usageSnippet = selectedEntry ? buildUsageSnippet(selectedEntry) : '';

  return (
    <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
      <Sidebar
        items={filtered}
        selectedId={selectedEntry?.id ?? ''}
        searchQuery={search}
        onSearchChange={setSearch}
        onSelect={setSelectedId}
        onCopyImport={(entry) => navigator.clipboard?.writeText(buildImportStatement(entry))}
      />

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
          No hay componentes que coincidan con la búsqueda.
        </div>
      ) : selectedEntry ? (
        <PreviewPanel
          entry={selectedEntry}
          screenshots={screenshots}
          importStatement={importStatement}
          usageSnippet={usageSnippet}
          onCopyImport={() => navigator.clipboard?.writeText(importStatement)}
        />
      ) : null}
    </div>
  );
}
