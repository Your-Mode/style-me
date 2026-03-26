import type React from 'react';
import type { Metadata } from 'next';
import * as Sentry from '@sentry/nextjs';
import './globals.css';
import { Providers } from '@/lib/providers';
import AnalyticsListener from '@/components/AnalyticsListener';
import { getSiteUrl } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: 'Style Me | AI 골격 진단 스타일링',
      template: '%s | Style Me',
    },
    description: 'AI 기반 골격 진단으로 나에게 맞는 스타일링 리포트를 받아보세요.',
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      siteName: 'Style Me',
      title: 'Style Me | AI 골격 진단 스타일링',
      description: 'AI 기반 골격 진단으로 나에게 맞는 스타일링 리포트를 받아보세요.',
      url: siteUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Style Me | AI 골격 진단 스타일링',
      description: 'AI 기반 골격 진단으로 나에게 맞는 스타일링 리포트를 받아보세요.',
    },
    other: {
      ...Sentry.getTraceData(),
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body className='antialiased'>
        <Providers>
          {children}
          <AnalyticsListener />
        </Providers>
      </body>
    </html>
  );
}
