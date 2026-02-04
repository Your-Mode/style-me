import { Check, Sparkles, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className='py-20 px-6 relative overflow-hidden'>
      <div className='absolute inset-0'>
        <div className='absolute top-20 left-10 w-32 h-32 bg-rose-200/30 rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 right-10 w-40 h-40 bg-pink-200/30 rounded-full blur-3xl'></div>
        <div className='absolute top-1/2 left-1/2 w-60 h-60 bg-purple-200/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2'></div>
      </div>

      <div className='container mx-auto text-center relative z-10'>
        <div className='max-w-4xl mx-auto'>
          <div className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full mb-8 shadow-lg border border-rose-200'>
            <Sparkles className='h-4 w-4 text-rose-500 mr-2' />
            <span className='text-sm font-medium text-rose-700'>AI 기반 개인 맞춤 스타일링</span>
          </div>

          <h1 className='text-5xl md:text-7xl font-bold mb-8 leading-tight'>
            <span className='text-gray-800'>나만의</span>
            <br />
            <span className='bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 bg-clip-text text-transparent'>
              완벽한 스타일
            </span>
            <br />
            <span className='text-gray-800'>을 찾아보세요</span>
          </h1>

          <p className='text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed font-light max-w-3xl mx-auto'>
            17가지 정밀한 골격 분석으로 당신에게 가장 잘 어울리는 스타일을 찾아드려요.
            <br />
            전문 스타일리스트의 노하우가 담긴 맞춤형 가이드를 받아보세요.
          </p>

          {/* Service Card */}
          <div className='max-w-lg mx-auto mb-16'>
            <Card className='border-2 border-rose-200 bg-white/80 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2'>
              <CardContent className='p-10 text-center'>
                <div className='w-20 h-20 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl'>
                  <span className='text-3xl'>👗</span>
                </div>
                <h3 className='text-3xl font-bold text-gray-800 mb-3'>AI 골격진단</h3>
                <p className='text-gray-600 mb-6 font-medium'>정확하고 세심한 맞춤 스타일링</p>
                <div className='text-4xl font-bold mb-6'>
                  <span className='line-through text-gray-400 text-2xl mr-2'>30,000원</span>
                  <span className='text-rose-500'>0원</span>
                  <div className='text-lg font-medium text-rose-600 mt-2'>🎉 런칭 이벤트</div>
                </div>
                <ul className='text-sm text-gray-700 mb-8 space-y-3 text-left'>
                  <li className='flex items-center'>
                    <Check className='h-4 w-4 text-rose-400 mr-3' />
                    17문항 정밀 골격 분석
                  </li>
                  <li className='flex items-center'>
                    <Check className='h-4 w-4 text-rose-400 mr-3' />
                    개인 맞춤 스타일링 가이드
                  </li>
                  <li className='flex items-center'>
                    <Check className='h-4 w-4 text-rose-400 mr-3' />
                    개인 맞춤 패션 제품 추천
                  </li>
                  <li className='flex items-center'>
                    <Check className='h-4 w-4 text-rose-400 mr-3' />
                    액세서리 스타일링 팁
                  </li>
                  <li className='flex items-center'>
                    <Check className='h-4 w-4 text-rose-400 mr-3' />
                    체형별 코디 가이드
                  </li>
                  <li className='flex items-center text-red-400'>
                    <Star className='h-4 w-4 text-rose-400 mr-3' />
                    카카오톡 채널로 연락주시면 1:1 상담을 통해 더 자세한 정보를 드립니다
                  </li>
                </ul>
                <Link href='/apply'>
                  <Button className='w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'>
                    스타일링 시작하기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className='grid grid-cols-3 gap-8 max-w-2xl mx-auto'>
            <div className='text-center'>
              <div className='text-3xl font-bold text-rose-500'>10,000+</div>
              <div className='text-sm text-gray-600 font-medium'>만족한 고객</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-pink-500'>99%</div>
              <div className='text-sm text-gray-600 font-medium'>만족도</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-purple-500'>무료</div>
              <div className='text-sm text-gray-600 font-medium'>이벤트 중</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
