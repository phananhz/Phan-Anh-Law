import Link from 'next/link';
import { ArrowLeft, Mail, MessageSquare, Phone } from 'lucide-react';
import { notFound } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import MessageStatusControl from '@/components/admin/MessageStatusControl';

type MessageStatus = 'new' | 'in_progress' | 'resolved' | 'spam';
type ContactMessage = { id: string; full_name: string; company: string; email: string; phone: string; practice: string; message: string; status: MessageStatus; privacy_consent_at: string; created_at: string; updated_at: string };

export default async function AdminMessageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) notFound();
  const result = await supabase.from('contact_messages').select('id, full_name, company, email, phone, practice, message, status, privacy_consent_at, created_at, updated_at').eq('id', id).maybeSingle();
  if (result.error) throw new Error('Không thể tải tin nhắn.');
  const message = result.data as ContactMessage | null;
  if (!message) notFound();

  return <div className="px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
    <Link href="/admin/messages" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-brand"><ArrowLeft className="h-4 w-4" />Quay lại Tin nhắn</Link>
    <div className="mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-brand">INBOX / DETAIL</div><h1 className="mt-3 font-serif text-5xl tracking-tight text-stone-900">{message.full_name}</h1><p className="mt-3 text-sm text-stone-500">{message.company} · {message.practice}</p></div><MessageStatusControl id={message.id} initialStatus={message.status} /></div>
    <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
      <article className="rounded-2xl border border-stone-200 bg-white/80 p-6 shadow-sm sm:p-8"><div className="flex items-center gap-3 text-stone-500"><MessageSquare className="h-5 w-5 text-emerald-brand" /><span className="text-xs font-semibold uppercase tracking-[0.16em]">Nội dung yêu cầu</span></div><p className="mt-6 whitespace-pre-wrap text-base leading-8 text-stone-700">{message.message}</p></article>
      <aside className="h-fit space-y-5 rounded-2xl border border-stone-200 bg-white/80 p-6 shadow-sm"><div><div className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Liên hệ</div><a href={'mailto:' + message.email} className="mt-3 flex items-center gap-2 text-sm font-semibold text-emerald-brand"><Mail className="h-4 w-4" />{message.email}</a><a href={'tel:' + message.phone} className="mt-3 flex items-center gap-2 text-sm font-semibold text-emerald-brand"><Phone className="h-4 w-4" />{message.phone}</a></div><div className="border-t border-stone-200 pt-5 text-xs leading-6 text-stone-500"><div>Gửi lúc: {new Date(message.created_at).toLocaleString('vi-VN')}</div><div>Đồng ý bảo mật: {new Date(message.privacy_consent_at).toLocaleString('vi-VN')}</div><div>Cập nhật: {new Date(message.updated_at).toLocaleString('vi-VN')}</div></div></aside>
    </div>
  </div>;
}
