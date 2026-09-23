'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LayoutDashboard, LogOut, Newspaper, MessageSquare, UsersRound } from 'lucide-react';
import type { CurrentAdmin } from '@/lib/auth';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';

const navigation = [
  { href: '/admin', label: 'Tổng quan', icon: LayoutDashboard },
  { href: '/admin/messages', label: 'Tin nhắn', icon: MessageSquare },
  { href: '/admin/news', label: 'Tin tức', icon: Newspaper },
  { href: '/admin/partners', label: 'Đối tác', icon: UsersRound },
];

export default function AdminShell({ children, admin }: { children: React.ReactNode; admin: CurrentAdmin | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);

  async function signOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase?.auth.signOut();
    router.replace('/login');
    router.refresh();
  }

  function handleNavigation(href: string) {
    if (href !== pathname) setPendingHref(href);
  }

  return (
    <div className="min-h-screen bg-[#F4F3EF] lg:flex">
      <aside aria-busy={Boolean(pendingHref)} className="border-b border-stone-200 bg-[#101312] px-5 py-5 text-white lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col lg:border-b-0 lg:border-r lg:border-white/10 lg:px-7 lg:py-8">
        <Link href="/" className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white font-serif font-bold text-[#153E35]">PA</span><span><span className="block font-serif text-lg">Phan Anh</span><span className="block text-[9px] uppercase tracking-[0.22em] text-stone-400">Admin Studio</span></span></Link>
        <nav className="mt-10 flex gap-2 overflow-x-auto lg:flex-col">
          {navigation.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/admin' && Boolean(pathname?.startsWith(href + '/')));
            const classes = 'flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-3 text-sm transition ' + (active ? 'bg-white text-[#153E35]' : 'text-stone-300 hover:bg-white/10 hover:text-white') + (pendingHref === href ? ' opacity-70' : '');
            return <Link key={href} href={href} prefetch onClick={() => handleNavigation(href)} aria-current={active ? 'page' : undefined} className={classes}><Icon className="h-4 w-4" />{label}{pendingHref === href && <span className="ml-auto h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" aria-label="Đang tải" />}</Link>;
          })}
        </nav>
        <div className="mt-10 border-t border-white/10 pt-6 lg:mt-auto">
          {admin ? <><div className="truncate text-sm font-semibold text-white">{admin.displayName}</div><div className="mt-1 truncate text-xs text-stone-500">{admin.email}</div></> : <div className="text-xs leading-relaxed text-amber-200/80">Supabase chưa được cấu hình. Đây là chế độ preview.</div>}
          <button onClick={signOut} className="mt-5 inline-flex items-center gap-2 text-xs text-stone-400 transition hover:text-white"><LogOut className="h-3.5 w-3.5" />Đăng xuất</button>
        </div>
      </aside>
      <main className="min-w-0 flex-1 lg:ml-72" aria-busy={Boolean(pendingHref)}>
        {pendingHref && <div role="status" className="fixed right-5 top-5 z-50 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/95 px-4 py-2 text-xs font-semibold text-stone-700 shadow-lg"><span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-emerald-brand border-t-transparent" />Đang tải dữ liệu…</div>}
        {children}
      </main>
    </div>
  );
}
