'use client';

import { useMutation } from '@tanstack/react-query';
import { BodyResultRequest, postBodyResult } from '@/apis/chat';
import { useRouter } from 'next/navigation';
import { useBodyResultStore } from '@/hooks/useBodyResultStore';
import { handleAppError, USER_ERROR_MESSAGES } from '@/lib/error-handler';

export const usePostResult = () => {
  const router = useRouter();
  const { setBodyResult } = useBodyResultStore();
  const result = useMutation({
    mutationFn: (request: BodyResultRequest) => postBodyResult(request),
    retry: 3,
    retryDelay: 2000,
    onSuccess: (data) => {
      if (data) {
        setBodyResult(data);
        router.push(`/result`);
      } else {
        handleAppError({
          error: new Error('Body result response is empty'),
          userMessage: USER_ERROR_MESSAGES.RESULT_SUBMIT_FAILED,
          tags: { layer: 'api', route: 'assistant/body-result', action: 'empty_result_response' },
        });
      }
    },
    onError: (error) => {
      handleAppError({
        error,
        userMessage: USER_ERROR_MESSAGES.RESULT_SUBMIT_FAILED,
        tags: { layer: 'api', route: 'assistant/body-result', action: 'submit_result' },
      });
    },
  });

  return result;
};
