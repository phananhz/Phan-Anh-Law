import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { newsArticles } from '@/data/news';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NewsEditor } from '@/components/admin/NewsEditor';

type DatabaseArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body_json: unknown;
  category: string | null;
  status: string;
  cover_image_path: string | null;
  cover_image_alt: string | null;
};

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const result = supabase
    ? await supabase.from('articles').select('id, title, slug, excerpt, body_json, category, status, cover_image_path, cover_image_alt').eq('id', id).eq('content_kind', 'news').maybeSingle()
    : null;

  if (result?.error) throw new Error('Không thể tải bài viết.');
  const databaseArticle = (result?.data || null) as DatabaseArticle | null;
  const fallbackArticle = !supabase ? newsArticles.find((item) => item.id === id) : null;
  if (!databaseArticle && !fallbackArticle) notFound();

  const coverImageUrl = databaseArticle?.cover_image_path && supabase
    ? supabase.storage.from('news-media').getPublicUrl(databaseArticle.cover_image_path).data.publicUrl
    : fallbackArticle?.coverImageUrl;
  const databaseStatus: 'draft' | 'published' | 'archived' = databaseArticle?.status === 'published' || databaseArticle?.status === 'archived' ? databaseArticle.status : 'draft';

  const initialArticle = databaseArticle
    ? { id: databaseArticle.id, title: databaseArticle.title, slug: databaseArticle.slug, excerpt: databaseArticle.excerpt, category: databaseArticle.category || 'Hoạt động', status: databaseStatus, body: databaseArticle.body_json, coverImagePath: databaseArticle.cover_image_path || '', coverImageUrl, coverImageAlt: databaseArticle.cover_image_alt || '', persisted: true }
    : { id: fallbackArticle!.id, title: fallbackArticle!.title, slug: fallbackArticle!.slug, excerpt: fallbackArticle!.excerpt, category: fallbackArticle!.category, status: 'published' as const, body: fallbackArticle!.body || fallbackArticle!.content, coverImagePath: '', coverImageUrl: fallbackArticle!.coverImageUrl, coverImageAlt: fallbackArticle!.coverImageAlt, persisted: false };

  return <div className="px-6 py-10 sm:px-10 lg:px-14 lg:py-14"><Link href="/admin/news" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-brand"><ArrowLeft className="h-4 w-4" />Quay lại Tin tức</Link><div className="mb-10 mt-8"><div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-brand">CONTENT / EDIT</div><h1 className="mt-3 font-serif text-5xl tracking-tight text-stone-900">Chỉnh sửa bài viết</h1></div><NewsEditor initialArticle={initialArticle} /></div>;
}
