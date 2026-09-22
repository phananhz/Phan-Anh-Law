import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar, BookOpen, ArrowUpRight } from 'lucide-react';
import { insights } from '@/data/insights';
import Glass from '@/components/ui/Glass';

export default function FeaturedInsight() {
  const featuredArticle = insights.find((i) => i.featured) || insights[0];
  const secondaryInsights = insights.filter((i) => i.id !== featuredArticle.id).slice(0, 3);

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-8 bg-[#101312] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-12 sm:pb-16 border-b border-white/10 gap-6">
          <div>
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-sage-brand mb-3">
              GÓC PHÁP LÝ & BÁO CÁO CHIẾN LƯỢC
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white">
              Phân tích chuyên sâu cho Ban điều hành
            </h2>
          </div>

          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sage-brand hover:text-white transition-colors group shrink-0"
          >
            <span>Xem tất cả bài viết</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Main Grid: Featured Large Card + 3 Secondary Column Items */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Large Featured Article (Col-span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <Link
              href={`/insights/${featuredArticle.slug}`}
              className="group flex flex-col justify-between h-full p-8 sm:p-10 rounded-2xl bg-[#181C1B] border border-white/10 hover:border-white/25 transition-all duration-300"
            >
              <div>
                {/* Abstract Visual Frame */}
                <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden mb-8 bg-gradient-to-br from-[#1C5045] via-[#102922] to-[#0A1612] flex items-center justify-center p-6 border border-white/10">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                  
                  {/* Strategic Subtle Liquid Glass Panel inside illustration */}
                  <Glass
                    variant="subtle"
                    isDark
                    cornerRadius={16}
                    className="p-5 max-w-sm text-center border border-white/20 bg-black/40 backdrop-blur-md"
                  >
                    <div className="text-[11px] font-mono text-sage-brand uppercase tracking-wider mb-1">
                      REGULATORY INTELLIGENCE
                    </div>
                    <div className="font-serif text-base text-white/90 italic">
                      &ldquo;Nghị định 09/2018/NĐ-CP & Quản lý thương mại FDI&rdquo;
                    </div>
                  </Glass>
                </div>

                {/* Metadata Pills */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400 mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-sage-brand border border-emerald-800/40 font-medium">
                    {featuredArticle.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-stone-500" />
                    {featuredArticle.formattedDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-500" />
                    {featuredArticle.readTime}
                  </span>
                </div>

                {/* Title and Excerpt */}
                <h3 className="font-serif text-2xl sm:text-3xl text-white group-hover:text-sage-light transition-colors leading-snug mb-4">
                  {featuredArticle.title}
                </h3>
                <p className="text-sm sm:text-base text-stone-400 leading-relaxed line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
              </div>

              {/* Author & Read Action */}
              <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
                <span className="font-medium text-stone-300">
                  Tác giả: {featuredArticle.authorName} ({featuredArticle.authorRole})
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-sage-brand group-hover:text-white transition-colors">
                  <span>Đọc bài phân tích</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>

          {/* 3 Secondary Insights (Col-span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {secondaryInsights.map((item) => (
              <Link
                key={item.id}
                href={`/insights/${item.slug}`}
                className="group flex flex-col justify-between p-6 rounded-2xl bg-[#151918] border border-white/5 hover:border-white/20 hover:bg-[#1A1F1E] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                    <span className="font-medium text-sage-brand">{item.category}</span>
                    <span className="text-[11px] text-stone-500">{item.formattedDate}</span>
                  </div>

                  <h4 className="font-serif text-lg text-white group-hover:text-sage-brand transition-colors line-clamp-2 leading-snug mb-2">
                    {item.title}
                  </h4>

                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-stone-500">
                  <span>{item.readTime}</span>
                  <span className="flex items-center gap-1 text-stone-400 group-hover:text-white transition-colors font-medium">
                    Chi tiết <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
