'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Search } from 'lucide-react';
import type { NewsArticle } from '@/data/news';

export default function NewsIndex({ articles }: { articles: NewsArticle[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const categories = ['Tất cả', ...Array.from(new Set(articles.map((article) => article.category)))];
  const filtered = useMemo(() => articles.filter((article) => {
    const matchesCategory = category === 'Tất cả' || article.category === category;
    const haystack = (article.title + ' ' + article.excerpt).toLocaleLowerCase();
    return matchesCategory && haystack.includes(query.toLocaleLowerCase().trim());
  }), [articles, category, query]);

  return (
    <main className="min-h-screen bg-[#F4F3EF] px-6 pb-24 pt-36 sm:px-8 sm:pt-44">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl border-b border-stone-300/60 pb-12 sm:pb-16">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-brand">NEWSROOM</div>
          <h1 className="font-serif text-5xl tracking-tight text-stone-900 sm:text-7xl">Tin tức</h1>
          <p className="mt-5 text-base leading-relaxed text-stone-600 sm:text-xl">Những hoạt động, sự kiện và câu chuyện phía sau các mối quan hệ mà Phan Anh Law đồng hành.</p>
        </div>
        <div className="flex flex-col gap-4 border-b border-stone-200/80 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={'rounded-full border px-4 py-2 text-xs font-semibold transition ' + (category === item ? 'border-[#153E35] bg-[#153E35] text-white' : 'border-stone-200 bg-white/70 text-stone-600 hover:bg-white')}>{item}</button>)}</div>
          <label className="relative block sm:w-64"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm tin tức" className="w-full rounded-full border border-stone-200 bg-white/70 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-brand" /></label>
        </div>
        <div className="grid gap-6 pt-10 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <Link key={article.id} href={'/news/' + article.slug} className="group flex flex-col rounded-[1.75rem] border border-stone-200/80 bg-white/70 p-5 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-xl">
              <div
                className={'news-cover ' + article.coverClass + ' flex min-h-[210px] items-end rounded-[1.2rem] bg-cover bg-center p-5'}
                style={article.coverImageUrl ? { backgroundImage: 'url(' + article.coverImageUrl + ')' } : undefined}
              >
                <span className="rounded-full border border-white/30 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">{article.category}</span>
              </div>
              <div className="mt-5 text-xs text-stone-500">{article.publishDate} · {article.readTime}</div>
              <h2 className="mt-3 font-serif text-2xl leading-tight text-stone-900 transition group-hover:text-emerald-brand">{article.title}</h2>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-stone-600">{article.excerpt}</p>
              <div className="mt-auto flex items-center justify-between border-t border-stone-100 pt-5 text-xs font-semibold text-stone-500"><span>{article.author}</span><ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-brand" /></div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && <div className="py-20 text-center text-stone-500">Không có tin tức phù hợp.</div>}
      </div>
    </main>
  );
}