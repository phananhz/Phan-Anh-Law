import Link from 'next/link';
import { ArrowUpRight, FileText, MessageSquare, UsersRound } from 'lucide-react';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/config';

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient();
  let messageCount = 0;
  let unreadCount = 0;
  let articleCount = 0;

  if (supabase) {
    const [messages, unread, articles] = await Promise.all([
      supabase.from('contact_messages').select('id', { count: 'exact', head: true }),
      supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('status', 'new'),
      supabase.from('articles').select('id', { count: 'exact', head: true }).eq('content_kind', 'news'),
    ]);
    messageCount = messages.count || 0;
    unreadCount = unread.count || 0;
    articleCount = articles.count || 0;
  }

  const cards = [
    { label: 'Tổng yêu cầu', value: messageCount, href: '/admin/messages', icon: MessageSquare },
    { label: 'Chưa xử lý', value: unreadCount, href: '/admin/messages?status=new', icon: UsersRound },
    { label: 'Bài tin tức', value: articleCount, href: '/admin/news', icon: FileText },
  ];

  return <div className="px-6 py-10 sm:px-10 lg:px-14 lg:py-14"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-brand">ADMIN STUDIO</div><h1 className="mt-3 font-serif text-5xl tracking-tight text-stone-900">Tổng quan</h1><p className="mt-3 max-w-xl text-sm leading-relaxed text-stone-500">Theo dõi yêu cầu tư vấn và quản lý nội dung Tin tức từ một nơi.</p></div><Link href="/admin/news/new" className="inline-flex w-fit items-center gap-2 rounded-full bg-[#153E35] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#0E2923]">Đăng bài mới <ArrowUpRight className="h-4 w-4" /></Link></div><div className="mt-10 grid gap-4 md:grid-cols-3">{cards.map(({ label, value, href, icon: Icon }) => <Link key={label} href={href} className="rounded-2xl border border-stone-200 bg-white/75 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"><div className="flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">{label}</span><Icon className="h-5 w-5 text-emerald-brand" /></div><div className="mt-5 font-serif text-5xl text-stone-900">{value}</div></Link>)}</div><div className="mt-6 rounded-2xl border border-stone-200 bg-white/65 p-6 text-sm leading-relaxed text-stone-600">{isSupabaseConfigured() ? 'Số liệu đang được đọc trực tiếp từ Supabase và chỉ hiển thị cho tài khoản có quyền quản trị.' : 'Đây là chế độ preview. Hãy thêm NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY trên Vercel, sau đó chạy schema Supabase để bật dữ liệu thật.'}</div></div>;
}
