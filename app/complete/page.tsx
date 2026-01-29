import Header from '@/app/complete/components/header/Header';
import SuccessHeader from '@/app/complete/_section/SuccessHeader';
import OrderSummaryClient from '@/app/complete/_section/OrderSummaryClient';
import NextSteps from '@/app/complete/_section/NextSteps';
import ServiceDetails from '@/app/complete/_section/ServiceDetails';
import KakaoChannel from '@/app/complete/_section/KakaoChannel';
import ContactInfo from '@/app/complete/_section/ContactInfo';

export default function CompletePage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50'>
      <Header />
      <div className='py-8 px-4'>
        <div className='container mx-auto max-w-4xl'>
          <SuccessHeader />
          <OrderSummaryClient />
          <NextSteps />
          <ServiceDetails />
          <KakaoChannel />
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
