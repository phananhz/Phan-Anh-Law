import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getCurrentAdmin } from '@/lib/auth';
import NewsActions from '@/components/admin/NewsActions';

type NewsStatus = 'draft' | 'published' | 'archived';
type AdminArticle = { id: string; slug: string; title: string; status: NewsStatus; published_at: string | null; updated_at: string };

const statusOptions: Array<{ value: NewsStatus | ''; label: string }> = [
  { value: '', label: 'Tất cả trạng thái' },
  { value: 'published', label: 'Đang hiển thị' },
  { value: 'draft', label: 'Bản nháp' },
  { value: 'archived', label: 'Đang ẩn' },
];

function cleanQuery(value: string) {
  return value.replace(/[,%().*]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80);
}

function statusLabel(status: NewsStatus) {
  return statusOptions.find((item) => item.value === status)?.label || status;
}

export default async function AdminNewsPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string; page?: string }> }) {
  const params = await searchParams;
  const queryText = cleanQuery(params.q || '');
  const status = statusOptions.some((item) => item.value === params.status) ? (params.status as NewsStatus | '') : '';
  const requestedPage = Number.parseInt(params.page || '1', 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const pageSize = 25;
  const from = (page - 1) * pageSize;
  const supabase = await createSupabaseServerClient();
  const admin = await getCurrentAdmin();
  let articles: AdminArticle[] = [];
  let total = 0;

  if (supabase) {
    let request = supabase.from('articles').select('id, slug, title, status, published_at, updated_at', { count: 'exact' }).eq('content_kind', 'news');
    if (status) request = request.eq('status', status);
    if (queryText) request = request.or('title.ilike.%' + queryText + '%,slug.ilike.%' + queryText + '%');
    const result = await request.order('updated_at', { ascending: false }).range(from, from + pageSize - 1);
    if (result.error) throw new Error('Không thể tải danh sách bài viết.');
    articles = (result.data || []) as AdminArticle[];
    total = result.count || 0;
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageHref = (nextPage: number) => {
    const values = new URLSearchParams();
    if (queryText) values.set('q', queryText);
    if (status) values.set('status', status);
    values.set('page', String(nextPage));
    return '/admin/news?' + values.toString();
  };

  return <div className="px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-brand">CONTENT</div><h1 className="mt-3 font-serif text-5xl tracking-tight text-stone-900">Tin tức</h1><p className="mt-3 text-sm text-stone-500">Quản lý bài viết hiển thị trên website.</p></div><Link href="/admin/news/new" className="inline-flex w-fit items-center gap-2 rounded-full bg-[#153E35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0E2923]"><Plus className="h-4 w-4" />Đăng bài mới</Link></div>
    <form method="get" className="mt-8 grid gap-3 rounded-2xl border border-stone-200 bg-white/70 p-4 sm:grid-cols-[1fr_220px_auto]"><label className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" /><input name="q" defaultValue={queryText} placeholder="Tìm theo tiêu đề hoặc slug" className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 pl-10 text-sm outline-none focus:border-emerald-brand" /></label><select name="status" defaultValue={status} className="rounded-xl border border-stone-200 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-brand">{statusOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select><button type="submit" className="rounded-xl bg-[#153E35] px-5 py-3 text-sm font-semibold text-white">Lọc</button></form>
    <div className="mt-6 overflow-hidden rounded-2xl border border-stone-200 bg-white/80 shadow-sm">{articles.length ? <div className="divide-y divide-stone-100">{articles.map((article) => <div key={article.id} className="flex flex-col gap-4 p-5 transition hover:bg-stone-50 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><h2 className="truncate font-serif text-xl text-stone-900">{article.title}</h2><div className="mt-1 truncate text-xs text-stone-500">/{article.slug}</div></div><div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end"><div className="text-right text-xs text-stone-500"><div className="rounded-full bg-stone-100 px-3 py-1">{statusLabel(article.status)}</div><div className="mt-1">Cập nhật {article.updated_at?.slice(0, 10)}</div></div><NewsActions id={article.id} status={article.status} canDelete={admin?.role === 'super_admin'} /></div></div>)}</div> : <div className="p-12 text-center text-sm text-stone-500">{queryText || status ? 'Không có bài viết phù hợp.' : 'Chưa có bài viết trong Supabase. Hãy tạo bài đầu tiên để bài xuất hiện trên website.'}</div>}</div>
    {totalPages > 1 && <div className="mt-5 flex items-center justify-between text-sm text-stone-500"><span>Trang {page} / {totalPages}</span><div className="flex gap-2">{page > 1 ? <Link href={pageHref(page - 1)} className="rounded-full border border-stone-200 bg-white px-4 py-2 font-semibold text-stone-700">Trước</Link> : <span />}{page < totalPages && <Link href={pageHref(page + 1)} className="rounded-full border border-stone-200 bg-white px-4 py-2 font-semibold text-stone-700">Sau</Link>}</div></div>}
  </div>;
}
