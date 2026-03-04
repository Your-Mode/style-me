import type { Metadata } from 'next';
import Header from '@/app/apply/components/header/Header';
import ServiceInfo from '@/app/apply/components/service-info/ServiceInfo';
import ApplicationForm from '@/app/apply/components/application-form/ApplicationForm';
import PageBackground from '@/components/common/page-background/page-background';
import PageContainer from '@/components/common/page-container/page-container';

export const metadata: Metadata = {
  title: '골격 진단 신청',
  description: '신청 정보를 입력하고 개인 맞춤 골격 진단 스타일링 리포트를 준비하세요.',
  alternates: {
    canonical: '/apply',
  },
  openGraph: {
    title: '골격 진단 신청',
    description: '신청 정보를 입력하고 개인 맞춤 골격 진단 스타일링 리포트를 준비하세요.',
    url: '/apply',
  },
};

export default function ApplyPage() {
  return (
    <PageBackground
      as='main'
      className='bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-8 px-4'
    >
      <PageContainer className='max-w-5xl'>
        <Header />
        <div className='grid lg:grid-cols-3 gap-8'>
          <ServiceInfo />
          <ApplicationForm />
        </div>
      </PageContainer>
    </PageBackground>
  );
}
