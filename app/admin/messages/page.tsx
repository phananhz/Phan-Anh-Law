import { Eye, MessageSquare } from 'lucide-react';
import { createSupabaseServerClient } from '@/lib/supabase/server';

type ContactMessage = { id: string; full_name: string; company: string; email: string; practice: string; status: string; created_at: string };

export default async function AdminMessagesPage() {
  const supabase = await createSupabaseServerClient();
  const result = supabase ? await supabase.from('contact_messages').select('id, full_name, company, email, practice, status, created_at').order('created_at', { ascending: false }).limit(50) : { data: null };
  const messages = (result.data || []) as ContactMessage[];

  return <div className="px-6 py-10 sm:px-10 lg:px-14 lg:py-14"><div className="flex items-end justify-between gap-5"><div><div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-brand">INBOX</div><h1 className="mt-3 font-serif text-5xl tracking-tight text-stone-900">Tin nhắn</h1></div><div className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-brand">{messages.length} bản ghi gần nhất</div></div><div className="mt-10 overflow-hidden rounded-2xl border border-stone-200 bg-white/80 shadow-sm">{messages.length ? <div className="divide-y divide-stone-100">{messages.map((message) => <div key={message.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex min-w-0 items-start gap-3"><div className="mt-0.5 rounded-xl bg-emerald-50 p-2 text-emerald-brand"><MessageSquare className="h-4 w-4" /></div><div className="min-w-0"><div className="truncate text-sm font-semibold text-stone-900">{message.full_name} · {message.company}</div><div className="mt-1 truncate text-xs text-stone-500">{message.email} · {message.practice}</div></div></div><div className="flex items-center gap-4 text-xs text-stone-500"><span>{new Date(message.created_at).toLocaleDateString('vi-VN')}</span><span className="rounded-full bg-stone-100 px-3 py-1">{message.status}</span><button aria-label={`Xem tin nhắn của ${message.full_name}`} className="rounded-full p-2 transition hover:bg-stone-100"><Eye className="h-4 w-4" /></button></div></div>)}</div> : <div className="p-12 text-center text-sm text-stone-500">Chưa có tin nhắn. Khi Supabase được cấu hình, yêu cầu từ form liên hệ sẽ xuất hiện tại đây.</div>}</div></div>;
}
