import { useCallback } from 'react';
import type { BodyResultRequest } from '@/apis/chat';
import { saveSurveyAnswers } from '@/firebase';
import { useApplyUserInfoStore } from '@/hooks/useApplyUserInfoStore';
import { usePostResult } from '@/hooks/usePostResult';

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
  addBotMessage: (message: string) => void;
}

export function useSurveyCompletion() {
  const { mutate: postResult } = usePostResult();
  const { gender, height, weight } = useApplyUserInfoStore();

  const completeSurvey = useCallback(
    async ({ answers, addBotMessage }: CompleteSurveyParams) => {
      const tokenPhone = getPhoneFromAuthToken();
      if (tokenPhone) {
        try {
          await saveSurveyAnswers(tokenPhone, answers);
        } catch {
          // 설문 저장 실패 시에도 분석 흐름은 이어간다.
        }
      }

      localStorage.setItem('surveyAnswers', JSON.stringify(answers));

      addBotMessage(
        '모든 질문이 완료되었어요! 🎉\n\n지금 당신만의 완벽한 스타일을 분석하고 있어요. 조금만 기다려주세요... ✨\n\n📊 답변이 안전하게 저장되었습니다!',
      );

      const requestData: BodyResultRequest = {
        answers,
        gender,
        height,
        weight,
      };

      postResult(requestData);
    },
    [gender, height, postResult, weight],
  );

  return { completeSurvey };
}
