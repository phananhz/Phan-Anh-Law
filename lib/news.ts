import 'server-only';

import { newsArticles, type NewsArticle } from '@/data/news';
import { createSupabasePublicClient } from '@/lib/supabase/public';
import { normalizeArticleDocument } from '@/lib/news-content';

type DatabaseArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string | null;
  published_at: string | null;
  read_time: string | null;
  author_name: string | null;
  cover_class: string | null;
  body_json: unknown;
  cover_image_path: string | null;
  cover_image_alt: string | null;
  featured: boolean | null;
};

function toNewsArticle(row: DatabaseArticle, coverImageUrl?: string): NewsArticle {
  const legacyBody = Array.isArray(row.body_json) ? row.body_json.filter((item): item is string => typeof item === 'string') : [];
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category || 'Tin tức',
    publishDate: row.published_at?.slice(0, 10) || new Date().toISOString().slice(0, 10),
    readTime: row.read_time || '3 phút đọc',
    author: row.author_name || 'Phan Anh Law',
    coverClass: row.cover_class || 'news-cover-paper',
    content: legacyBody,
    body: normalizeArticleDocument(row.body_json),
    coverImageUrl,
    coverImageAlt: row.cover_image_alt || undefined,
    featured: Boolean(row.featured),
  };
}

export async function getPublishedNews(): Promise<NewsArticle[]> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return newsArticles;

  const { data, error } = await supabase
    .from('articles')
    .select('id, slug, title, excerpt, category, published_at, read_time, author_name, cover_class, body_json, cover_image_path, cover_image_alt, featured')
    .eq('content_kind', 'news')
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false });

  if (error || !data?.length) return [];

  return (data as DatabaseArticle[]).map((row) => {
    const coverImageUrl = row.cover_image_path ? supabase.storage.from('news-media').getPublicUrl(row.cover_image_path).data.publicUrl : undefined;
    return toNewsArticle(row, coverImageUrl);
  });
}

export async function getPublishedNewsArticle(slug: string) {
  const articles = await getPublishedNews();
  return articles.find((article) => article.slug === slug) ?? null;
}
