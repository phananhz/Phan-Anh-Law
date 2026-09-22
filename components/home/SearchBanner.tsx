'use client';

import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import Glass from '@/components/ui/Glass';
import SearchCommand from '@/components/ui/SearchCommand';

export default function SearchBanner() {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <>
      <div className="relative z-30 -mt-10 sm:-mt-12 px-6 sm:px-8 max-w-5xl mx-auto w-full">
        <Glass
          variant="floating"
          cornerRadius={24}
          className="p-3 sm:p-4 bg-white/90 backdrop-blur-2xl border border-stone-900/10 shadow-glass-floating hover:shadow-2xl transition-all cursor-pointer group"
          onClick={() => setOpenSearch(true)}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 flex-1 min-w-0 pl-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-900/10 text-emerald-brand group-hover:bg-[#153E35] group-hover:text-white transition-colors">
                <Search className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-sm sm:text-base text-stone-500 font-normal truncate">
                  Tìm kiếm lĩnh vực, chuyên gia hoặc bài phân tích pháp lý...
                </span>
                <span className="hidden md:inline-flex items-center gap-3 text-[11px] text-stone-400 font-medium mt-0.5">
                  <span className="hover:text-emerald-brand">Đầu tư FDI</span>
                  <span>•</span>
                  <span className="hover:text-emerald-brand">Thẩm định M&A</span>
                  <span>•</span>
                  <span className="hover:text-emerald-brand">Nghị định 13</span>
                  <span>•</span>
                  <span className="hover:text-emerald-brand">Thuế TNDN</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pr-2 shrink-0">
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-medium text-stone-500 bg-stone-100 rounded-lg border border-stone-200">
                ⌘ K / Ctrl K
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-white group-hover:bg-[#153E35] transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Glass>
      </div>

      <SearchCommand isOpen={openSearch} onClose={() => setOpenSearch(false)} />
    </>
  );
}
