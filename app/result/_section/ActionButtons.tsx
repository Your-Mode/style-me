import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

interface ActionButtonsProps {
  isGeneratingPDF: boolean;
  onGeneratePDF: () => void;
}

export default function ActionButtons({ isGeneratingPDF, onGeneratePDF }: ActionButtonsProps) {
  return (
    <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8' data-hide-in-pdf>
      <Button
        onClick={onGeneratePDF}
        disabled={isGeneratingPDF}
        className='bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'
      >
        {isGeneratingPDF ? (
          <div className='flex items-center'>
            <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
            PDF 준비 중...
          </div>
        ) : (
          <>
            <Printer className='h-5 w-5 mr-2' />
            깔끔한 PDF 다운로드
          </>
        )}
      </Button>
    </div>
  );
}
