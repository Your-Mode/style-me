import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn('text-center mb-16', className)}>
      <h2 className={cn('text-4xl font-bold text-gray-800 mb-6', titleClassName)}>{title}</h2>
      {subtitle ? (
        <p className={cn('text-xl text-gray-600 font-light', subtitleClassName)}>{subtitle}</p>
      ) : null}
    </div>
  );
}
