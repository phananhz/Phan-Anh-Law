import Link from 'next/link';
import { ArrowLeft, CalendarDays, Clock3 } from 'lucide-react';
import type { NewsArticle } from '@/data/news';
import ArticleContent from '@/components/news/ArticleContent';

export default function NewsArticleView({ article, preview = false }: { article: NewsArticle; preview?: boolean }) {
  const coverStyle = article.coverImageUrl
    ? { backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,.2), rgba(0,0,0,.05)), url(' + article.coverImageUrl + ')' }
    : undefined;

  return (
    <article className="min-h-screen bg-[#F4F3EF] px-6 pb-24 pt-36 sm:px-8 sm:pt-44">
      <div className="mx-auto max-w-4xl">
        <Link href={preview ? '/admin/news/' + article.id + '/edit' : '/news'} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-brand transition hover:text-stone-900">
          <ArrowLeft className="h-4 w-4" />{preview ? 'Quay lại biên tập' : 'Tất cả tin tức'}
        </Link>
        <div
          className={'news-cover ' + article.coverClass + ' mt-8 flex min-h-[260px] items-end rounded-[2rem] bg-cover bg-center p-7 sm:min-h-[380px] sm:p-10'}
          style={coverStyle}
        >
          <span className="rounded-full border border-white/30 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">{article.category}</span>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-4 text-xs text-stone-500">
          <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" />{article.publishDate}</span>
          <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" />{article.readTime}</span>
          <span>{article.author}</span>
        </div>
        <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.08] tracking-tight text-stone-900 sm:text-6xl">{article.title}</h1>
        <p className="mt-7 max-w-3xl text-lg leading-relaxed text-stone-600 sm:text-xl">{article.excerpt}</p>
        <div className="mt-12 border-t border-stone-200 pt-10">
          <ArticleContent body={article.body ?? article.content} />
        </div>
      </div>
    </article>
  );
}