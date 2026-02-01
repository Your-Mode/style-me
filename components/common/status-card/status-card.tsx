import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface StatusCardProps {
  title: string;
  message: string;
  action?: ReactNode;
  className?: string;
  cardClassName?: string;
  contentClassName?: string;
}

export default function StatusCard({
  title,
  message,
  action,
  className,
  cardClassName,
  contentClassName,
}: StatusCardProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Card className={cn('max-w-md mx-4', cardClassName)}>
        <CardContent className={cn('p-8 text-center', contentClassName)}>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>{title}</h2>
          <p className='text-gray-600 mb-6'>{message}</p>
          {action}
        </CardContent>
      </Card>
    </div>
  );
}
