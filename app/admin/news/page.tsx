import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { newsArticles } from '@/data/news';

export default async function AdminNewsPage() {
  const supabase = await createSupabaseServerClient();
  const result = supabase ? await supabase.from('articles').select('id, slug, title, status, published_at, updated_at').eq('content_kind', 'news').order('updated_at', { ascending: false }).limit(50) : { data: null };
  const articles = result.data?.length ? result.data : newsArticles.map((article) => ({ id: article.id, slug: article.slug, title: article.title, status: 'published', published_at: article.publishDate, updated_at: article.publishDate }));

  return <div className="px-6 py-10 sm:px-10 lg:px-14 lg:py-14"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-brand">CONTENT</div><h1 className="mt-3 font-serif text-5xl tracking-tight text-stone-900">Tin tức</h1></div><Link href="/admin/news/new" className="inline-flex w-fit items-center gap-2 rounded-full bg-[#153E35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0E2923]"><Plus className="h-4 w-4" />Đăng bài mới</Link></div><div className="mt-10 overflow-hidden rounded-2xl border border-stone-200 bg-white/80 shadow-sm"><div className="divide-y divide-stone-100">{articles.map((article) => <Link key={article.id} href={`/admin/news/${article.id}/edit`} className="flex flex-col gap-3 p-5 transition hover:bg-stone-50 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-serif text-xl text-stone-900">{article.title}</h2><div className="mt-1 text-xs text-stone-500">/{article.slug}</div></div><div className="flex items-center gap-4 text-xs text-stone-500"><span className="rounded-full bg-stone-100 px-3 py-1">{article.status}</span><span>{article.updated_at?.slice(0, 10)}</span><ArrowUpRight className="h-4 w-4" /></div></Link>)}</div></div></div>;
}
