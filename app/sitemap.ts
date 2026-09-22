import { MetadataRoute } from 'next';
import { practices } from '@/data/practices';
import { people } from '@/data/people';
import { insights } from '@/data/insights';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://phananhlaw.vn';

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/practices`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/people`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic practices routes
  const practiceRoutes: MetadataRoute.Sitemap = practices.map((p) => ({
    url: `${baseUrl}/practices/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  // Dynamic people routes
  const peopleRoutes: MetadataRoute.Sitemap = people.map((per) => ({
    url: `${baseUrl}/people/${per.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  // Dynamic insights routes
  const insightRoutes: MetadataRoute.Sitemap = insights.map((ins) => ({
    url: `${baseUrl}/insights/${ins.slug}`,
    lastModified: new Date(ins.publishDate),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...practiceRoutes, ...peopleRoutes, ...insightRoutes];
}
