import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ResultError() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center'>
      <Card className='max-w-md mx-4'>
        <CardContent className='p-8 text-center'>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>결과를 불러올 수 없습니다</h2>
          <p className='text-gray-600 mb-6'>설문을 다시 진행해주세요.</p>
          <Link href='/survey'>
            <Button className='bg-gradient-to-r from-pink-500 to-purple-600'>설문 다시하기</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
