import type { Metadata } from 'next';
import NewsIndex from '@/components/news/NewsIndex';
import { getPublishedNews } from '@/lib/news';

export const metadata: Metadata = {
  title: 'Tin tức',
  description: 'Tin tức, hoạt động và cập nhật mới nhất từ Phan Anh Law.',
};

export default async function NewsPage() {
  const articles = await getPublishedNews();
  return <NewsIndex articles={articles} />;
}
