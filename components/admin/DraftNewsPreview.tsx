'use client';

import { useEffect, useState } from 'react';
import type { NewsArticle } from '@/data/news';
import NewsArticleView from '@/components/news/NewsArticleView';

const PREVIEW_KEY = 'phan-anh-law-news-preview';

export default function DraftNewsPreview() {
  const [article, setArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    try {
      const value = window.sessionStorage.getItem(PREVIEW_KEY);
      if (value) setArticle(JSON.parse(value) as NewsArticle);
    } catch {
      setArticle(null);
    }
  }, []);

  if (!article) return <div className="min-h-screen bg-[#F4F3EF] px-6 py-40 text-center text-sm text-stone-600">Không tìm thấy bản xem trước. Hãy quay lại trình soạn thảo và mở lại.</div>;

  return <><div className="fixed left-1/2 top-3 z-[60] -translate-x-1/2 rounded-full border border-amber-300 bg-amber-50/95 px-4 py-2 text-xs font-semibold text-amber-900 shadow-lg backdrop-blur">Bản xem trước — chưa phải trang xuất bản</div><NewsArticleView article={article} preview /></>;
}
