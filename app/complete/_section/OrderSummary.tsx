import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BodyDiagnosisFormData } from '@/types/body';

interface OrderSummaryProps {
  userInfo?: BodyDiagnosisFormData;
  paymentDateLabel: string;
}

export default function OrderSummary({ userInfo, paymentDateLabel }: OrderSummaryProps) {
  return (
    <Card className='mb-8 border-0 shadow-lg'>
      <CardHeader className='bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-t-lg'>
        <CardTitle className='text-xl'>주문 정보</CardTitle>
      </CardHeader>
      <CardContent className='p-6'>
        <div className='grid md:grid-cols-2 gap-6'>
          <div>
            <h3 className='font-semibold text-gray-800 mb-4'>신청자 정보</h3>
            <div className='space-y-2 text-sm'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>이름:</span>
                <span className='font-medium'>{userInfo?.name || '홍길동'}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>연락처:</span>
                <span className='font-medium'>{userInfo?.phone || '010-1234-5678'}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>이메일:</span>
                <span className='font-medium'>{userInfo?.email || 'example@email.com'}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>성별:</span>
                <span className='font-medium'>{userInfo?.gender === 'female' ? '여성' : '남성'}</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className='font-semibold text-gray-800 mb-4'>결제 정보</h3>
            <div className='space-y-2 text-sm'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>서비스:</span>
                <span className='font-medium'>골격진단 AI (무료 이벤트)</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>원래 가격:</span>
                <span className='font-medium line-through text-gray-400'>30,000원</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>이벤트 할인:</span>
                <span className='font-medium text-rose-600'>-30,000원</span>
              </div>
              <div className='flex justify-between border-t pt-2'>
                <span className='text-gray-600 font-bold'>최종 금액:</span>
                <span className='font-bold text-2xl text-rose-600'>0원 🎉</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>결제 방법:</span>
                <span className='font-medium'>
                  {userInfo?.paymentMethod === 'card' && '신용카드'}
                  {userInfo?.paymentMethod === 'mobile' && '휴대폰 결제'}
                  {userInfo?.paymentMethod === 'kakao' && '카카오페이'}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>결제 일시:</span>
                <span className='font-medium'>{paymentDateLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
