'use client';

export default function Notice() {
  return (
    <div className='mb-4 p-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg border border-rose-200'>
      <div className='flex items-center justify-center space-x-2'>
        <span className='text-lg'>⚠️</span>
        <p className='text-rose-600 text-sm font-medium'>답변 후에는 이전 질문으로 돌아갈 수 없습니다. 신중하게 선택해주세요!</p>
      </div>
    </div>
  );
}
