import Header from '@/app/apply/components/header/Header';
import ServiceInfo from '@/app/apply/components/service-info/ServiceInfo';
import ApplicationForm from '@/app/apply/components/application-form/ApplicationForm';
import PageBackground from '@/components/common/page-background/page-background';
import PageContainer from '@/components/common/page-container/page-container';

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
