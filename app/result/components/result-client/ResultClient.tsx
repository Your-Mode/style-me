'use client';

import { useEffect, useRef } from 'react';
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
import { useResultPdfGenerator } from '@/app/result/components/result-client/hooks/useResultPdfGenerator';
import { getStorageJson, STORAGE_KEYS } from '@/lib/client-storage';
import { handleAppError, showUserErrorMessage, USER_ERROR_MESSAGES } from '@/lib/error-handler';

export default function ResultClient() {
  const resultRef = useRef<HTMLDivElement>(null);
  const { bodyResult: result, status, setBodyResult, setStatus } = useBodyResultStore();
  const { gender, height, weight } = useApplyUserInfoStore();
  const { generatePDF, isGeneratingPDF } = useResultPdfGenerator({
    hasResult: Boolean(result),
    resultRef,
  });
  const { mutateAsync: retryResultRequest, isPending: isRetrying } = useMutation({
    mutationFn: postBodyResult,
    retry: 3,
    retryDelay: 2000,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRetry = async () => {
    const savedAnswers = getStorageJson<unknown>(STORAGE_KEYS.SURVEY_ANSWERS);
    const answers = Array.isArray(savedAnswers)
      ? savedAnswers.filter((answer) => typeof answer === 'string')
      : [];

    if (!answers.length || !gender || height <= 0 || weight <= 0) {
      showUserErrorMessage(USER_ERROR_MESSAGES.RESULT_RETRY_MISSING_INFO);
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
    } catch (error) {
      setStatus('error');
      handleAppError({
        error,
        userMessage: USER_ERROR_MESSAGES.RESULT_RETRY_FAILED,
        tags: { layer: 'api', route: 'assistant/body-result', action: 'retry_result' },
      });
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
