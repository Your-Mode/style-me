import { Sparkles } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className='flex items-center justify-center min-h-[70vh]'>
      <div className='text-center'>
        <div className='relative'>
          <div className='w-32 h-32 border-8 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-8'></div>
          <div className='absolute inset-0 flex items-center justify-center'>
            <Sparkles className='h-8 w-8 text-pink-500 animate-pulse' />
          </div>
        </div>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>진단 결과를 분석하고 있어요</h2>
        <p className='text-gray-600 mb-8'>당신만의 완벽한 스타일을 찾고 있습니다...</p>
        <div className='flex justify-center space-x-2'>
          <div className='w-2 h-2 bg-pink-500 rounded-full animate-bounce'></div>
          <div className='w-2 h-2 bg-purple-500 rounded-full animate-bounce' style={{ animationDelay: '0.1s' }}></div>
          <div className='w-2 h-2 bg-indigo-500 rounded-full animate-bounce' style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}
