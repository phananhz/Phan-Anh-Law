import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublishedNews, getPublishedNewsArticle } from '@/lib/news';
import NewsArticleView from '@/components/news/NewsArticleView';

export const revalidate = 300;

export async function generateStaticParams() {
  const articles = await getPublishedNews();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedNewsArticle(slug);
  if (!article) return { title: 'Không tìm thấy bài viết' };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      images: article.coverImageUrl ? [{ url: article.coverImageUrl, alt: article.coverImageAlt || article.title }] : undefined,
    },
  };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getPublishedNewsArticle(slug);
  if (!article) notFound();

  return <NewsArticleView article={article} />;
}