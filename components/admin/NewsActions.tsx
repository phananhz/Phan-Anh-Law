'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

type NewsStatus = 'draft' | 'published' | 'archived';

export default function NewsActions({ id, status, canDelete }: { id: string; status: NewsStatus; canDelete: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const visible = status === 'published';

  async function toggleVisibility() {
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/news/' + id + '/status', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: visible ? 'archived' : 'published' }) });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || 'Không thể cập nhật trạng thái.');
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Không thể cập nhật trạng thái.');
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!window.confirm('Xóa bài viết này? Thao tác này không thể hoàn tác.')) return;
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/news/' + id, { method: 'DELETE' });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || 'Không thể xóa bài viết.');
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Không thể xóa bài viết.');
    } finally {
      setBusy(false);
    }
  }

  return <div className="flex flex-wrap items-center justify-end gap-1">
    <Link href={'/preview/news/' + id} target="_blank" rel="noreferrer" className="rounded-full p-2 text-stone-500 hover:bg-stone-100" aria-label="Xem trước bài viết"><Eye className="h-4 w-4" /></Link>
    <Link href={'/admin/news/' + id + '/edit'} className="rounded-full p-2 text-stone-500 hover:bg-stone-100" aria-label="Chỉnh sửa bài viết"><Pencil className="h-4 w-4" /></Link>
    <button type="button" disabled={busy} onClick={() => void toggleVisibility()} className="rounded-full p-2 text-stone-500 hover:bg-stone-100" aria-label={visible ? 'Ẩn bài viết' : 'Hiện bài viết'}>{visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
    {canDelete && <button type="button" disabled={busy} onClick={() => void remove()} className="rounded-full p-2 text-red-700 hover:bg-red-50" aria-label="Xóa bài viết"><Trash2 className="h-4 w-4" /></button>}
    {message && <span role="alert" className="text-xs text-red-700">{message}</span>}
  </div>;
}
