import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { applyBodyDiagnosis } from '@/firebase';
import { useApplyUserInfoStore } from '@/hooks/useApplyUserInfoStore';
import { BodyDiagnosisFormData } from '@/types/body';
import { SUBMIT_DELAY_MS } from '@/app/apply/components/application-form/application-form.constants';
import { setStorageJson, STORAGE_KEYS } from '@/lib/client-storage';

type UseApplicationSubmitParams = {
  formData: BodyDiagnosisFormData;
  isFormValid: boolean;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useApplicationSubmit({ formData, isFormValid }: UseApplicationSubmitParams) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();
  const { setGender, setHeight, setWeight } = useApplyUserInfoStore();

  const handleSubmit = async () => {
    if (!isFormValid || isSubmitting) return;

    const height = Number.parseInt(formData.height, 10);
    const weight = Number.parseInt(formData.weight, 10);

    if (Number.isNaN(height) || Number.isNaN(weight) || height <= 0 || weight <= 0) {
      setSubmitError('키와 몸무게는 0보다 큰 숫자로 입력해주세요.');
      return;
    }

    setWeight(weight);
    setHeight(height);
    setGender(formData.gender);

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await applyBodyDiagnosis(formData);
      await wait(SUBMIT_DELAY_MS);
      setStorageJson(STORAGE_KEYS.USER_INFO, formData);
      router.push('/complete');
    } catch {
      setSubmitError('신청 처리 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitError,
    handleSubmit,
  };
}
