import { Heart } from 'lucide-react';

interface ProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

export default function Progress({ currentQuestion, totalQuestions }: ProgressProps) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className='mb-6'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-xl md:text-3xl font-bold text-gray-800 flex items-center space-x-2'>
          <Heart className='h-6 w-6 text-rose-500' />
          <span>스타일 진단</span>
        </h1>
        <span className='text-lg font-bold text-rose-500'>
          {currentQuestion + 1}/{totalQuestions}
        </span>
      </div>
      <div className='h-2 bg-gray-200 rounded-full overflow-hidden'>
        <div
          className='h-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all duration-500'
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
