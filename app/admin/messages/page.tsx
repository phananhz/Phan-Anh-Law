import Link from 'next/link';
import { ArrowLeft, ArrowRight, Eye, MessageSquare, Search } from 'lucide-react';
import { createSupabaseServerClient } from '@/lib/supabase/server';

type MessageStatus = 'new' | 'in_progress' | 'resolved' | 'spam';
type ContactMessage = { id: string; full_name: string; company: string; email: string; phone: string; practice: string; status: MessageStatus; created_at: string };

const statuses: Array<{ value: MessageStatus | ''; label: string }> = [
  { value: '', label: 'Tất cả trạng thái' },
  { value: 'new', label: 'Mới' },
  { value: 'in_progress', label: 'Đang xử lý' },
  { value: 'resolved', label: 'Đã xử lý' },
  { value: 'spam', label: 'Spam' },
];

function cleanQuery(value: string) {
  return value.replace(/[,%().*]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80);
}

function statusLabel(status: MessageStatus) {
  return statuses.find((item) => item.value === status)?.label || status;
}

export default async function AdminMessagesPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string; page?: string }> }) {
  const params = await searchParams;
  const queryText = cleanQuery(params.q || '');
  const status = statuses.some((item) => item.value === params.status) ? (params.status as MessageStatus | '') : '';
  const requestedPage = Number.parseInt(params.page || '1', 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const pageSize = 25;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const supabase = await createSupabaseServerClient();

  let messages: ContactMessage[] = [];
  let total = 0;
  if (supabase) {
    let request = supabase.from('contact_messages').select('id, full_name, company, email, phone, practice, status, created_at', { count: 'exact' });
    if (status) request = request.eq('status', status);
    if (queryText) request = request.or('full_name.ilike.%' + queryText + '%,company.ilike.%' + queryText + '%,email.ilike.%' + queryText + '%');
    const result = await request.order('created_at', { ascending: false }).range(from, to);
    if (result.error) throw new Error('Không thể tải tin nhắn.');
    messages = (result.data || []) as ContactMessage[];
    total = result.count || 0;
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageHref = (nextPage: number) => {
    const values = new URLSearchParams();
    if (queryText) values.set('q', queryText);
    if (status) values.set('status', status);
    values.set('page', String(nextPage));
    return '/admin/messages?' + values.toString();
  };

  return <div className="px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div><div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-brand">INBOX</div><h1 className="mt-3 font-serif text-5xl tracking-tight text-stone-900">Tin nhắn</h1><p className="mt-3 text-sm text-stone-500">Xử lý yêu cầu tư vấn gửi từ website.</p></div>
      <div className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-brand">{total} bản ghi</div>
    </div>
    <form method="get" className="mt-8 grid gap-3 rounded-2xl border border-stone-200 bg-white/70 p-4 sm:grid-cols-[1fr_200px_auto]">
      <label className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" /><input name="q" defaultValue={queryText} placeholder="Tìm tên, công ty hoặc email" className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 pl-10 text-sm outline-none focus:border-emerald-brand" /></label>
      <select name="status" defaultValue={status} className="rounded-xl border border-stone-200 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-brand">{statuses.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select>
      <button type="submit" className="rounded-xl bg-[#153E35] px-5 py-3 text-sm font-semibold text-white">Lọc</button>
    </form>
    <div className="mt-6 overflow-hidden rounded-2xl border border-stone-200 bg-white/80 shadow-sm">
      {messages.length ? <div className="divide-y divide-stone-100">{messages.map((message) => <Link key={message.id} href={'/admin/messages/' + message.id} aria-label={'Mở tin nhắn của ' + message.full_name} className="flex flex-col gap-4 p-5 transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-brand sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3"><div className="mt-0.5 rounded-xl bg-emerald-50 p-2 text-emerald-brand"><MessageSquare className="h-4 w-4" aria-hidden="true" /></div><div className="min-w-0"><div className="truncate text-sm font-semibold text-stone-900">{message.full_name} · {message.company}</div><div className="mt-1 truncate text-xs text-stone-500">{message.email} · {message.practice}</div><div className="mt-1 text-xs text-stone-400">{message.phone}</div></div></div>
        <div className="flex items-center gap-4 text-xs text-stone-500"><span>{new Date(message.created_at).toLocaleDateString('vi-VN')}</span><span className="rounded-full bg-stone-100 px-3 py-1">{statusLabel(message.status)}</span><span className="rounded-full p-2" aria-hidden="true"><Eye className="h-4 w-4" /></span></div>
      </Link>)}</div> : <div className="p-12 text-center text-sm text-stone-500">{queryText || status ? 'Không có tin nhắn phù hợp.' : 'Chưa có tin nhắn. Khi form liên hệ được gửi, yêu cầu sẽ xuất hiện tại đây.'}</div>}
    </div>
    {totalPages > 1 && <div className="mt-5 flex items-center justify-between text-sm text-stone-500"><span>Trang {page} / {totalPages}</span><div className="flex gap-2">{page > 1 ? <Link href={pageHref(page - 1)} className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 font-semibold text-stone-700"><ArrowLeft className="h-4 w-4" />Trước</Link> : <span />}{page < totalPages && <Link href={pageHref(page + 1)} className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 font-semibold text-stone-700">Sau<ArrowRight className="h-4 w-4" /></Link>}</div></div>}
  </div>;
}
