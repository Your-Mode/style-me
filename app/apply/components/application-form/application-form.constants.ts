import { BodyDiagnosisFormData } from '@/types/body';

export const MAX_UPLOAD_IMAGE_COUNT = 3;
export const MAX_UPLOAD_IMAGE_SIZE_MB = 5;
export const MAX_UPLOAD_IMAGE_SIZE_BYTES = MAX_UPLOAD_IMAGE_SIZE_MB * 1024 * 1024;
export const ALLOWED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png'] as const;

export const SUBMIT_DELAY_MS = 2000;

export const INITIAL_APPLICATION_FORM_DATA: BodyDiagnosisFormData = {
  name: '',
  phone: '',
  email: '',
  gender: '',
  height: '',
  weight: '',
  agreePrivacy: false,
  agreeService: false,
  paymentMethod: '',
};
