import Header from '@/app/result/components/header/Header';
import ResultClient from '@/app/result/components/result-client/ResultClient';

export default function ResultPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50'>
      <Header />
      <ResultClient />
    </div>
  );
}
