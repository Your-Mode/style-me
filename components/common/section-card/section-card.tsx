import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
}

export default function SectionCard({
  title,
  icon,
  children,
  className,
  headerClassName,
  contentClassName,
  titleClassName,
}: SectionCardProps) {
  return (
    <Card className={cn('mb-8 border-0 shadow-lg mx-4 page-break-avoid', className)}>
      <CardHeader className={headerClassName}>
        <CardTitle className={cn('flex items-center text-2xl text-gray-800', titleClassName)}>
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={contentClassName}>{children}</CardContent>
    </Card>
  );
}
