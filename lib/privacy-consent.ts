import { BodyDiagnosisFormData } from '@/types/body';

export const PRIVACY_POLICY_PATH = '/privacy';
export const TERMS_OF_SERVICE_PATH = '/terms';

export const PRIVACY_POLICY_VERSION = '2026-03-04';
export const TERMS_OF_SERVICE_VERSION = '2026-03-04';
export const CONSENT_NOTICE_VERSION = '2026-03-04';

export const DATA_RETENTION_POLICY = '서비스 종료 후 1년 보관 후 파기';
export const RIGHTS_REQUEST_CHANNEL = '하단 문의하기 폼 또는 카카오 채널';
export const THIRD_PARTY_NOTICE =
  '결제/메시지/이메일 발송 과정에서 처리위탁이 발생할 수 있으며, 상세 내용은 개인정보처리방침에서 확인할 수 있습니다.';

export type ConsentSnapshot = {
  agreePrivacy: boolean;
  agreeService: boolean;
  agreePhotoProcessing: boolean;
  agreeMarketing: boolean;
  policyVersion: string;
  termsVersion: string;
  consentNoticeVersion: string;
  agreedAtISO: string;
  requestId: string;
};

export function createConsentSnapshot(
  formData: BodyDiagnosisFormData,
  requestId: string,
): ConsentSnapshot {
  return {
    agreePrivacy: formData.agreePrivacy,
    agreeService: formData.agreeService,
    agreePhotoProcessing: formData.agreePhotoProcessing,
    agreeMarketing: formData.agreeMarketing,
    policyVersion: PRIVACY_POLICY_VERSION,
    termsVersion: TERMS_OF_SERVICE_VERSION,
    consentNoticeVersion: CONSENT_NOTICE_VERSION,
    agreedAtISO: new Date().toISOString(),
    requestId,
  };
}
