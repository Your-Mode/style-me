import StatusCard from '@/components/common/status-card/status-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ResultError() {
  return (
    <StatusCard
      className='min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50'
      title='결과를 불러올 수 없습니다'
      message='설문을 다시 진행해주세요.'
      action={
        <Link href='/survey'>
          <Button className='bg-gradient-to-r from-pink-500 to-purple-600'>설문 다시하기</Button>
        </Link>
      }
    />
  );
}
