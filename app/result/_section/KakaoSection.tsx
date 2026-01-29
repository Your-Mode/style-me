import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface KakaoSectionProps {
  onOpenKakao: () => void;
}

export default function KakaoSection({ onOpenKakao }: KakaoSectionProps) {
  return (
    <Card className='mb-8 border-0 shadow-lg bg-gradient-to-r from-gray-50 to-gray-100' data-hide-in-pdf>
      <CardContent className='p-8 text-center'>
        <h3 className='text-xl font-bold text-gray-800 mb-4'>💡 카카오톡 채널 안내</h3>
        <div className='bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6'>
          <div className='text-left space-y-3 text-gray-700'>
            <p className='font-semibold text-black-800'>
              📱 분석된 체형 타입 기반으로, 스타일링 상담을 받고 싶으시다면 카카오톡 채널로 편하게 연락주세요 :)
            </p>
          </div>
        </div>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <div className='flex items-center cursor-pointer'>
            <Button
              variant='outline'
              onClick={onOpenKakao}
              className='border-2 border-yellow-400 text-gray-600 hover:bg-gray-50 px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-transparent cursor-pointer'
            >
              <MessageCircle className='h-5 w-5 mr-2 ' />
              카카오톡 채널로 가기
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
