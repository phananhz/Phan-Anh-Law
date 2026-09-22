'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Clock, Calendar, ArrowUpRight, Filter } from 'lucide-react';
import { insights } from '@/data/insights';
import { removeVietnameseTones } from '@/data/navigation';
import Glass from '@/components/ui/Glass';
import SectionHeading from '@/components/ui/SectionHeading';

const categories = ['Tất cả', 'FDI', 'M&A', 'Thuế', 'Lao động', 'Đầu tư', 'Tuân thủ', 'Doanh nghiệp', 'Thương mại'];

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const filteredInsights = useMemo(() => {
    return insights.filter((item) => {
      const matchesCategory =
        selectedCategory === 'Tất cả' || item.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const cleanQuery = removeVietnameseTones(searchQuery);
      const matchTitle = removeVietnameseTones(item.title).includes(cleanQuery);
      const matchExcerpt = removeVietnameseTones(item.excerpt).includes(cleanQuery);
      const matchAuthor = removeVietnameseTones(item.authorName).includes(cleanQuery);

      return matchTitle || matchExcerpt || matchAuthor;
    }).sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      }
      return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();
    });
  }, [selectedCategory, searchQuery, sortOrder]);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-8 bg-[#F4F3EF]">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Hero */}
        <div className="max-w-3xl pb-12 sm:pb-16 border-b border-stone-300/60">
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-brand mb-3">
            KNOWLEDGE CENTER
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#111111] font-normal tracking-tight mb-4">
            Góc pháp lý & Báo cáo chuyên sâu
          </h1>
          <p className="text-base sm:text-xl text-stone-600 leading-relaxed font-light">
            Phân tích các thay đổi pháp luật và những vấn đề ảnh hưởng trực tiếp đến hoạt động doanh nghiệp, chiến lược M&A và dự án FDI tại Việt Nam.
          </p>
        </div>

        {/* Filter and Search Controls */}
        <div className="py-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-stone-200/80">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#153E35] text-white shadow-sm'
                      : 'bg-white/80 text-stone-600 hover:bg-white hover:text-stone-900 border border-stone-200/60'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm bài viết, tác giả..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-emerald-brand shadow-sm"
              />
            </div>

            {/* Sort Order */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
              className="px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-700 focus:outline-none shadow-sm cursor-pointer"
            >
              <option value="newest">Sắp xếp: Mới nhất</option>
              <option value="oldest">Sắp xếp: Cũ nhất</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="py-4 text-xs text-stone-500 flex items-center justify-between">
          <span>Tìm thấy {filteredInsights.length} ấn phẩm chuyên môn</span>
          {selectedCategory !== 'Tất cả' && (
            <button
              onClick={() => setSelectedCategory('Tất cả')}
              className="text-emerald-brand hover:underline"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>

        {/* Article Grid */}
        {filteredInsights.length === 0 ? (
          <div className="py-20 text-center text-stone-500 bg-white rounded-2xl border border-stone-200/80 my-6">
            <p className="font-serif text-xl text-stone-800">Không có bài viết phù hợp</p>
            <p className="text-sm text-stone-500 mt-1">
              Vui lòng thử từ khóa tìm kiếm khác hoặc chuyển sang danh mục &quot;Tất cả&quot;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {filteredInsights.map((item) => (
              <Link
                key={item.id}
                href={`/insights/${item.slug}`}
                className="group flex flex-col justify-between p-8 rounded-2xl bg-white border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-emerald-800/30 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between text-xs pb-4">
                    <span className="font-semibold text-emerald-brand uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-stone-400 font-mono">{item.formattedDate}</span>
                  </div>

                  <h2 className="font-serif text-xl sm:text-2xl text-[#111111] group-hover:text-emerald-brand transition-colors leading-snug mb-3">
                    {item.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <div className="flex flex-col">
                    <span className="font-medium text-stone-800">{item.authorName}</span>
                    <span className="text-[11px] text-stone-400">{item.readTime}</span>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 group-hover:bg-[#153E35] group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
