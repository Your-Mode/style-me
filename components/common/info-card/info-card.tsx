import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface InfoCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  hideInPdf?: boolean;
}

export default function InfoCard({
  title,
  children,
  className,
  contentClassName,
  titleClassName,
  hideInPdf = false,
}: InfoCardProps) {
  return (
    <Card
      className={cn('mb-8 border-0 shadow-lg bg-gradient-to-r from-gray-50 to-gray-100', className)}
      data-hide-in-pdf={hideInPdf ? true : undefined}
    >
      <CardContent className={cn('p-8 text-center', contentClassName)}>
        <h3 className={cn('text-xl font-bold text-gray-800 mb-4', titleClassName)}>{title}</h3>
        {children}
      </CardContent>
    </Card>
  );
}
