'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { industries } from '@/data/industries';
import SectionHeading from '@/components/ui/SectionHeading';
import Glass from '@/components/ui/Glass';

export default function IndustriesSection() {
  const [activeIndustryId, setActiveIndustryId] = useState(industries[0].id);

  const activeIndustry = industries.find((i) => i.id === activeIndustryId) || industries[0];

  return (
    <section id="industries" className="py-24 sm:py-32 px-6 sm:px-8 bg-paper-alt border-y border-stone-300/40">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="KHỐI NGÀNH TRỌNG ĐIỂM"
          title={
            <>
              Hiểu luật. <br />
              <span className="italic font-light text-stone-600">
                Hiểu cả ngành kinh doanh.
              </span>
            </>
          }
          description="Chúng tôi không chỉ trích dẫn luật theo cách sách vở. Chúng tôi nắm rõ chuỗi cung ứng, cấu trúc chi phí và mô hình doanh thu của từng ngành nghề."
        />

        {/* Two Column Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Interactive Industry List */}
          <div className="lg:col-span-5 space-y-1">
            {industries.slice(0, 8).map((ind, idx) => {
              const isActive = ind.id === activeIndustryId;
              return (
                <button
                  key={ind.id}
                  onMouseEnter={() => setActiveIndustryId(ind.id)}
                  onClick={() => setActiveIndustryId(ind.id)}
                  className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                    isActive
                      ? 'bg-white shadow-md border border-stone-200/90 text-emerald-brand font-semibold translate-x-1'
                      : 'hover:bg-white/60 text-stone-700 font-normal hover:text-stone-950'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-stone-400">
                      0{idx + 1}
                    </span>
                    <span className="font-serif text-lg sm:text-xl">
                      {ind.name}
                    </span>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isActive
                        ? 'text-emerald-brand translate-x-1'
                        : 'text-stone-300 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Preview Content */}
          <div className="lg:col-span-7 sticky top-28">
            <Glass
              variant="card"
              cornerRadius={24}
              className="p-8 sm:p-10 bg-white shadow-xl border border-stone-200/90 transition-all duration-300"
            >
              <div className="flex items-center justify-between pb-6 border-b border-stone-100">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-brand">
                    {activeIndustry.nameEn}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] mt-1">
                    {activeIndustry.name}
                  </h3>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-mono text-stone-400 bg-stone-100 px-3 py-1 rounded-full">
                  <Sparkles className="w-3 h-3 text-emerald-brand" />
                  Industry Insight
                </span>
              </div>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed py-6">
                {activeIndustry.description}
              </p>

              {/* Strategic Highlights for this industry */}
              <div className="space-y-3 pb-8">
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                  Trọng tâm tư vấn đặc thù:
                </div>
                {activeIndustry.highlightPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-brand shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-stone-500">
                  Cần đánh giá rủi ro ngành?
                </span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#153E35] text-white text-xs font-medium hover:bg-[#0E2923] shadow transition-all"
                >
                  <span>Tham vấn chuyên gia ngành</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Glass>
          </div>
        </div>
      </div>
    </section>
  );
}
