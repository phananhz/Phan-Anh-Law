import React from 'react';
import { FileText, Calendar, BookmarkCheck } from 'lucide-react';
import { LegalCitation } from '@/data/types';

interface LegalReferenceProps {
  citation: LegalCitation;
  className?: string;
}

export default function LegalReference({ citation, className = '' }: LegalReferenceProps) {
  return (
    <div
      className={`my-6 rounded-xl border border-stone-200/90 bg-[#FBFBFA] p-5 transition-colors hover:border-emerald-800/30 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-900/10 text-emerald-brand">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-stone-900 text-sm sm:text-base">
                {citation.document}
              </span>
              {citation.article && (
                <span className="inline-flex items-center rounded-md bg-stone-200/60 px-2 py-0.5 text-xs font-medium text-stone-700">
                  {citation.article}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs sm:text-sm text-stone-600 leading-relaxed">
              {citation.summary}
            </p>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div className="flex items-center gap-1 text-[11px] font-medium text-stone-500 uppercase tracking-wider">
            <Calendar className="h-3 w-3" />
            <span>Hiệu lực</span>
          </div>
          <div className="mt-0.5 font-mono text-xs text-stone-800 font-medium">
            {citation.effectiveDate}
          </div>
        </div>
      </div>
    </div>
  );
}
