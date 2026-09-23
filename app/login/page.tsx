'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, LockKeyhole, ShieldCheck } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';
import { isSupabaseConfigured } from '@/lib/config';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const configured = isSupabaseConfigured();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError('Hệ thống đăng nhập chưa được cấu hình. Vui lòng thêm biến môi trường Supabase trên Vercel.');
      setLoading(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError('Thông tin đăng nhập không hợp lệ hoặc tài khoản chưa được cấp quyền.');
      setLoading(false);
      return;
    }

    router.replace('/admin');
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#101312] px-6 py-24 sm:px-8">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.07] p-7 text-white shadow-glass-dark backdrop-blur-xl sm:p-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-bold text-[#153E35]">PA</div>
        <div className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-sage-brand">KHU VỰC QUẢN TRỊ</div>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">Đăng nhập</h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-300">Dành riêng cho đội ngũ được ủy quyền của Phan Anh Law.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm text-stone-200">Email<input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-stone-500 focus:border-sage-brand" placeholder="admin@phananhlaw.vn" /></label>
          <label className="block text-sm text-stone-200">Mật khẩu<input type="password" required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none focus:border-sage-brand" /></label>
          {error && <p role="alert" className="rounded-xl border border-red-300/30 bg-red-400/10 px-4 py-3 text-sm text-red-100">{error}</p>}
          <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-[#153E35] transition hover:bg-sage-light disabled:cursor-wait disabled:opacity-60">{loading ? 'Đang xác thực…' : 'Đăng nhập'}<ArrowRight className="h-4 w-4" /></button>
        </form>
        <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 text-xs text-stone-400"><div className="flex items-center gap-2"><LockKeyhole className="h-4 w-4 text-sage-brand" />Session bảo mật phía máy chủ</div><div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-sage-brand" />Không có đăng ký công khai</div></div>
        {!configured && <p className="mt-5 text-[11px] leading-relaxed text-amber-200/80">Chế độ preview: giao diện đã sẵn sàng, cần thêm Supabase URL và publishable key để đăng nhập.</p>}
      </div>
    </main>
  );
}
