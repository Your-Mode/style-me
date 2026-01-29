import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Header() {
  return (
    <header className='sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-rose-200/50 shadow-sm'>
      <div className='container mx-auto px-6 py-4 flex justify-between items-center'>
        <Link href='/public' className='flex items-center space-x-3'>
          <div className='w-10 h-10 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg'>
            <Heart className='h-5 w-5 text-white' />
          </div>
          <div>
            <span className='text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent'>
              Style Me
            </span>
            <p className='text-xs text-gray-500 font-medium'>Personal Styling</p>
          </div>
        </Link>
        <nav className='hidden md:flex space-x-8'>
          <Link href='/public' className='text-gray-600 hover:text-rose-500 transition-colors font-medium'>
            홈
          </Link>
          <Link href='/public#service' className='text-gray-600 hover:text-rose-500 transition-colors font-medium'>
            서비스
          </Link>
          <Link href='/public#reviews' className='text-gray-600 hover:text-rose-500 transition-colors font-medium'>
            후기
          </Link>
          <Link href='/public#faq' className='text-gray-600 hover:text-rose-500 transition-colors font-medium'>
            FAQ
          </Link>
        </nav>
      </div>
    </header>
  );
}
