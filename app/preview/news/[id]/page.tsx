import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { normalizeArticleDocument } from '@/lib/news-content';
import NewsArticleView from '@/components/news/NewsArticleView';
import type { NewsArticle } from '@/data/news';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Xem trước bài viết',
  robots: { index: false, follow: false },
};

export default async function NewsPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect('/login');

  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect('/login?error=configuration');

  const { data } = await supabase
    .from('articles')
    .select('id, slug, title, excerpt, category, published_at, read_time, author_name, cover_class, body_json, cover_image_path, cover_image_alt, featured')
    .eq('id', (await params).id)
    .eq('content_kind', 'news')
    .maybeSingle();

  if (!data) notFound();

  const coverImageUrl = data.cover_image_path
    ? supabase.storage.from('news-media').getPublicUrl(data.cover_image_path).data.publicUrl
    : undefined;

  const article: NewsArticle = {
    id: data.id,
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    category: data.category || 'Tin tức',
    publishDate: data.published_at?.slice(0, 10) || new Date().toISOString().slice(0, 10),
    readTime: data.read_time || '3 phút đọc',
    author: data.author_name || admin.displayName,
    coverClass: data.cover_class || 'news-cover-paper',
    content: [],
    body: normalizeArticleDocument(data.body_json),
    coverImageUrl,
    coverImageAlt: data.cover_image_alt || undefined,
    featured: Boolean(data.featured),
  };

  return (
    <>
      <div className="fixed left-1/2 top-3 z-[60] -translate-x-1/2 rounded-full border border-amber-300 bg-amber-50/95 px-4 py-2 text-xs font-semibold text-amber-900 shadow-lg backdrop-blur">
        Bản xem trước — chưa phải trang xuất bản
      </div>
      <NewsArticleView article={article} preview />
    </>
  );
}