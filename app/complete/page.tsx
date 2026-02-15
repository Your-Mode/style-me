import Header from '@/app/complete/components/header/Header';
import SuccessHeader from '@/app/complete/_section/SuccessHeader';
import OrderSummaryClient from '@/app/complete/_section/OrderSummaryClient';
import NextSteps from '@/app/complete/_section/NextSteps';
import ServiceDetails from '@/app/complete/_section/ServiceDetails';
import ContactInfo from '@/app/complete/_section/ContactInfo';
import PageBackground from '@/components/common/page-background/page-background';
import PageContainer from '@/components/common/page-container/page-container';

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
