import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import type React from 'react';

export default function ServiceInfo() {
  return (
    <div className='lg:col-span-1'>
      <Card className='sticky top-8 border-0 shadow-lg bg-gradient-to-br from-pink-100 to-purple-100'>
        <CardHeader>
          <CardTitle className='text-xl text-gray-800'>서비스 안내</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center justify-between'>
            <span className='text-gray-600'>진단 비용</span>
            <div className='text-right'>
              <span className='text-lg line-through text-gray-400'>30,000원</span>
              <span className='text-2xl font-bold text-rose-500 ml-2'>0원</span>
              <div className='text-sm text-rose-600 font-medium'>🎉 런칭 이벤트</div>
            </div>
          </div>
          <div className='border-t pt-4'>
            <h4 className='font-semibold mb-2 text-gray-800'>포함 내용</h4>
            <ul className='space-y-2 text-sm text-gray-600'>
              <li className='flex items-center'>
                <Check className='h-4 w-4 text-green-500 mr-2' />
                AI 기반 17문항 골격 진단
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 text-green-500 mr-2' />
                개인 맞춤 스타일링 가이드
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 text-green-500 mr-2' />
                개인 맞춤 패션 제품 추천
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 text-green-500 mr-2' />
                액세서리 스타일링 팁
              </li>
              <li className='flex items-center'>
                <Check className='h-4 w-4 text-green-500 mr-2' />
                체형별 코디 가이드
              </li>
            </ul>
          </div>
          <div className='border-t pt-4'>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-gray-600'>소요 시간</span>
              <span className='font-medium'>약 10-15분</span>
            </div>
            <div className='flex items-center justify-between text-sm mt-2'>
              <span className='text-gray-600'>결과 제공</span>
              <span className='font-medium'>즉시 확인</span>
            </div>
          </div>
          <div className='bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg'>
            <h5 className='font-semibold text-gray-800 mb-2'>💡 팁</h5>
            <p className='text-sm text-gray-600'>
              더 정확한 진단을 위해 체형 사진을 업로드해주세요. (선택사항)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
