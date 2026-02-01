import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BrandMarkProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function BrandMark({
  title = 'Style Me',
  subtitle = 'Personal Styling',
  className,
}: BrandMarkProps) {
  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <div className='w-10 h-10 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg'>
        <Heart className='h-5 w-5 text-white' />
      </div>
      <div>
        <span className='text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent'>
          {title}
        </span>
        <p className='text-xs text-gray-500 font-medium'>{subtitle}</p>
      </div>
    </div>
  );
}
