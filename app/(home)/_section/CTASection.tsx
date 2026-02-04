import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock } from 'lucide-react';

export default function CTASection() {
  return (
    <section className='py-20 px-6 bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500'>
      <div className='container mx-auto text-center'>
        <h2 className='text-4xl font-bold text-white mb-8'>나만의 스타일을 무료로 찾아보세요</h2>
        <p className='text-xl text-rose-100 mb-12 font-light max-w-2xl mx-auto'>
          런칭 기념 무료 이벤트! 평생 써먹을 수 있는 나만의 스타일 가이드를 지금 받아보세요
        </p>
        <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
          <Link href='/apply'>
            <Button
              size='lg'
              className='bg-white text-rose-500 hover:bg-rose-50 px-12 py-6 text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105'
            >
              스타일링 시작하기
              <ArrowRight className='ml-3 h-6 w-6' />
            </Button>
          </Link>
          <div className='flex items-center text-rose-100'>
            <Clock className='h-5 w-5 mr-2' />
            <span className='font-medium'>10분 만에 완료</span>
          </div>
        </div>
      </div>
    </section>
  );
}