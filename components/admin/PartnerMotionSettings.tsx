'use client';

import { useRouter } from 'next/navigation';
import { Pause, Play } from 'lucide-react';
import { useState } from 'react';

export default function PartnerMotionSettings({ initialEnabled }: { initialEnabled: boolean }) {
  const router = useRouter();
  const [enabled, setEnabled] = useState(initialEnabled);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  async function toggle() {
    const nextValue = !enabled;
    setSaving(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/partners/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ motionEnabled: nextValue }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || 'Không thể lưu cài đặt chuyển động.');
      setEnabled(nextValue);
      setMessage('Đã lưu cài đặt.');
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Không thể lưu cài đặt chuyển động.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="mt-8 flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white/80 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="text-sm font-semibold text-stone-900">Chuyển động danh sách đối tác</div>
        <p className="mt-1 text-xs leading-relaxed text-stone-500">Cài đặt này áp dụng cho khách truy cập trên toàn website. Người dùng có tùy chọn giảm chuyển động sẽ luôn thấy danh sách tĩnh.</p>
        {message && <p role="status" className="mt-2 text-xs text-emerald-brand">{message}</p>}
      </div>
      <button type="button" disabled={saving} onClick={() => void toggle()} aria-pressed={enabled} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-stone-700 transition hover:border-emerald-brand hover:text-emerald-brand disabled:opacity-60">
        {enabled ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        {saving ? 'Đang lưu…' : enabled ? 'Đang bật chuyển động' : 'Đang tắt chuyển động'}
      </button>
    </section>
  );
}
