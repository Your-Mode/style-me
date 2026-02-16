import * as Sentry from '@sentry/nextjs';

export const USER_ERROR_MESSAGES = {
  RESULT_SUBMIT_FAILED: '결과 제출에 실패했습니다. 다시 시도해주세요.',
  RESULT_RETRY_FAILED: '결과 재요청에 실패했습니다. 잠시 후 다시 시도해주세요.',
  RESULT_RETRY_MISSING_INFO: '재요청에 필요한 설문 정보가 없습니다. 설문을 다시 진행해주세요.',
  PDF_GENERATION_FAILED: 'PDF 생성 중 오류가 발생했습니다. 다시 시도해주세요.',
} as const;

type ErrorTags = Record<string, string>;
type ErrorExtra = Record<string, unknown>;

interface CaptureAppErrorParams {
  error: unknown;
  tags?: ErrorTags;
  extra?: ErrorExtra;
}

interface HandleAppErrorParams extends CaptureAppErrorParams {
  userMessage?: string;
}

function normalizeError(error: unknown): Error {
  if (error instanceof Error) return error;
  if (typeof error === 'string') return new Error(error);
  return new Error('Unknown error');
}

export function captureAppError({ error, tags = {}, extra = {} }: CaptureAppErrorParams): void {
  const normalizedError = normalizeError(error);
  Sentry.captureException(normalizedError, {
    tags: {
      layer: 'app',
      ...tags,
    },
    extra,
  });
}

export function showUserErrorMessage(message: string): void {
  if (typeof window === 'undefined') return;
  window.alert(message);
}

export function handleAppError({ error, userMessage, tags, extra }: HandleAppErrorParams): void {
  captureAppError({ error, tags, extra });

  if (userMessage) {
    showUserErrorMessage(userMessage);
  }
}
