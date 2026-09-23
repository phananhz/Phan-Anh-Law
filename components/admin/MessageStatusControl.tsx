'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type MessageStatus = 'new' | 'in_progress' | 'resolved' | 'spam';
const options: Array<{ value: MessageStatus; label: string }> = [{ value: 'new', label: 'Mới' }, { value: 'in_progress', label: 'Đang xử lý' }, { value: 'resolved', label: 'Đã xử lý' }, { value: 'spam', label: 'Spam' }];

export default function MessageStatusControl({ id, initialStatus }: { id: string; initialStatus: MessageStatus }) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function updateStatus(nextStatus: MessageStatus) {
    setStatus(nextStatus);
    setSaving(true);
    setError('');
    try {
      const response = await fetch('/api/admin/messages/' + id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: nextStatus }) });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || 'Không thể cập nhật trạng thái.');
      router.refresh();
    } catch (cause) {
      setStatus(initialStatus);
      setError(cause instanceof Error ? cause.message : 'Không thể cập nhật trạng thái.');
    } finally {
      setSaving(false);
    }
  }

  return <div className="flex items-center gap-3"><select value={status} disabled={saving} onChange={(event) => void updateStatus(event.target.value as MessageStatus)} className="rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-stone-700 outline-none focus:border-emerald-brand">{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{error && <span role="alert" className="text-xs text-red-700">{error}</span>}</div>;
}
