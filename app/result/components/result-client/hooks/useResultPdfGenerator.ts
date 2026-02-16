import { useCallback, useState, type RefObject } from 'react';
import {
  applyPrintClasses,
  cleanupPrintClasses,
} from '@/app/result/components/result-client/print/printClassManager';
import { getBrowserPrintMessage } from '@/app/result/components/result-client/print/getBrowserPrintMessage';
import { createPrintStyleElement } from '@/app/result/components/result-client/print/printStyle';
import { handleAppError, USER_ERROR_MESSAGES } from '@/lib/error-handler';

const PRINT_CLEANUP_DELAY_MS = 2000;

interface UseResultPdfGeneratorParams {
  hasResult: boolean;
  resultRef: RefObject<HTMLDivElement | null>;
}

export function useResultPdfGenerator({ hasResult, resultRef }: UseResultPdfGeneratorParams) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const generatePDF = useCallback(async () => {
    if (!hasResult || !resultRef.current) {
      return;
    }

    setIsGeneratingPDF(true);

    const printStyle = createPrintStyleElement();
    const rootElement = resultRef.current;

    try {
      document.head.appendChild(printStyle);
      applyPrintClasses(rootElement);

      alert(getBrowserPrintMessage(navigator.userAgent));
      window.print();

      window.setTimeout(() => {
        if (printStyle.parentElement === document.head) {
          document.head.removeChild(printStyle);
        }
        cleanupPrintClasses(rootElement);
      }, PRINT_CLEANUP_DELAY_MS);
    } catch (error) {
      if (printStyle.parentElement === document.head) {
        document.head.removeChild(printStyle);
      }
      cleanupPrintClasses(rootElement);
      handleAppError({
        error,
        userMessage: USER_ERROR_MESSAGES.PDF_GENERATION_FAILED,
        tags: { layer: 'ui', feature: 'result', action: 'generate_pdf' },
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  }, [hasResult, resultRef]);

  return { generatePDF, isGeneratingPDF };
}
