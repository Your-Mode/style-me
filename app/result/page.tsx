import Header from '@/app/result/components/header/Header';
import ResultClient from '@/app/result/components/result-client/ResultClient';
import PageBackground from '@/components/common/page-background/page-background';

export default function ResultPage() {
  return (
    <PageBackground className='bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50'>
      <Header />
      <ResultClient />
    </PageBackground>
  );
}
