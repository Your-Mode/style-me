import Header from '@/app/apply/components/header/Header';
import ServiceInfo from '@/app/apply/components/service-info/ServiceInfo';
import ApplicationForm from '@/app/apply/components/application-form/ApplicationForm';

export default function ApplyPage() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-8 px-4'>
      <div className='container mx-auto max-w-5xl'>
        <Header />
        <div className='grid lg:grid-cols-3 gap-8'>
          <ServiceInfo />
          <ApplicationForm />
        </div>
      </div>
    </main>
  );
}
