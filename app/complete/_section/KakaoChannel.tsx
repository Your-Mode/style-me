import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

export default function KakaoChannel() {
  return (
    <Card className='mb-8 border-0 shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50'>
      <CardContent className='p-8'>
        <div className='text-center'>
          <div className='w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'>
            <MessageCircle className='h-8 w-8 text-white' />
          </div>
          <h3 className='text-2xl font-bold text-gray-800 mb-4'>카카오톡으로 더 편리하게! 💬</h3>
          <p className='text-gray-600 mb-8 leading-relaxed'>
            스타일링 관련 궁금한 점이나 추가 상담이 필요하시면
            <br />
            카카오톡 채널로 언제든 편하게 문의해주세요!
            <br />
            <span className='text-yellow-600 font-bold text-lg'>🎁 런칭 기념 3개월 무료 상담 제공!</span>
          </p>

          <div className='grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8'>
            <div className='p-6 bg-white rounded-2xl border-2 border-yellow-200 shadow-lg'>
              <div className='w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-2xl'>💬</span>
              </div>
              <h4 className='font-bold text-gray-800 mb-2'>실시간 상담</h4>
              <p className='text-sm text-gray-600'>스타일링 관련 궁금한 점을 실시간으로 문의하세요</p>
            </div>
            <div className='p-6 bg-white rounded-2xl border-2 border-yellow-200 shadow-lg'>
              <div className='w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-2xl'>🎁</span>
              </div>
              <h4 className='font-bold text-gray-800 mb-2'>3개월 무료 상담</h4>
              <p className='text-sm text-gray-600'>
                런칭 기념으로 3개월간 무제한 스타일링 상담을 무료로 제공해드려요
              </p>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <a href='https://pf.kakao.com/_ZXxedn' target='_blank' rel='noopener noreferrer'>
              <Button className='bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-8 py-4 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'>
                <div className='flex items-center'>
                  <MessageCircle className='h-5 w-5 mr-2' />
                  카카오톡 채널 추가
                </div>
              </Button>
            </a>
          </div>

          <div className='mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border border-yellow-200'>
            <p className='text-yellow-700 text-sm font-medium'>
              <strong>💡 TIP:</strong> 카카오톡 채널에서는 3개월간 무료로 개인별 맞춤 스타일링 조언과 시즌별 트렌드
              정보를 제공해드려요!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
