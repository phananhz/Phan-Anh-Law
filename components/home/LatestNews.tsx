import Link from 'next/link';
import { ArrowUpRight, CalendarDays } from 'lucide-react';
import { getPublishedNews } from '@/lib/news';

export default async function LatestNews() {
  const articles = (await getPublishedNews()).slice(0, 3);
  const [featured, ...secondary] = articles;
  if (!featured) return null;

  return (
    <section data-nav-theme="dark" className="bg-[#213331] px-6 py-24 text-white sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-10 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-sage-brand">TIN TỨC</div>
            <h2 className="font-serif text-4xl tracking-tight sm:text-5xl">Những cập nhật từ Phan Anh Law.</h2>
          </div>
          <Link href="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-sage-light transition hover:text-white">Xem tất cả tin tức <ArrowUpRight className="h-4 w-4" /></Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <Link href={'/news/' + featured.slug} className="group rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 transition hover:border-white/25 hover:bg-white/[0.1] sm:p-7">
            <div
              className={'news-cover ' + featured.coverClass + ' flex min-h-[260px] items-end rounded-[1.35rem] bg-cover bg-center p-6 sm:min-h-[330px]'}
              style={featured.coverImageUrl ? { backgroundImage: 'url(' + featured.coverImageUrl + ')' } : undefined}
            >
              <span className="rounded-full border border-white/30 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">{featured.category}</span>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs text-stone-400"><CalendarDays className="h-3.5 w-3.5" />{featured.publishDate} · {featured.readTime}</div>
            <h3 className="mt-3 max-w-2xl font-serif text-3xl leading-tight text-white transition group-hover:text-sage-light sm:text-4xl">{featured.title}</h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-400">{featured.excerpt}</p>
          </Link>

          <div className="grid gap-5">
            {secondary.map((article) => (
              <Link key={article.id} href={'/news/' + article.slug} className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/25 hover:bg-white/[0.09] sm:p-7">
                <div className="flex items-center justify-between gap-4 text-xs text-stone-500"><span className="font-semibold uppercase tracking-[0.16em] text-sage-brand">{article.category}</span><span>{article.publishDate}</span></div>
                <h3 className="mt-5 font-serif text-2xl leading-tight text-white transition group-hover:text-sage-light">{article.title}</h3>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-stone-400">{article.excerpt}</p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-stone-500"><span>{article.readTime}</span><ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-sage-light" /></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}