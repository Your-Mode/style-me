import Link from 'next/link';
import { Button } from '@/components/ui/button';
import StatusCard from '@/components/common/status-card/status-card';

export default function EmptyState() {
  return (
    <StatusCard
      className='min-h-[70vh]'
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
