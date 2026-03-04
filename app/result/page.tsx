import type { Metadata } from 'next';
import Header from '@/app/result/components/header/Header';
import ResultClient from '@/app/result/components/result-client/ResultClient';
import PageBackground from '@/components/common/page-background/page-background';

export const metadata: Metadata = {
  title: '진단 결과',
  description: '개인 맞춤 진단 결과와 스타일링 가이드를 확인하세요.',
  alternates: {
    canonical: '/result',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResultPage() {
  return (
    <PageBackground className='bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50'>
      <Header />
      <h1 className='sr-only'>골격 진단 결과</h1>
      <ResultClient />
    </PageBackground>
  );
}
