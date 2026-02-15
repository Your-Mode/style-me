'use client';

import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { postBodyResult } from '@/apis/chat';
import { useBodyResultStore } from '@/hooks/useBodyResultStore';
import { useApplyUserInfoStore } from '@/hooks/useApplyUserInfoStore';
import LoadingState from '@/app/result/components/loading/LoadingState';
import EmptyState from '@/app/result/components/empty/EmptyState';
import ActionButtons from '@/app/result/_section/ActionButtons';
import ResultContent from '@/app/result/_section/ResultContent';
import PdfGuideSection from '@/app/result/_section/PdfGuideSection';
import PageContainer from '@/components/common/page-container/page-container';

export default function ResultClient() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const { bodyResult: result, status, setBodyResult, setStatus } = useBodyResultStore();
  const { gender, height, weight } = useApplyUserInfoStore();
  const { mutateAsync: retryResultRequest, isPending: isRetrying } = useMutation({
    mutationFn: postBodyResult,
    retry: 3,
    retryDelay: 2000,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRetry = async () => {
    let answers: string[] = [];
    try {
      const rawAnswers = localStorage.getItem('surveyAnswers');
      const parsedAnswers = rawAnswers ? JSON.parse(rawAnswers) : [];
      answers = Array.isArray(parsedAnswers) ? parsedAnswers : [];
    } catch {
      answers = [];
    }

    if (!answers.length || !gender || height <= 0 || weight <= 0) {
      alert('재요청에 필요한 설문 정보가 없습니다. 설문을 다시 진행해주세요.');
      return;
    }

    setStatus('loading');
    try {
      const resultData = await retryResultRequest({
        answers,
        gender,
        height,
        weight,
      });
      setBodyResult(resultData);
    } catch {
      setStatus('error');
      alert('결과 재요청에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const generatePDF = async () => {
    if (!result) return;

    setIsGeneratingPDF(true);

    try {
      const printStyle = document.createElement('style');
      printStyle.textContent = `
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          @page {
            margin: 1cm;
            size: A4;
          }
          
          body {
            margin: 0;
            padding: 0;
            background: white !important;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          
          body * {
            visibility: hidden;
          }
          
          .print-content, .print-content * {
            visibility: visible;
          }
          
          .print-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
          }
          
          [data-hide-in-pdf] {
            display: none !important;
          }
          
          .print-gradient-pink {
            background: #ec4899 !important;
            color: white !important;
          }
          
          .print-gradient-purple {
            background: #8b5cf6 !important;
            color: white !important;
          }
          
          .print-gradient-text {
            background: none !important;
            color: #ec4899 !important;
            -webkit-background-clip: unset !important;
            background-clip: unset !important;
          }
          
          .print-card {
            border: 2px solid #e5e7eb !important;
            border-radius: 12px !important;
            margin-bottom: 20px !important;
            background: white !important;
            box-shadow: none !important;
            page-break-inside: avoid;
          }
          
          .print-card-header {
            background: #f9fafb !important;
            border-bottom: 1px solid #e5e7eb !important;
            padding: 16px !important;
            border-radius: 10px 10px 0 0 !important;
          }
          
          .print-card-content {
            padding: 20px !important;
          }
          
          .print-title {
            color: #1f2937 !important;
            font-size: 24px !important;
            font-weight: bold !important;
            margin-bottom: 16px !important;
          }
          
          .print-subtitle {
            color: #374151 !important;
            font-size: 18px !important;
            font-weight: 600 !important;
            margin-bottom: 12px !important;
          }
          
          .print-text {
            color: #4b5563 !important;
            font-size: 14px !important;
            line-height: 1.6 !important;
            margin-bottom: 12px !important;
          }
          
          .print-icon-pink { color: #ec4899 !important; }
          .print-icon-purple { color: #8b5cf6 !important; }
          .print-icon-green { color: #10b981 !important; }
          .print-icon-red { color: #ef4444 !important; }
          .print-icon-yellow { color: #f59e0b !important; }
          .print-icon-rose { color: #f43f5e !important; }
          
          .print-header {
            text-align: center;
            margin-bottom: 30px !important;
            page-break-after: avoid;
          }
          
          .print-header-circle {
            width: 80px !important;
            height: 80px !important;
            background: #ec4899 !important;
            border-radius: 50% !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            margin-bottom: 20px !important;
            font-size: 32px !important;
          }
          
          .page-break-before {
            page-break-before: always;
          }
          
          .page-break-avoid {
            page-break-inside: avoid;
          }
        }
      `;
      document.head.appendChild(printStyle);

      if (resultRef.current) {
        resultRef.current.classList.add('print-content');

        const gradientElements = resultRef.current.querySelectorAll(
          '.bg-gradient-to-r, .bg-gradient-to-br',
        );
        gradientElements.forEach((el) => {
          if (el.textContent?.includes('골격진단') || el.classList.contains('from-pink-500')) {
            el.classList.add('print-gradient-pink');
          } else {
            el.classList.add('print-gradient-purple');
          }
        });

        const textGradients = resultRef.current.querySelectorAll('.bg-clip-text');
        textGradients.forEach((el) => {
          el.classList.add('print-gradient-text');
        });

        const cards = resultRef.current.querySelectorAll('.shadow-xl, .shadow-lg');
        cards.forEach((el) => {
          el.classList.add('print-card');
        });

        const cardHeaders = resultRef.current.querySelectorAll('h1, h2, .text-2xl');
        cardHeaders.forEach((el) => {
          if (el.classList.contains('text-4xl') || el.classList.contains('text-5xl')) {
            el.classList.add('print-title');
          } else {
            el.classList.add('print-subtitle');
          }
        });

        const cardContents = resultRef.current.querySelectorAll('p, .prose');
        cardContents.forEach((el) => {
          el.classList.add('print-text');
        });

        const icons = resultRef.current.querySelectorAll('svg');
        icons.forEach((icon) => {
          const parent = icon.closest('.flex');
          if (
            parent?.textContent?.includes('상세 체형') ||
            parent?.textContent?.includes('골격진단')
          ) {
            icon.classList.add('print-icon-pink');
          } else if (parent?.textContent?.includes('보완')) {
            icon.classList.add('print-icon-purple');
          } else if (parent?.textContent?.includes('추천')) {
            icon.classList.add('print-icon-green');
          } else if (parent?.textContent?.includes('피해')) {
            icon.classList.add('print-icon-red');
          } else if (parent?.textContent?.includes('스타일링')) {
            icon.classList.add('print-icon-yellow');
          } else if (parent?.textContent?.includes('매력')) {
            icon.classList.add('print-icon-rose');
          }
        });
      }

      const userAgent = navigator.userAgent.toLowerCase();
      let message = "인쇄 대화상자에서 '대상'을 'PDF로 저장'으로 선택해주세요.";

      if (userAgent.includes('chrome')) {
        message = "인쇄 대화상자에서 '대상'을 'PDF로 저장'으로 선택해주세요.";
      } else if (userAgent.includes('safari')) {
        message = "인쇄 대화상자에서 'PDF' 버튼을 클릭해주세요.";
      } else if (userAgent.includes('firefox')) {
        message = "인쇄 대화상자에서 '대상'을 'PDF로 저장'으로 선택해주세요.";
      }

      alert(message);
      window.print();

      setTimeout(() => {
        document.head.removeChild(printStyle);
        if (resultRef.current) {
          resultRef.current.classList.remove('print-content');

          const elementsToClean = resultRef.current.querySelectorAll("[class*='print-']");
          elementsToClean.forEach((el) => {
            try {
              if (el.className && typeof el.className === 'string') {
                el.className = el.className.replace(/print-[a-z-]+/g, '').trim();
              } else if (el.classList) {
                const classesToRemove = Array.from(el.classList).filter((cls) =>
                  cls.startsWith('print-'),
                );
                classesToRemove.forEach((cls) => el.classList.remove(cls));
              }
            } catch (error) {
              console.warn('클래스 정리 중 오류:', error);
            }
          });
        }
      }, 2000);
    } catch (error) {
      console.error('PDF 생성 중 오류:', error);
      alert('PDF 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className='py-8 px-4'>
        <PageContainer className='max-w-6xl'>
          <LoadingState />
        </PageContainer>
      </div>
    );
  }

  if (status === 'error' || !result) {
    return (
      <div className='py-8 px-4'>
        <PageContainer className='max-w-6xl'>
          <EmptyState onRetry={() => void handleRetry()} isRetrying={isRetrying} />
        </PageContainer>
      </div>
    );
  }

  return (
    <div className='py-8 px-4'>
      <PageContainer className='max-w-6xl'>
        <ActionButtons isGeneratingPDF={isGeneratingPDF} onGeneratePDF={generatePDF} />
        <ResultContent result={result} resultRef={resultRef} />
        <PdfGuideSection isGeneratingPDF={isGeneratingPDF} onGeneratePDF={generatePDF} />
      </PageContainer>
    </div>
  );
}
