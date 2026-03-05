import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/apply', '/privacy', '/terms'],
        disallow: ['/survey', '/result', '/complete'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
