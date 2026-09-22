'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, ShieldCheck, Factory, Globe } from 'lucide-react';
import { practices } from '@/data/practices';
import { industries } from '@/data/industries';

interface MegaMenuProps {
  type: 'practices' | 'industries';
  onClose: () => void;
}

export default function MegaMenu({ type, onClose }: MegaMenuProps) {
  if (type === 'practices') {
    return (
      <div className="w-[840px] p-6 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-stone-200/80 animate-fade-in">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-brand">
              Lĩnh vực tư vấn pháp lý
            </span>
            <p className="text-xs text-stone-500 mt-0.5">
              Giải pháp toàn diện từ giai đoạn gia nhập thị trường đến quản trị vận hành
            </p>
          </div>
          <Link
            href="/practices"
            onClick={onClose}
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-brand hover:text-emerald-900 transition-colors"
          >
            <span>Tất cả 10 lĩnh vực</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {practices.map((practice) => (
            <Link
              key={practice.id}
              href={`/practices/${practice.slug}`}
              onClick={onClose}
              className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-stone-50 transition-colors"
            >
              <div className="mt-1 font-mono text-[11px] font-semibold text-stone-400 group-hover:text-emerald-brand transition-colors">
                {practice.number}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 font-medium text-sm text-stone-900 group-hover:text-emerald-brand transition-colors">
                  <span>{practice.title}</span>
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
                <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                  {practice.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-4 pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 bg-stone-50/50 -mx-6 -mb-6 p-4 rounded-b-2xl">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-brand" />
            <span>Tư vấn theo tiêu chuẩn quốc tế cho doanh nghiệp FDI & Tập đoàn lớn</span>
          </span>
          <Link
            href="/contact"
            onClick={onClose}
            className="font-medium text-stone-900 hover:text-emerald-brand"
          >
            Yêu cầu năng lực hồ sơ (Credentials) →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[840px] p-6 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-stone-200/80 animate-fade-in">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-brand">
            Khối ngành kinh doanh trọng điểm
          </span>
          <p className="text-xs text-stone-500 mt-0.5">
            Am hiểu sâu sắc cơ chế vận hành và rủi ro pháp lý theo từng lĩnh vực kinh tế
          </p>
        </div>
        <Link
          href="/#industries"
          onClick={onClose}
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-brand hover:text-emerald-900 transition-colors"
        >
          <span>Khám phá chi tiết</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-3">
        {industries.map((ind) => (
          <Link
            key={ind.id}
            href={`/#industries`}
            onClick={onClose}
            className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-stone-50 transition-colors"
          >
            <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-stone-100 text-stone-600 group-hover:bg-emerald-900/10 group-hover:text-emerald-brand transition-colors">
              <Factory className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 font-medium text-sm text-stone-900 group-hover:text-emerald-brand transition-colors">
                <span>{ind.name}</span>
                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </div>
              <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                {ind.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-4 pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 bg-stone-50/50 -mx-6 -mb-6 p-4 rounded-b-2xl">
        <span className="flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-emerald-brand" />
          <span>Hỗ trợ tiếp cận thị trường và giải quyết vướng mắc đầu tư chuyên ngành</span>
        </span>
        <Link
          href="/contact"
          onClick={onClose}
          className="font-medium text-stone-900 hover:text-emerald-brand"
        >
          Đặt lịch trao đổi với Trưởng nhóm ngành →
        </Link>
      </div>
    </div>
  );
}
