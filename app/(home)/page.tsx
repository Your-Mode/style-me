import Header from '@/app/(home)/components/header/Header';
import HeroSection from '@/app/(home)/_section/HeroSection';
import ServiceFeaturesSection from '@/app/(home)/_section/ServiceFeaturesSection';
import ReviewSection from '@/app/(home)/_section/ReviewSection';
import FAQSection from '@/app/(home)/_section/FAQSection';
import CTASection from '@/app/(home)/_section/CTASection';
import FloatingButton from '@/app/(home)/components/floating-button/FloatingButton';
import PageBackground from '@/components/common/page-background/page-background';

export default function HomePage() {
  return (
    <PageBackground className='bg-[radial-gradient(circle_at_0%_0%,#fee2e2,transparent_35%),radial-gradient(circle_at_100%_20%,#fde68a,transparent_30%),linear-gradient(180deg,#fffaf8_0%,#fffdf7_45%,#f8fafc_100%)]'>
      <Header />
      <HeroSection />
      <ServiceFeaturesSection />
      <ReviewSection />
      <FAQSection />
      <CTASection />
      <FloatingButton />
    </PageBackground>
  );
}
