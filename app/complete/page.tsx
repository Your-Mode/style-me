import type { Metadata } from 'next';
import Header from '@/app/complete/components/header/Header';
import SuccessHeader from '@/app/complete/_section/SuccessHeader';
import OrderSummaryClient from '@/app/complete/_section/OrderSummaryClient';
import NextSteps from '@/app/complete/_section/NextSteps';
import ServiceDetails from '@/app/complete/_section/ServiceDetails';
import ContactInfo from '@/app/complete/_section/ContactInfo';
import PageBackground from '@/components/common/page-background/page-background';
import PageContainer from '@/components/common/page-container/page-container';

export const metadata: Metadata = {
  title: '신청 완료',
  description: '골격 진단 신청이 완료되었습니다. 다음 안내를 확인해 주세요.',
  alternates: {
    canonical: '/complete',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CompletePage() {
  return (
    <PageBackground className='bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50'>
      <Header />
      <div className='py-8 px-4'>
        <PageContainer className='max-w-4xl'>
          <SuccessHeader />
          <OrderSummaryClient />
          <NextSteps />
          <ServiceDetails />
          <ContactInfo />
        </PageContainer>
      </div>
    </PageBackground>
  );
}
