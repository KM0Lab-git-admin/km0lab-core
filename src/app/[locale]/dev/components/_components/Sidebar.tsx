'use client';

import { useMemo, useState } from 'react';
import type { ComponentEntry } from '../registry';

type SidebarProps = {
  items: ComponentEntry[];
  selectedId: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSelect: (id: string) => void;
  onCopyImport: (entry: ComponentEntry) => void | Promise<void>;
};

const groupLabels: Record<ComponentEntry['group'], string> = {
  ui: 'UI / Primitives',
  screens: 'Screens',
  features: 'Features',
};

export default function Sidebar({
  items,
  selectedId,
  searchQuery,
  onSearchChange,
  onSelect,
  onCopyImport,
}: SidebarProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const groups: Record<ComponentEntry['group'], ComponentEntry[]> = {
      ui: [],
      screens: [],
      features: [],
    };
    items.forEach(item => {
      groups[item.group].push(item);
    });
    return groups;
  }, [items]);

  const handleCopy = async (entry: ComponentEntry) => {
    await onCopyImport(entry);
    setCopiedId(entry.id);
    setTimeout(() => setCopiedId(null), 1200);
  };

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3">
        <input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por nombre o ruta..."
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div className="space-y-6">
        {(Object.keys(grouped) as ComponentEntry['group'][]).map(group => {
          const list = grouped[group];
          if (!list.length) return null;

          return (
            <div key={group}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {groupLabels[group]}
              </p>
              <div className="space-y-2">
                {list.map(item => {
                  const isActive = item.id === selectedId;
                  return (
                    <div
                      key={item.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => onSelect(item.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelect(item.id);
                        }
                      }}
                      className={`group flex w-full cursor-pointer items-start justify-between rounded-lg border px-3 py-2 text-left transition ${
                        isActive
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                        <p className="text-[11px] font-mono text-slate-500">
                          {item.filePath.replace('src/components/', '')}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(item);
                        }}
                        className="ml-2 rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-600 transition hover:border-indigo-400 hover:text-indigo-600"
                      >
                        {copiedId === item.id ? 'Copiado' : 'Copiar'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
