import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { postBodyResult } from '@/apis/chat';
import { useMutation } from '@tanstack/react-query';
import { saveSurveyAnswers } from '@/firebase';
import { useApplyUserInfoStore } from '@/hooks/useApplyUserInfoStore';
import { useBodyResultStore } from '@/hooks/useBodyResultStore';

const AUTH_TOKEN_STORAGE_KEY = 'authToken';

function getPhoneFromAuthToken(): string | null {
  try {
    const authTokenRaw = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    if (!authTokenRaw) return null;

    const token = JSON.parse(authTokenRaw) as { phone?: string };
    return token.phone ?? null;
  } catch {
    return null;
  }
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

      localStorage.setItem('surveyAnswers', JSON.stringify(answers));

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
