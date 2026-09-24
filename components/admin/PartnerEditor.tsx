'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type PartnerDraft = {
  id?: string;
  name: string;
  shortName: string;
  descriptor: string;
  website: string;
  logoPath: string;
  sortOrder: number;
  displayRow: 1 | 2 | 3;
  isActive: boolean;
};

export default function PartnerEditor({ initialPartner }: { initialPartner?: PartnerDraft }) {
  const router = useRouter();
  const [form, setForm] = useState<PartnerDraft>(initialPartner || { name: '', shortName: '', descriptor: '', website: '', logoPath: '', sortOrder: 0, displayRow: 1, isActive: true });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  function update<K extends keyof PartnerDraft>(key: K, value: PartnerDraft[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const response = await fetch(form.id ? '/api/admin/partners/' + form.id : '/api/admin/partners', { method: form.id ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || 'Không thể lưu đối tác.');
      router.push('/admin/partners');
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Không thể lưu đối tác.');
    } finally {
      setSaving(false);
    }
  }

  return <form onSubmit={(event) => void save(event)} className="grid gap-6 lg:grid-cols-[1fr_320px]">
    <div className="space-y-5 rounded-2xl border border-stone-200 bg-white/80 p-6 shadow-sm sm:p-8">
      <label className="block text-sm font-semibold text-stone-800">Tên đối tác<input required minLength={2} maxLength={160} value={form.name} onChange={(event) => update('name', event.target.value)} className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-brand" /></label>
      <label className="block text-sm font-semibold text-stone-800">Tên viết tắt<input required minLength={1} maxLength={12} value={form.shortName} onChange={(event) => update('shortName', event.target.value)} className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm uppercase outline-none focus:border-emerald-brand" /></label>
      <label className="block text-sm font-semibold text-stone-800">Mô tả ngắn<input maxLength={160} value={form.descriptor} onChange={(event) => update('descriptor', event.target.value)} className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-brand" /></label>
      <label className="block text-sm font-semibold text-stone-800">Website<input type="url" placeholder="https://example.com" value={form.website} onChange={(event) => update('website', event.target.value)} className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-brand" /></label>
      <label className="block text-sm font-semibold text-stone-800">URL logo<input type="url" placeholder="https://cdn.example.com/logo.png" value={form.logoPath} onChange={(event) => update('logoPath', event.target.value)} className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-brand" /><span className="mt-2 block text-xs font-normal text-stone-500">Có thể để trống; khi chưa có logo, hệ thống hiển thị tên viết tắt.</span></label>
    </div>
    <aside className="h-fit space-y-5 rounded-2xl border border-stone-200 bg-white/80 p-6 shadow-sm lg:sticky lg:top-6">
      <label className="block text-sm font-semibold text-stone-800">Thứ tự trong dòng<input type="number" min={-100000} max={100000} step={1} value={form.sortOrder} onChange={(event) => update('sortOrder', Number(event.target.value))} className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-brand" /></label>
      <label className="block text-sm font-semibold text-stone-800">Dòng hiển thị<select value={form.displayRow} onChange={(event) => update('displayRow', Number(event.target.value) as 1 | 2 | 3)} className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-brand"><option value={1}>Dòng 1</option><option value={2}>Dòng 2</option><option value={3}>Dòng 3</option></select><span className="mt-2 block text-xs font-normal text-stone-500">Mỗi đối tác chỉ xuất hiện ở dòng đã chọn.</span></label>
      <label className="flex items-center gap-3 text-sm font-semibold text-stone-800"><input type="checkbox" checked={form.isActive} onChange={(event) => update('isActive', event.target.checked)} className="h-4 w-4 rounded border-stone-300 text-emerald-brand" />Hiển thị trên website</label>
      <button disabled={saving} type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-[#153E35] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60">{saving ? 'Đang lưu…' : 'Lưu đối tác'}</button>
      {message && <p role="alert" className="text-sm text-red-700">{message}</p>}
    </aside>
  </form>;
}
