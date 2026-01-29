import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Gift, Star } from 'lucide-react';

export default function ServiceDetails() {
  return (
    <div className='grid md:grid-cols-2 gap-6 mb-8'>
      <Card className='border-0 shadow-lg'>
        <CardHeader>
          <CardTitle className='flex items-center text-lg text-gray-800'>
            <Gift className='h-5 w-5 mr-2 text-pink-500' />
            제공 서비스
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-3 text-sm'>
            <li className='flex items-center'>
              <CheckCircle className='h-4 w-4 text-green-500 mr-2' />
              <span>개인 맞춤 골격 타입 분석</span>
            </li>
            <li className='flex items-center'>
              <CheckCircle className='h-4 w-4 text-green-500 mr-2' />
              <span>의상 스타일링 가이드</span>
            </li>
            <li className='flex items-center'>
              <CheckCircle className='h-4 w-4 text-green-500 mr-2' />
              <span>개인 맞춤 패션 제품 추천</span>
            </li>
            <li className='flex items-center'>
              <CheckCircle className='h-4 w-4 text-green-500 mr-2' />
              <span>액세서리 스타일링 팁</span>
            </li>
            <li className='flex items-center'>
              <CheckCircle className='h-4 w-4 text-green-500 mr-2' />
              <span>체형별 코디 가이드</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className='border-0 shadow-lg'>
        <CardHeader>
          <CardTitle className='flex items-center text-lg text-gray-800'>
            <Star className='h-5 w-5 mr-2 text-yellow-500' />
            고객 혜택
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-3 text-sm'>
            <li className='flex items-center'>
              <Star className='h-4 w-4 text-yellow-500 mr-2' />
              <span>평생 이용 가능한 스타일 가이드</span>
            </li>
            <li className='flex items-center'>
              <Star className='h-4 w-4 text-yellow-500 mr-2' />
              <span>추후 업데이트 서비스 할인</span>
            </li>
            <li className='flex items-center'>
              <Star className='h-4 w-4 text-yellow-500 mr-2' />
              <span>1:1 문의 지원</span>
            </li>
            <li className='flex items-center'>
              <Star className='h-4 w-4 text-yellow-500 mr-2' />
              <span>친구 추천 시 할인 혜택</span>
            </li>
            <li className='flex items-center'>
              <Star className='h-4 w-4 text-yellow-500 mr-2' />
              <span>3개월 무료 카카오톡 상담</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
