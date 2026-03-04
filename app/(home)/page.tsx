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

export const metadata: Metadata = {
  title: 'AI 골격 진단 맞춤 스타일링',
  description: '결제 후 바로 받는 프리미엄 스타일 리포트로 나만의 스타일링을 완성하세요.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AI 골격 진단 맞춤 스타일링',
    description: '결제 후 바로 받는 프리미엄 스타일 리포트로 나만의 스타일링을 완성하세요.',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI 골격 진단 맞춤 스타일링',
    description: '결제 후 바로 받는 프리미엄 스타일 리포트로 나만의 스타일링을 완성하세요.',
  },
};

export default function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Style Me',
    url: siteUrl,
    inLanguage: 'ko-KR',
    description: 'AI 기반 골격 진단으로 개인 맞춤 스타일링 리포트를 제공하는 서비스',
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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
