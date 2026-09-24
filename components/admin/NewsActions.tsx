'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

type NewsStatus = 'draft' | 'published' | 'archived';

const statusLabels: Record<NewsStatus, string> = {
  draft: 'Bản nháp',
  published: 'Đang hiển thị',
  archived: 'Đang ẩn',
};

type Props = {
  id: string;
  title: string;
  slug: string;
  status: NewsStatus;
  updatedAt: string;
  canDelete: boolean;
};

export default function NewsActions({ id, title, slug, status, updatedAt, canDelete }: Props) {
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState(status);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const visible = currentStatus === 'published';

  useEffect(() => setCurrentStatus(status), [status]);

  async function toggleVisibility() {
    if (busy) return;
    const previousStatus = currentStatus;
    const nextStatus = visible ? 'archived' : 'published';
    setCurrentStatus(nextStatus);
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/news/' + id + '/status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || 'Không thể cập nhật trạng thái.');
      router.refresh();
    } catch (error) {
      setCurrentStatus(previousStatus);
      setMessage(error instanceof Error ? error.message : 'Không thể cập nhật trạng thái.');
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (busy || !window.confirm('Xóa bài viết này? Thao tác này không thể hoàn tác.')) return;
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

  return (
    <div className="group relative flex flex-col gap-4 p-5 transition-colors hover:bg-stone-50 sm:flex-row sm:items-center sm:justify-between">
      <Link
        href={'/preview/news/' + id}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={'Xem trước bài viết: ' + title}
        className="absolute inset-0 z-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-brand"
      />
      <div className="pointer-events-none relative min-w-0">
        <h2 className="truncate font-serif text-xl text-stone-900">{title}</h2>
        <div className="mt-1 truncate text-xs text-stone-500">/{slug}</div>
      </div>
      <div className="pointer-events-none relative flex flex-wrap items-center justify-between gap-3 sm:justify-end">
        <div className="text-right text-xs text-stone-500">
          <div className={'rounded-full px-3 py-1 transition-colors duration-200 ' + (visible ? 'bg-emerald-50 text-emerald-900' : currentStatus === 'archived' ? 'bg-stone-200 text-stone-700' : 'bg-stone-100 text-stone-600')} aria-live="polite">
            {statusLabels[currentStatus]}
          </div>
          <div className="mt-1">Cập nhật {updatedAt?.slice(0, 10)}</div>
        </div>
        <div className="pointer-events-auto relative z-10 flex flex-wrap items-center justify-end gap-1">
          <Link href={'/admin/news/' + id + '/edit'} className="rounded-full p-2 text-stone-500 hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-brand" aria-label={'Chỉnh sửa bài viết: ' + title}><Pencil className="h-4 w-4" /></Link>
          <button type="button" disabled={busy} onClick={() => void toggleVisibility()} className="rounded-full p-2 text-stone-500 transition-colors hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-brand disabled:cursor-wait disabled:opacity-60" aria-label={visible ? 'Ẩn bài viết' : 'Hiện bài viết'}>
            <span className="relative block h-4 w-4" aria-hidden="true">
              <EyeOff className={'absolute inset-0 h-4 w-4 transition-all duration-200 ' + (visible ? 'scale-100 opacity-100' : 'scale-75 opacity-0')} />
              <Eye className={'absolute inset-0 h-4 w-4 transition-all duration-200 ' + (visible ? 'scale-75 opacity-0' : 'scale-100 opacity-100')} />
            </span>
          </button>
          {canDelete && <button type="button" disabled={busy} onClick={() => void remove()} className="rounded-full p-2 text-red-700 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700 disabled:cursor-wait disabled:opacity-60" aria-label={'Xóa bài viết: ' + title}><Trash2 className="h-4 w-4" /></button>}
        </div>
        {message && <span role="alert" className="basis-full text-right text-xs text-red-700">{message}</span>}
      </div>
    </div>
  );
}
