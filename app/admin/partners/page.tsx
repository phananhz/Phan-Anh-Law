import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink, Plus, Search } from 'lucide-react';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { partners } from '@/data/partners';
import PartnerActions from '@/components/admin/PartnerActions';
import PartnerMotionSettings from '@/components/admin/PartnerMotionSettings';

type PartnerRow = { id: string; name: string; short_name: string; descriptor: string; website: string | null; logo_path: string | null; sort_order: number; display_row: number | null; is_active: boolean };

function cleanQuery(value: string) {
  return value.trim().slice(0, 80);
}

export default async function AdminPartnersPage({ searchParams }: { searchParams: Promise<{ q?: string; active?: string; page?: string }> }) {
  const params = await searchParams;
  const queryText = cleanQuery(params.q || '');
  const active = params.active === 'true' || params.active === 'false' ? params.active : '';
  const requestedPage = Number.parseInt(params.page || '1', 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const pageSize = 25;
  const from = (page - 1) * pageSize;
  const supabase = await createSupabaseServerClient();
  let rows: PartnerRow[] = [];
  let total = 0;
  let motionEnabled = true;

  if (supabase) {
    let request = supabase.from('partners').select('id, name, short_name, descriptor, website, logo_path, sort_order, display_row, is_active', { count: 'exact' });
    if (queryText) request = request.ilike('name', '%' + queryText + '%');
    if (active) request = request.eq('is_active', active === 'true');
    const [result, settingResult] = await Promise.all([
      request.order('display_row', { ascending: true }).order('sort_order', { ascending: true }).order('name', { ascending: true }).range(from, from + pageSize - 1),
      supabase.from('site_settings').select('value').eq('key', 'partners_motion_enabled').maybeSingle(),
    ]);
    if (result.error) throw new Error('Không thể tải danh sách đối tác.');
    rows = (result.data || []) as PartnerRow[];
    total = result.count || 0;
    motionEnabled = settingResult.data?.value !== false;
  } else {
    const filtered = partners.filter((partner) => (!queryText || partner.name.toLowerCase().includes(queryText.toLowerCase())) && (!active || String(Boolean(partner.isActive)) === active));
    total = filtered.length;
    rows = filtered.map((partner) => ({ id: partner.id, name: partner.name, short_name: partner.shortName, descriptor: partner.descriptor, website: partner.website || null, logo_path: partner.logoUrl || null, sort_order: partner.sortOrder || 0, display_row: partner.displayRow || 1, is_active: partner.isActive !== false })).slice(from, from + pageSize);
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageHref = (nextPage: number) => {
    const values = new URLSearchParams();
    if (queryText) values.set('q', queryText);
    if (active) values.set('active', active);
    values.set('page', String(nextPage));
    return '/admin/partners?' + values.toString();
  };

  return <div className="px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-brand">RELATIONSHIPS</div><h1 className="mt-3 font-serif text-5xl tracking-tight text-stone-900">Đối tác</h1><p className="mt-3 text-sm text-stone-500">Quản lý các đối tác và vị trí hiển thị trên trang chủ.</p></div><Link href="/admin/partners/new" className="inline-flex w-fit items-center gap-2 rounded-full bg-[#153E35] px-5 py-3 text-sm font-semibold text-white"><Plus className="h-4 w-4" />Thêm đối tác</Link></div>
    <PartnerMotionSettings initialEnabled={motionEnabled} />
    <form method="get" className="mt-8 grid gap-3 rounded-2xl border border-stone-200 bg-white/70 p-4 sm:grid-cols-[1fr_200px_auto]"><label className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" /><input name="q" defaultValue={queryText} placeholder="Tìm theo tên đối tác" className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 pl-10 text-sm outline-none focus:border-emerald-brand" /></label><select name="active" defaultValue={active} className="rounded-xl border border-stone-200 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-brand"><option value="">Tất cả trạng thái</option><option value="true">Đang hiển thị</option><option value="false">Đang ẩn</option></select><button type="submit" className="rounded-xl bg-[#153E35] px-5 py-3 text-sm font-semibold text-white">Lọc</button></form>
    <div className="mt-6 overflow-hidden rounded-2xl border border-stone-200 bg-white/80 shadow-sm">{rows.length ? <div className="divide-y divide-stone-100">{rows.map((partner) => <div key={partner.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex min-w-0 items-center gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#153E35] font-serif text-sm font-bold text-white">{partner.logo_path ? <img src={partner.logo_path} alt={partner.name} loading="lazy" className="h-full w-full bg-white object-contain p-1" /> : partner.short_name}</div><div className="min-w-0"><div className="truncate text-sm font-semibold text-stone-900">{partner.name}</div><div className="mt-1 truncate text-xs text-stone-500">{partner.descriptor || 'Chưa có mô tả'}</div>{partner.website && <a href={partner.website} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs text-emerald-brand">{partner.website}<ExternalLink className="h-3 w-3" /></a>}</div></div><div className="flex items-center justify-between gap-4 sm:justify-end"><div className="text-right text-xs text-stone-500"><div>Dòng {partner.display_row === 2 || partner.display_row === 3 ? partner.display_row : 1} · Thứ tự {partner.sort_order}</div><div className="mt-1 rounded-full bg-stone-100 px-3 py-1">{partner.is_active ? 'Đang hiển thị' : 'Đang ẩn'}</div></div><PartnerActions id={partner.id} active={partner.is_active} /></div></div>)}</div> : <div className="p-12 text-center text-sm text-stone-500">{queryText || active ? 'Không có đối tác phù hợp.' : 'Chưa có đối tác. Hãy thêm bản ghi đầu tiên.'}</div>}</div>
    {totalPages > 1 && <div className="mt-5 flex items-center justify-between text-sm text-stone-500"><span>Trang {page} / {totalPages}</span><div className="flex gap-2">{page > 1 ? <Link href={pageHref(page - 1)} className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 font-semibold text-stone-700"><ArrowLeft className="h-4 w-4" />Trước</Link> : <span />}{page < totalPages && <Link href={pageHref(page + 1)} className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 font-semibold text-stone-700">Sau<ArrowRight className="h-4 w-4" /></Link>}</div></div>}
  </div>;
}
