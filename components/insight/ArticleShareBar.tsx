'use client';

import React, { useState } from 'react';
import { Share2, Printer, Check, Copy } from 'lucide-react';
import { LinkedInIcon } from '@/components/ui/Icons';

interface ArticleShareBarProps {
  title: string;
  isInline?: boolean;
}

export default function ArticleShareBar({ title, isInline = false }: ArticleShareBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleShareLinkedIn = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }
  };

  if (isInline) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
          Chia sẻ:
        </span>
        <button
          onClick={handleCopyLink}
          className="p-2 rounded-full bg-white border border-stone-200 text-stone-700 hover:text-emerald-brand hover:border-emerald-brand transition-colors text-xs flex items-center gap-1.5"
          title="Sao chép liên kết"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
        </button>

        <button
          onClick={handleShareLinkedIn}
          className="p-2 rounded-full bg-white border border-stone-200 text-stone-700 hover:text-emerald-brand hover:border-emerald-brand transition-colors text-xs flex items-center gap-1.5"
          title="Chia sẻ qua LinkedIn"
        >
          <LinkedInIcon className="w-3.5 h-3.5" />
          <span>LinkedIn</span>
        </button>

        <button
          onClick={handlePrint}
          className="p-2 rounded-full bg-white border border-stone-200 text-stone-700 hover:text-emerald-brand hover:border-emerald-brand transition-colors text-xs flex items-center gap-1.5"
          title="In trang"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>In</span>
        </button>
      </div>
    );
  }

  return (
    <aside className="space-y-4" aria-label="Tùy chọn chia sẻ">
      <div className="text-[11px] font-semibold uppercase tracking-widest text-stone-400">
        CHIA SẺ BÀI VIẾT
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={handleCopyLink}
          className="group flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-stone-200/80 hover:border-emerald-800/40 text-stone-700 hover:text-emerald-brand text-xs font-medium transition-all shadow-sm"
        >
          <div className="w-6 h-6 rounded-md bg-stone-100 group-hover:bg-emerald-50 flex items-center justify-center transition-colors">
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </div>
          <span>{copied ? 'Đã sao chép URL' : 'Sao chép liên kết'}</span>
        </button>

        <button
          onClick={handleShareLinkedIn}
          className="group flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-stone-200/80 hover:border-emerald-800/40 text-stone-700 hover:text-emerald-brand text-xs font-medium transition-all shadow-sm"
        >
          <div className="w-6 h-6 rounded-md bg-stone-100 group-hover:bg-emerald-50 flex items-center justify-center transition-colors">
            <LinkedInIcon className="w-3.5 h-3.5" />
          </div>
          <span>Chia sẻ LinkedIn</span>
        </button>

        <button
          onClick={handlePrint}
          className="group flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-stone-200/80 hover:border-emerald-800/40 text-stone-700 hover:text-emerald-brand text-xs font-medium transition-all shadow-sm"
        >
          <div className="w-6 h-6 rounded-md bg-stone-100 group-hover:bg-emerald-50 flex items-center justify-center transition-colors">
            <Printer className="w-3.5 h-3.5" />
          </div>
          <span>In / Lưu PDF</span>
        </button>
      </div>
    </aside>
  );
}
