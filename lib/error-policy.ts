import * as Sentry from '@sentry/nextjs';

const ERROR_POLICY_VERSION = 'v1';

export const USER_ERROR_MESSAGES = {
  GENERIC_RETRY:
    '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  APPLICATION_ALREADY_EXISTS:
    '이미 해당 전화번호로 유효한 신청이 있습니다. 이름과 전화번호를 확인한 뒤 고객센터로 문의해주세요.',
  RESULT_REQUEST_FAILED:
    '결과 요청에 실패했습니다. 잠시 후 다시 시도해주세요.',
  PDF_GENERATION_FAILED:
    'PDF 생성에 실패했습니다. 잠시 후 다시 시도해주세요.',
} as const;

type ErrorLayer = 'api' | 'ui' | 'storage' | 'firebase';

type CaptureErrorOptions = {
  layer: ErrorLayer;
  feature: string;
  action: string;
  tags?: Record<string, string>;
  extra?: Record<string, unknown>;
};

function normalizeError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }

  const message = typeof error === 'string' ? error : 'Unknown error';
  return new Error(message);
}

export function captureAppError(error: unknown, options: CaptureErrorOptions): Error {
  const normalizedError = normalizeError(error);

  Sentry.captureException(normalizedError, {
    tags: {
      layer: options.layer,
      feature: options.feature,
      action: options.action,
      policy: ERROR_POLICY_VERSION,
      ...options.tags,
    },
    extra: options.extra,
  });

  return normalizedError;
}
