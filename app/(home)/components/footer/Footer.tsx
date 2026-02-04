import { Heart, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer id='contact' className='bg-gray-900 text-white py-16 px-6'>
      <div className='container mx-auto'>
        <div className='grid md:grid-cols-4 gap-12'>
          <div className='md:col-span-2'>
            <div className='flex items-center space-x-3 mb-6'>
              <div className='w-10 h-10 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg'>
                <Heart className='h-5 w-5 text-white' />
              </div>
              <div>
                <span className='text-2xl font-bold text-white'>Style Me</span>
                <p className='text-xs text-gray-400'>Personal Styling</p>
              </div>
            </div>
            <p className='text-gray-400 mb-6 leading-relaxed'>
              AI 기반 개인 맞춤 스타일링으로 당신만의 완벽한 스타일을 찾아보세요. 전문
              스타일리스트가 설계한 정확한 진단과 맞춤형 가이드를 제공합니다.
            </p>
          </div>
          <div>
            <h3 className='text-xl font-bold mb-6 text-rose-400'>서비스</h3>
            <ul className='space-y-3 text-gray-400'>
              <li>
                <a href='#service' className='hover:text-rose-400 transition-colors'>
                  골격진단
                </a>
              </li>
              <li>
                <a href='#service' className='hover:text-rose-400 transition-colors'>
                  스타일링 가이드
                </a>
              </li>
              <li>
                <a href='#service' className='hover:text-rose-400 transition-colors'>
                  컬러 분석
                </a>
              </li>
              <li>
                <a href='#faq' className='hover:text-rose-400 transition-colors'>
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-xl font-bold mb-6 text-rose-400'>문의</h3>
            <div className='space-y-3 text-gray-400'>
              <div className='flex items-center'>
                <Mail className='h-5 w-5 mr-3' />
                <span>urmode@naver.com</span>
              </div>
              <div className='flex items-center'>
                <Phone className='h-5 w-5 mr-3' />
                <span>010-6415-1548</span>
              </div>
              <div className='text-sm'>
                <p>평일 09:00 - 18:00</p>
                <p>(주말, 공휴일 휴무)</p>
              </div>
            </div>
          </div>
        </div>
        <div className='border-t border-gray-800 mt-12 pt-8 text-center text-gray-400'>
          <p>&copy; 2025 Style Me. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
