'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { JSONContent } from '@tiptap/core';
import { Eye, ImagePlus, Save, Send } from 'lucide-react';
import { normalizeArticleDocument } from '@/lib/news-content';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { uploadNewsImage } from '@/components/admin/uploadNewsImage';

type InitialArticle = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  body: unknown;
  category: string;
  status: 'draft' | 'published';
  coverImagePath?: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  persisted?: boolean;
};

export function NewsEditor({ initialArticle }: { initialArticle?: InitialArticle }) {
  const router = useRouter();
  const coverInput = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(initialArticle?.title || '');
  const [slug, setSlug] = useState(initialArticle?.slug || '');
  const [excerpt, setExcerpt] = useState(initialArticle?.excerpt || '');
  const [body, setBody] = useState<JSONContent>(normalizeArticleDocument(initialArticle?.body || []));
  const [category, setCategory] = useState(initialArticle?.category || 'Hoạt động');
  const [status, setStatus] = useState<'draft' | 'published'>(initialArticle?.status || 'draft');
  const [coverImagePath, setCoverImagePath] = useState(initialArticle?.coverImagePath || '');
  const [coverImageUrl, setCoverImageUrl] = useState(initialArticle?.coverImageUrl || '');
  const [coverImageAlt, setCoverImageAlt] = useState(initialArticle?.coverImageAlt || '');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  async function save(event: FormEvent<HTMLFormElement>, forceStatus?: 'draft' | 'published') {
    event.preventDefault();
    setSaving(true);
    setMessage('');

    const nextStatus = forceStatus || status;
    const endpoint = initialArticle?.id ? '/api/admin/news/' + initialArticle.id : '/api/admin/news';
    const response = await fetch(endpoint, {
      method: initialArticle?.id ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        slug,
        excerpt,
        body,
        category,
        status: nextStatus,
        coverImagePath: coverImagePath || null,
        coverImageAlt,
      }),
    });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      setMessage(payload.error || 'Không thể lưu bài viết.');
      setSaving(false);
      return;
    }

    setDirty(false);
    setMessage(nextStatus === 'published' ? 'Đã xuất bản bài viết.' : 'Đã lưu bản nháp.');
    const id = initialArticle?.id || payload.id;
    if (nextStatus === 'published') router.push('/admin/news');
    else if (id && !initialArticle?.id) router.push('/admin/news/' + id + '/edit');
    setSaving(false);
  }

  async function handleCover(file: File) {
    if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') {
      setMessage('Chỉ nhận ảnh PNG, JPEG, WebP hoặc AVIF.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage('Ảnh phải nhỏ hơn 5 MB.');
      return;
    }

    setUploadingCover(true);
    setMessage('Đang tải ảnh bìa lên…');
    try {
      const result = await uploadNewsImage(file);
      setCoverImagePath(result.path);
      setCoverImageUrl(result.url);
      if (!coverImageAlt) setCoverImageAlt(result.alt);
      setDirty(true);
      setMessage('Đã tải ảnh bìa.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Không thể tải ảnh bìa.');
    } finally {
      setUploadingCover(false);
      if (coverInput.current) coverInput.current.value = '';
    }
  }

  function openPreview() {
    if (!initialArticle?.id || !initialArticle.persisted) {
      setMessage('Hãy lưu bản nháp trước, sau đó có thể xem trước bài viết.');
      return;
    }
    window.open('/preview/news/' + initialArticle.id, '_blank', 'noopener,noreferrer');
  }

  return (
    <form onSubmit={(event) => void save(event)} className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-5 rounded-2xl border border-stone-200 bg-white/80 p-6 shadow-sm sm:p-8">
        <label className="block text-sm font-semibold text-stone-800">
          Tiêu đề
          <input required value={title} onChange={(event) => { setTitle(event.target.value); setDirty(true); }} className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 font-serif text-2xl outline-none focus:border-emerald-brand" />
        </label>
        <label className="block text-sm font-semibold text-stone-800">
          Slug
          <input required value={slug} onChange={(event) => { setSlug(event.target.value); setDirty(true); }} placeholder="tu-dong-tao-tu-tieu-de" className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-brand" />
        </label>
        <label className="block text-sm font-semibold text-stone-800">
          Mô tả ngắn
          <textarea required rows={3} value={excerpt} onChange={(event) => { setExcerpt(event.target.value); setDirty(true); }} className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-brand" />
        </label>
        <div>
          <div className="mb-2 text-sm font-semibold text-stone-800">Nội dung</div>
          <RichTextEditor value={body} onChange={(value) => { setBody(value); setDirty(true); }} onStatus={setMessage} />
        </div>
      </div>

      <aside className="h-fit space-y-5 rounded-2xl border border-stone-200 bg-white/80 p-6 shadow-sm lg:sticky lg:top-6">
        <label className="block text-sm font-semibold text-stone-800">
          Chuyên mục
          <select value={category} onChange={(event) => { setCategory(event.target.value); setDirty(true); }} className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-3 py-3 text-sm">
            <option>Hoạt động</option>
            <option>Sự kiện</option>
            <option>Văn hóa doanh nghiệp</option>
            <option>Thông báo</option>
          </select>
        </label>

        <label className="block text-sm font-semibold text-stone-800">
          Trạng thái
          <select value={status} onChange={(event) => { setStatus(event.target.value as 'draft' | 'published'); setDirty(true); }} className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-3 py-3 text-sm">
            <option value="draft">Bản nháp</option>
            <option value="published">Xuất bản ngay</option>
          </select>
        </label>

        <div>
          <div className="text-sm font-semibold text-stone-800">Ảnh bìa</div>
          <button type="button" onClick={() => coverInput.current?.click()} className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-stone-300 bg-stone-50 px-4 py-3 text-sm font-semibold text-stone-700 hover:border-emerald-brand hover:text-emerald-brand">
            <ImagePlus className="h-4 w-4" />
            {uploadingCover ? 'Đang tải…' : coverImageUrl ? 'Đổi ảnh bìa' : 'Chọn ảnh bìa'}
          </button>
          <input ref={coverInput} type="file" accept="image/png,image/jpeg,image/webp,image/avif" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) void handleCover(file); }} />
          {coverImageUrl && <img src={coverImageUrl} alt={coverImageAlt || 'Ảnh bìa'} className="mt-3 aspect-[16/9] w-full rounded-xl object-cover" />}
          <input value={coverImageAlt} onChange={(event) => { setCoverImageAlt(event.target.value); setDirty(true); }} placeholder="Mô tả ảnh (alt)" className="mt-3 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-xs outline-none focus:border-emerald-brand" />
        </div>

        <div className="grid gap-2">
          <button disabled={saving || uploadingCover} type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#153E35] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60">
            {status === 'published' ? <Send className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {saving ? 'Đang lưu…' : status === 'published' ? 'Xuất bản' : 'Lưu bản nháp'}
          </button>
          <button disabled={saving || !initialArticle?.id || !initialArticle.persisted} type="button" onClick={openPreview} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 disabled:cursor-not-allowed disabled:opacity-50">
            <Eye className="h-4 w-4" />Xem trước giao diện
          </button>
        </div>

        {message && <p role="status" className="text-sm text-stone-600">{message}</p>}
        <p className="text-xs leading-relaxed text-stone-500">Ảnh được lưu trong Supabase Storage. Hãy nhập alt text trước khi xuất bản để bảo đảm khả năng truy cập.</p>
      </aside>
    </form>
  );
}