import type { Metadata } from 'next';
import Header from '@/app/(home)/components/header/Header';
import HeroSection from '@/app/(home)/_section/HeroSection';
import ServiceFeaturesSection from '@/app/(home)/_section/ServiceFeaturesSection';
import ReviewSection from '@/app/(home)/_section/ReviewSection';
import FAQSection from '@/app/(home)/_section/FAQSection';
import CTASection from '@/app/(home)/_section/CTASection';
import FloatingButton from '@/app/(home)/components/floating-button/FloatingButton';
import PageBackground from '@/components/common/page-background/page-background';
import { getSiteUrl } from '@/lib/seo';

const siteUrl = getSiteUrl();

const HOME_TITLE = 'AI 골격 진단 맞춤 스타일링';
const HOME_DESCRIPTION = '결제 후 바로 받는 프리미엄 스타일 리포트로 나만의 스타일링을 완성하세요.';
const HOME_STRUCTURED_DESCRIPTION =
  'AI 기반 골격 진단으로 개인 맞춤 스타일링 리포트를 제공하는 서비스';

function toSafeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

export default function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Style Me',
    url: siteUrl,
    inLanguage: 'ko-KR',
    description: HOME_STRUCTURED_DESCRIPTION,
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: toSafeJsonLd(structuredData) }}
      />
      <PageBackground className='bg-[radial-gradient(circle_at_0%_0%,#fee2e2,transparent_35%),radial-gradient(circle_at_100%_20%,#fde68a,transparent_30%),linear-gradient(180deg,#fffaf8_0%,#fffdf7_45%,#f8fafc_100%)]'>
        <Header />
        <HeroSection />
        <ServiceFeaturesSection />
        <ReviewSection />
        <FAQSection />
        <CTASection />
        <FloatingButton />
      </PageBackground>
    </>
  );
}
