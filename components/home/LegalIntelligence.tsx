'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { insights } from '@/data/insights';
import Glass from '@/components/ui/Glass';
import SectionHeading from '@/components/ui/SectionHeading';

const topics = ['Tất cả', 'Đầu tư', 'Doanh nghiệp', 'Thuế', 'Lao động', 'FDI', 'Thương mại', 'M&A'];

export default function LegalIntelligence() {
  const [selectedTopic, setSelectedTopic] = useState('Tất cả');

  const filtered = selectedTopic === 'Tất cả'
    ? insights
    : insights.filter((i) => i.category === selectedTopic || i.title.toLowerCase().includes(selectedTopic.toLowerCase()));

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-8 bg-[#F4F3EF]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="NGHIÊN CỨU & ẤN PHẨM"
          title={
            <>
              Không chỉ cập nhật luật. <br />
              <span className="italic font-light text-stone-600">
                Chúng tôi giải thích luật ảnh hưởng thế nào đến doanh nghiệp.
              </span>
            </>
          }
          description="Báo cáo phân tích đa chiều từ các luật sư cấp cao, giúp người đứng đầu doanh nghiệp hoạch định chính sách thích ứng trước các biến chuyển thể chế."
        />

        {/* Topic Pills with subtle glass */}
        <div className="flex flex-wrap items-center gap-2.5 pb-10">
          {topics.map((topic) => {
            const isActive = selectedTopic === topic;
            return (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`transition-all duration-200 select-none ${
                  isActive
                    ? 'scale-105'
                    : 'hover:scale-102'
                }`}
              >
                <Glass
                  variant="subtle"
                  cornerRadius={9999}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#153E35] text-white border-emerald-900 shadow-md'
                      : 'bg-white/80 text-stone-700 hover:bg-white hover:text-stone-900 border-stone-200/80 shadow-sm'
                  }`}
                >
                  {topic}
                </Glass>
              </button>
            );
          })}
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <Link
              key={item.id}
              href={`/insights/${item.slug}`}
              className="group flex flex-col justify-between p-8 rounded-2xl bg-white border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-emerald-800/30 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between pb-4 text-xs">
                  <span className="font-semibold text-emerald-brand uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-stone-400 font-mono">{item.formattedDate}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#111111] group-hover:text-emerald-brand transition-colors leading-snug mb-3">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  {item.readTime}
                </span>

                <span className="inline-flex items-center gap-1 font-medium text-emerald-brand group-hover:underline">
                  <span>Chi tiết</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
