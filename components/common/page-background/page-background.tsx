import { cn } from '@/lib/utils';
import type { ElementType, ReactNode } from 'react';

interface PageBackgroundProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export default function PageBackground({
  children,
  className,
  as: Component = 'div',
}: PageBackgroundProps) {
  return <Component className={cn('min-h-screen', className)}>{children}</Component>;
}
