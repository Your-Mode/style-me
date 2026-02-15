import Link from 'next/link';
import { Button } from '@/components/ui/button';
import StatusCard from '@/components/common/status-card/status-card';
import { Loader2 } from 'lucide-react';

interface EmptyStateProps {
  onRetry?: () => void;
  isRetrying?: boolean;
}

export default function EmptyState({ onRetry, isRetrying = false }: EmptyStateProps) {
  return (
    <StatusCard
      className='min-h-[70vh]'
      title='결과를 불러올 수 없습니다'
      message='네트워크 문제일 수 있어요. 다시 요청하거나 설문을 다시 진행해주세요.'
      action={
        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          {onRetry && (
            <Button
              onClick={onRetry}
              disabled={isRetrying}
              className='bg-gradient-to-r from-pink-500 to-purple-600'
            >
              {isRetrying ? (
                <>
                  <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                  재요청 중...
                </>
              ) : (
                '결과 다시 요청'
              )}
            </Button>
          )}
          <Link href='/survey'>
            <Button variant='outline' className='border-pink-300 text-pink-600'>
              설문 다시하기
            </Button>
          </Link>
        </div>
      }
    />
  );
}
