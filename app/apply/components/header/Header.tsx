import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type React from 'react';

export default function Header() {
  return (
    <div className='flex items-center mb-8'>
      <Link href='/public'>
        <Button variant='ghost' size='sm' className='mr-4'>
          <ArrowLeft className='h-4 w-4 mr-2' />
          돌아가기
        </Button>
      </Link>
      <h1 className='text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent'>
        골격진단 신청
      </h1>
    </div>
  );
}
