import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { postBodyResult } from '@/apis/chat';
import { useMutation } from '@tanstack/react-query';
import { saveSurveyAnswers } from '@/firebase';
import { useApplyUserInfoStore } from '@/hooks/useApplyUserInfoStore';
import { useBodyResultStore } from '@/hooks/useBodyResultStore';
import { getStorageJson, setStorageJson, STORAGE_KEYS } from '@/lib/client-storage';

function getPhoneFromAuthToken(): string | null {
  const token = getStorageJson<{ phone?: string }>(STORAGE_KEYS.AUTH_TOKEN);
  return token?.phone ?? null;
}

interface CompleteSurveyParams {
  answers: string[];
}

export function useSurveyCompletion() {
  const router = useRouter();
  const { gender, height, weight } = useApplyUserInfoStore();
  const { clearBodyResult, setBodyResult, setStatus } = useBodyResultStore();
  const { mutateAsync: requestBodyResult } = useMutation({
    mutationFn: postBodyResult,
    retry: 3,
    retryDelay: 2000,
  });

  const completeSurvey = useCallback(
    async ({ answers }: CompleteSurveyParams) => {
      const tokenPhone = getPhoneFromAuthToken();
      if (tokenPhone) {
        try {
          await saveSurveyAnswers(tokenPhone, answers);
        } catch {
          // 설문 저장 실패 시에도 분석 흐름은 이어간다.
        }
      }

      setStorageJson(STORAGE_KEYS.SURVEY_ANSWERS, answers);

      clearBodyResult();
      setStatus('loading');
      router.push('/result');

      const requestData = {
        answers,
        gender,
        height,
        weight,
      };

      try {
        const result = await requestBodyResult(requestData);
        setBodyResult(result);
      } catch {
        setStatus('error');
        alert('결과 제출에 실패했습니다. 다시 시도해주세요.');
      }
    },
    [clearBodyResult, gender, height, requestBodyResult, router, setBodyResult, setStatus, weight],
  );

  return { completeSurvey };
}
