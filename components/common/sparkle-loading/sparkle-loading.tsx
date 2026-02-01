import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SparkleLoadingProps {
  title: string;
  description: string;
  className?: string;
}

export default function SparkleLoading({ title, description, className }: SparkleLoadingProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className='text-center'>
        <div className='relative'>
          <div className='w-32 h-32 border-8 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-8'></div>
          <div className='absolute inset-0 flex items-center justify-center'>
            <Sparkles className='h-8 w-8 text-pink-500 animate-pulse' />
          </div>
        </div>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>{title}</h2>
        <p className='text-gray-600 mb-8'>{description}</p>
        <div className='flex justify-center space-x-2'>
          <div className='w-2 h-2 bg-pink-500 rounded-full animate-bounce'></div>
          <div
            className='w-2 h-2 bg-purple-500 rounded-full animate-bounce'
            style={{ animationDelay: '0.1s' }}
          ></div>
          <div
            className='w-2 h-2 bg-indigo-500 rounded-full animate-bounce'
            style={{ animationDelay: '0.2s' }}
          ></div>
        </div>
      </div>
    </div>
  );
}
