import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Phone } from 'lucide-react';

type ContactModalProps = {
  isOpen?: boolean;
  setShowContact: (show: boolean) => void;
};

export default function ContactModal({ isOpen, setShowContact }: ContactModalProps) {
  if (!isOpen) return null;
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <Card className='w-full max-w-md bg-white border-2 border-rose-200'>
        <CardContent className='p-8'>
          <div className='flex justify-between items-center mb-6'>
            <h3 className='text-xl font-bold text-gray-800'>문의하기</h3>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setShowContact(false)}
              className='text-gray-600'
            >
              ✕
            </Button>
          </div>
          <div className='space-y-4'>
            <div className='flex items-center p-4 bg-rose-50 rounded-xl border border-rose-200'>
              <Mail className='h-6 w-6 text-rose-500 mr-4' />
              <span className='text-gray-800'>urmode@naver.com</span>
            </div>
            <div className='flex items-center p-4 bg-rose-50 rounded-xl border border-rose-200'>
              <Phone className='h-6 w-6 text-rose-500 mr-4' />
              <span className='text-gray-800'>010-6415-1548</span>
            </div>
            <div
              className='flex items-center p-4 bg-rose-50 rounded-xl border border-rose-200 cursor-pointer'
              onClick={() => window.open('https://pf.kakao.com/_ZXxedn', '_blank')}
            >
              <MessageCircle className='h-6 w-6 text-rose-500 mr-4' />
              <span className='text-gray-800'>카카오톡 채널로 가기</span>
            </div>
            <p className='text-sm text-gray-600 text-center'>
              평일 09:00 - 18:00 (주말, 공휴일 휴무)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
