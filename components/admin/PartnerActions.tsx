'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Eye, EyeOff, Pencil, Trash2 } from 'lucide-react';

export default function PartnerActions({ id, active }: { id: string; active: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  async function toggle() {
    setBusy(true); setMessage('');
    try {
      const response = await fetch('/api/admin/partners/' + id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isActive: !active }) });
      if (!response.ok) throw new Error('Không thể cập nhật trạng thái.');
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Không thể cập nhật trạng thái.');
    } finally { setBusy(false); }
  }

  async function remove() {
    if (!window.confirm('Xóa đối tác này? Thao tác này không thể hoàn tác.')) return;
    setBusy(true); setMessage('');
    try {
      const response = await fetch('/api/admin/partners/' + id, { method: 'DELETE' });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || 'Không thể xóa đối tác.');
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Không thể xóa đối tác.');
    } finally { setBusy(false); }
  }

  return <div className="flex items-center gap-1"><Link href={'/admin/partners/' + id + '/edit'} className="rounded-full p-2 text-stone-500 hover:bg-stone-100" aria-label="Chỉnh sửa đối tác"><Pencil className="h-4 w-4" /></Link><button type="button" disabled={busy} onClick={() => void toggle()} className="rounded-full p-2 text-stone-500 hover:bg-stone-100" aria-label={active ? 'Ẩn đối tác' : 'Hiện đối tác'}>{active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button><button type="button" disabled={busy} onClick={() => void remove()} className="rounded-full p-2 text-red-700 hover:bg-red-50" aria-label="Xóa đối tác"><Trash2 className="h-4 w-4" /></button>{message && <span role="alert" className="text-xs text-red-700">{message}</span>}</div>;
}
