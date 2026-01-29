import Header from '@/app/(home)/components/header/Header';
import HeroSection from '@/app/(home)/_section/HeroSection';
import ServiceFeaturesSection from '@/app/(home)/_section/ServiceFeaturesSection';
import ReviewSection from '@/app/(home)/_section/ReviewSection';
import FAQSection from '@/app/(home)/_section/FAQSection';
import CTASection from '@/app/(home)/_section/CTASection';
import FloatingButton from '@/app/(home)/components/floating-button/FloatingButton';

export default function HomePage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50'>
      <Header />
      <HeroSection />
      <ServiceFeaturesSection />
      <ReviewSection />
      <FAQSection />
      <CTASection />
      <FloatingButton />
    </div>
  );
}
