import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';

export default function ContactInfo() {
  return (
    <Card className='border-0 shadow-lg bg-gradient-to-r from-gray-50 to-gray-100'>
      <CardContent className='p-6'>
        <h3 className='font-semibold text-gray-800 mb-4 text-center'>문의사항이 있으시면 언제든 연락주세요</h3>
        <div className='flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8'>
          <div className='flex items-center text-gray-600'>
            <Mail className='h-4 w-4 mr-2' />
            <span>urmode@naver.com</span>
          </div>
          <div className='flex items-center text-gray-600'>
            <Phone className='h-4 w-4 mr-2' />
            <span>010-6415-1548</span>
          </div>
        </div>
        <p className='text-sm text-gray-500 text-center mt-2'>평일 09:00 - 18:00 (주말, 공휴일 휴무)</p>
      </CardContent>
    </Card>
  );
}
