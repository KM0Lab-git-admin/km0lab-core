'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

type CodeSnippetProps = {
  code: string;
  label?: string;
};

export default function CodeSnippet({ code, label }: CodeSnippetProps) {
  const t = useTranslations('ComponentRegistry');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label ?? t('usage')}</p>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-600 transition hover:border-indigo-400 hover:text-indigo-600"
        >
          {copied ? t('copied') : t('copy')}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3 text-sm text-slate-800">
        <code>{code}</code>
      </pre>
    </div>
  );
}
