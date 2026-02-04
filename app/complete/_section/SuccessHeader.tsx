import { CheckCircle } from 'lucide-react';

export default function SuccessHeader() {
  return (
    <div className='text-center mb-12'>
      <div className='inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6'>
        <CheckCircle className='h-10 w-10 text-white' />
      </div>
      <h1 className='text-4xl font-bold text-gray-800 mb-4'>무료 신청이 완료되었습니다! 🎉</h1>
      <p className='text-xl text-gray-600'>런칭 기념 무료 골격진단 신청이 성공적으로 접수되었어요</p>
    </div>
  );
}
