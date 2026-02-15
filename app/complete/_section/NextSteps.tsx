import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Clock } from 'lucide-react';

export default function NextSteps() {
  return (
    <Card className='mb-8 border-0 shadow-lg'>
      <CardHeader>
        <CardTitle className='flex items-center text-xl text-gray-800'>
          <Clock className='h-6 w-6 mr-2 text-pink-500' />
          다음 단계
        </CardTitle>
      </CardHeader>
      <CardContent className='p-6'>
        <div className='space-y-6'>
          <div className='flex items-start space-x-4'>
            <div className='w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
              1
            </div>
            <div>
              <h4 className='font-semibold text-gray-800 mb-2'>골격진단 설문 진행</h4>
              <p className='text-gray-600 mb-3'>
                17개의 질문에 답변하여 정확한 골격 타입을 분석받으세요. 약 10-15분 소요됩니다.
              </p>
              <Link href='/survey'>
                <Button className='bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white'>
                  설문 시작하기
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </Link>
            </div>
          </div>

          <div className='flex items-start space-x-4'>
            <div className='w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
              2
            </div>
            <div>
              <h4 className='font-semibold text-gray-800 mb-2'>진단 결과 확인</h4>
              <p className='text-gray-600'>
                설문 완료 즉시 당신의 골격 타입과 맞춤형 스타일링 가이드를 확인할 수 있습니다.
              </p>
            </div>
          </div>

          <div className='flex items-start space-x-4'>
            <div className='w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
              3
            </div>
            <div>
              <h4 className='font-semibold text-gray-800 mb-2'>스타일링 적용</h4>
              <p className='text-gray-600'>
                제공받은 가이드를 바탕으로 새로운 스타일을 시도해보세요. 평생 활용 가능합니다!
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
