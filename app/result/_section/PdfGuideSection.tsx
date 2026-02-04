import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import InfoCard from '@/components/common/info-card/info-card';

interface PdfGuideSectionProps {
  isGeneratingPDF: boolean;
  onGeneratePDF: () => void;
}

export default function PdfGuideSection({ isGeneratingPDF, onGeneratePDF }: PdfGuideSectionProps) {
  return (
    <InfoCard title='💡 PDF 다운로드 안내' hideInPdf>
      <div className='bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6'>
        <div className='text-left space-y-3 text-gray-700'>
          <p className='font-semibold text-blue-800'>📱 브라우저별 PDF 저장 방법:</p>
          <div className='grid md:grid-cols-3 gap-4 text-sm'>
            <div className='bg-white p-4 rounded-lg border'>
              <p className='font-bold text-blue-600 mb-2'>Chrome</p>
              <p>대상 → PDF로 저장 선택</p>
            </div>
            <div className='bg-white p-4 rounded-lg border'>
              <p className='font-bold text-orange-600 mb-2'>Safari</p>
              <p>하단 PDF 버튼 클릭</p>
            </div>
            <div className='bg-white p-4 rounded-lg border'>
              <p className='font-bold text-purple-600 mb-2'>Firefox</p>
              <p>대상 → PDF로 저장 선택</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col sm:flex-row gap-4 justify-center'>
        <Button
          onClick={onGeneratePDF}
          disabled={isGeneratingPDF}
          className='bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300'
        >
          {isGeneratingPDF ? (
            <div className='flex items-center'>
              <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
              준비 중...
            </div>
          ) : (
            <>
              <Printer className='h-4 w-4 mr-2' />
              PDF 다운로드
            </>
          )}
        </Button>
        <Link href='/survey'>
          <Button
            variant='outline'
            className='border-2 border-gray-400 text-gray-600 hover:bg-gray-50 px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-transparent'
          >
            다시 진단하기
          </Button>
        </Link>
      </div>
    </InfoCard>
  );
}
