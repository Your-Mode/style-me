import SparkleLoading from '@/components/common/sparkle-loading/sparkle-loading';

export default function LoadingState() {
  return (
    <SparkleLoading
      className='min-h-[70vh]'
      title='진단 결과를 분석하고 있어요'
      description='당신만의 완벽한 스타일을 찾고 있습니다...'
    />
  );
}
