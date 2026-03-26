import { BodyDiagnosisFormData } from '@/types/body';
import { IS_E2E_TEST_MODE } from '@/lib/e2e-mode';
import {
  CONSENT_NOTICE_VERSION,
  DATA_RETENTION_POLICY,
  PRIVACY_POLICY_PATH,
  PRIVACY_POLICY_VERSION,
  RIGHTS_REQUEST_CHANNEL,
  TERMS_OF_SERVICE_PATH,
  TERMS_OF_SERVICE_VERSION,
  THIRD_PARTY_NOTICE,
} from '@/lib/privacy-consent';

export const MAX_UPLOAD_IMAGE_COUNT = 3;
export const MAX_UPLOAD_IMAGE_SIZE_MB = 5;
export const MAX_UPLOAD_IMAGE_SIZE_BYTES = MAX_UPLOAD_IMAGE_SIZE_MB * 1024 * 1024;
export const ALLOWED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png'] as const;

export const SUBMIT_DELAY_MS = IS_E2E_TEST_MODE ? 0 : 2000;

export const REQUIRED_AGREEMENT_GUIDE_TEXT =
  '신청을 진행하려면 개인정보 수집·이용 및 서비스 이용약관 동의가 필요합니다.';

export const POLICY_LINKS = {
  privacy: PRIVACY_POLICY_PATH,
  terms: TERMS_OF_SERVICE_PATH,
} as const;

export const POLICY_VERSIONS = {
  privacy: PRIVACY_POLICY_VERSION,
  terms: TERMS_OF_SERVICE_VERSION,
  consentNotice: CONSENT_NOTICE_VERSION,
} as const;

export const PRIVACY_OPERATION_NOTICE = {
  retention: DATA_RETENTION_POLICY,
  rights: RIGHTS_REQUEST_CHANNEL,
  thirdParty: THIRD_PARTY_NOTICE,
} as const;

export const INITIAL_APPLICATION_FORM_DATA: BodyDiagnosisFormData = {
  name: '',
  phone: '',
  email: '',
  gender: '',
  height: '',
  weight: '',
  agreePrivacy: false,
  agreeService: false,
  agreePhotoProcessing: false,
  agreeMarketing: false,
  paymentMethod: '',
};
