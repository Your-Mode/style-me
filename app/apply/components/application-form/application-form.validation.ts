import { BodyDiagnosisFormData } from '@/types/body';

const REQUIRED_TEXT_FIELDS: Array<
  keyof Pick<
    BodyDiagnosisFormData,
    'name' | 'phone' | 'email' | 'gender' | 'height' | 'weight' | 'paymentMethod'
  >
> = ['name', 'phone', 'email', 'gender', 'height', 'weight', 'paymentMethod'];

const REQUIRED_AGREEMENT_FIELDS: Array<
  keyof Pick<BodyDiagnosisFormData, 'agreePrivacy' | 'agreeService'>
> = ['agreePrivacy', 'agreeService'];

const hasTextValue = (value: string) => value.trim().length > 0;

const isPositiveNumberText = (value: string) => {
  const parsedValue = Number.parseInt(value, 10);
  return Number.isInteger(parsedValue) && parsedValue > 0;
};

export type ApplicationFormValidation = {
  isValid: boolean;
  errors: {
    requiredAgreement: string | null;
  };
};

export const validateApplicationForm = (
  formData: BodyDiagnosisFormData,
): ApplicationFormValidation => {
  const hasAllRequiredTextValues = REQUIRED_TEXT_FIELDS.every((field) =>
    hasTextValue(formData[field]),
  );
  const hasAllRequiredAgreements = REQUIRED_AGREEMENT_FIELDS.every((field) => formData[field]);
  const hasValidHeight = isPositiveNumberText(formData.height);
  const hasValidWeight = isPositiveNumberText(formData.weight);

  const requiredAgreement = hasAllRequiredAgreements
    ? null
    : '필수 동의 항목(개인정보 수집·이용, 서비스 이용약관)에 동의해 주세요.';

  return {
    isValid: hasAllRequiredTextValues && hasAllRequiredAgreements && hasValidHeight && hasValidWeight,
    errors: {
      requiredAgreement,
    },
  };
};

export const isApplicationFormValid = (formData: BodyDiagnosisFormData) =>
  validateApplicationForm(formData).isValid;
