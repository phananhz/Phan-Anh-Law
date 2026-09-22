import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { practices } from '@/data/practices';
import SectionHeading from '@/components/ui/SectionHeading';

export const metadata = {
  title: 'Lĩnh vực tư vấn pháp lý | Phan Anh Law',
  description: 'Danh mục 10 lĩnh vực tư vấn pháp lý doanh nghiệp và đầu tư trọng điểm của Phan Anh Law.',
};

export default function PracticesCatalogPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-8 bg-[#F4F3EF]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl pb-16 border-b border-stone-300/60">
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-brand mb-3">
            PRACTICE AREAS
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#111111] font-normal tracking-tight mb-4">
            Lĩnh vực tư vấn chuyên môn
          </h1>
          <p className="text-base sm:text-xl text-stone-600 leading-relaxed font-light">
            Chúng tôi cung cấp dịch vụ pháp lý toàn diện, đồng hành cùng các quyết định đầu tư, vận hành và tái cấu trúc chiến lược của doanh nghiệp tại Việt Nam.
          </p>
        </div>

        {/* Practices List */}
        <div className="pt-12 space-y-12">
          {practices.map((practice) => (
            <div
              key={practice.id}
              className="p-8 sm:p-12 rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-emerald-800/30 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Col: Number & Title */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-semibold text-emerald-brand bg-emerald-50 px-3 py-1 rounded-md border border-emerald-100">
                      {practice.number}
                    </span>
                    <span className="text-xs font-mono text-stone-400 uppercase tracking-widest">
                      {practice.titleEn}
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] leading-tight">
                    {practice.title}
                  </h2>

                  <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                    {practice.shortDescription}
                  </p>

                  <div className="pt-4">
                    <Link
                      href={`/practices/${practice.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#153E35] text-white text-xs sm:text-sm font-medium hover:bg-[#0E2923] transition-colors shadow"
                    >
                      <span>Xem chi tiết dịch vụ & quy trình</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right Col: Scope of Services */}
                <div className="lg:col-span-7 bg-paper-subtle p-6 sm:p-8 rounded-2xl border border-stone-200/70">
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-brand" />
                    <span>Phạm vi công việc tư vấn tiêu biểu:</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-700">
                    {practice.services.slice(0, 6).map((service, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-brand shrink-0 mt-0.5" />
                        <span className="leading-snug">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
