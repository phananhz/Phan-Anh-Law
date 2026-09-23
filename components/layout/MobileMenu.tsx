'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, ChevronDown, Search, ArrowRight, Phone, Mail } from 'lucide-react';
import { practices } from '@/data/practices';
import { industries } from '@/data/industries';
import { offices } from '@/data/navigation';
import Glass from '@/components/ui/Glass';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export default function MobileMenu({ isOpen, onClose, onOpenSearch }: MobileMenuProps) {
  const [openSection, setOpenSection] = useState<'practices' | 'industries' | null>(null);

  if (!isOpen) return null;

  const toggleSection = (section: 'practices' | 'industries') => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#F4F3EF]/95 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200/60">
        <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#153E35] flex items-center justify-center text-white font-serif font-semibold text-lg tracking-wider">
            PA
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg tracking-tight text-stone-900 leading-none">
              PHAN ANH
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-stone-500 font-medium">
              Legal Advisory
            </span>
          </div>
        </Link>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-stone-200/50 text-stone-700 hover:bg-stone-200 active:scale-95 transition-all"
          aria-label="Đóng menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Search Bar Trigger */}
      <div className="px-6 py-4">
        <button
          onClick={() => {
            onClose();
            onOpenSearch();
          }}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/80 border border-stone-200/80 text-stone-500 text-sm shadow-sm"
        >
          <span className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-stone-400" />
            <span>Tìm kiếm lĩnh vực, chuyên gia, bài viết...</span>
          </span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-stone-400 bg-stone-100 rounded border border-stone-200">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 px-6 py-2 space-y-1">
        {/* Accordion: Lĩnh vực */}
        <div>
          <button
            onClick={() => toggleSection('practices')}
            className="w-full flex items-center justify-between py-3.5 text-lg font-serif text-stone-900 font-medium border-b border-stone-200/50"
          >
            <span>Lĩnh vực tư vấn</span>
            <ChevronDown
              className={`w-5 h-5 text-stone-400 transition-transform ${
                openSection === 'practices' ? 'rotate-180 text-emerald-brand' : ''
              }`}
            />
          </button>
          {openSection === 'practices' && (
            <div className="py-2 pl-3 space-y-2 border-b border-stone-200/50">
              {practices.map((p) => (
                <Link
                  key={p.id}
                  href={`/practices/${p.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between py-1.5 text-sm text-stone-600 hover:text-emerald-brand"
                >
                  <span>{p.title}</span>
                  <span className="font-mono text-xs text-stone-400">{p.number}</span>
                </Link>
              ))}
              <Link
                href="/practices"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 pt-2 text-xs font-semibold text-emerald-brand"
              >
                <span>Xem tất cả lĩnh vực</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Accordion: Ngành nghề */}
        <div>
          <button
            onClick={() => toggleSection('industries')}
            className="w-full flex items-center justify-between py-3.5 text-lg font-serif text-stone-900 font-medium border-b border-stone-200/50"
          >
            <span>Ngành nghề kinh doanh</span>
            <ChevronDown
              className={`w-5 h-5 text-stone-400 transition-transform ${
                openSection === 'industries' ? 'rotate-180 text-emerald-brand' : ''
              }`}
            />
          </button>
          {openSection === 'industries' && (
            <div className="py-2 pl-3 space-y-2 border-b border-stone-200/50">
              {industries.map((ind) => (
                <Link
                  key={ind.id}
                  href="/#industries"
                  onClick={onClose}
                  className="block py-1.5 text-sm text-stone-600 hover:text-emerald-brand"
                >
                  {ind.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          href="/people"
          onClick={onClose}
          className="flex items-center justify-between py-3.5 text-lg font-serif text-stone-900 font-medium border-b border-stone-200/50"
        >
          <span>Chuyên gia & Luật sư</span>
          <ArrowRight className="w-4 h-4 text-stone-400" />
        </Link>

        <Link
          href="/insights"
          onClick={onClose}
          className="flex items-center justify-between py-3.5 text-lg font-serif text-stone-900 font-medium border-b border-stone-200/50"
        >
          <span>Góc pháp lý & Phân tích</span>
          <ArrowRight className="w-4 h-4 text-stone-400" />
        </Link>

        <Link
          href="/news"
          onClick={onClose}
          className="flex items-center justify-between py-3.5 text-lg font-serif text-stone-900 font-medium border-b border-stone-200/50"
        >
          <span>Tin tức</span>
          <ArrowRight className="w-4 h-4 text-stone-400" />
        </Link>
        <Link
          href="/about"
          onClick={onClose}
          className="flex items-center justify-between py-3.5 text-lg font-serif text-stone-900 font-medium border-b border-stone-200/50"
        >
          <span>Về Phan Anh Law</span>
          <ArrowRight className="w-4 h-4 text-stone-400" />
        </Link>

        <Link
          href="/contact"
          onClick={onClose}
          className="flex items-center justify-between py-3.5 text-lg font-serif text-stone-900 font-medium border-b border-stone-200/50"
        >
          <span>Liên hệ văn phòng</span>
          <ArrowRight className="w-4 h-4 text-stone-400" />
        </Link>
      </nav>

      {/* Bottom CTA & Office Contact */}
      <div className="p-6 bg-stone-100/70 border-t border-stone-200/60 space-y-4">
        <Link
          href="/contact"
          onClick={onClose}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#153E35] text-white text-sm font-medium shadow-md"
        >
          <span>Liên hệ tư vấn chiến lược</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <div className="pt-2 text-xs text-stone-500 space-y-2">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-emerald-brand shrink-0" />
            <span>Hà Nội: {offices[0].phone} • TP.HCM: {offices[1].phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-emerald-brand shrink-0" />
            <span>contact@phananhlaw.vn</span>
          </div>
        </div>
      </div>
    </div>
  );
}
