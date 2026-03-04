import { useMemo, useState } from 'react';
import { BodyDiagnosisFormData } from '@/types/body';
import { INITIAL_APPLICATION_FORM_DATA } from '@/app/apply/components/application-form/application-form.constants';
import { validateApplicationForm } from '@/app/apply/components/application-form/application-form.validation';

export function useApplicationFormState() {
  const [formData, setFormData] = useState<BodyDiagnosisFormData>(INITIAL_APPLICATION_FORM_DATA);

  const updateField = <K extends keyof BodyDiagnosisFormData>(
    field: K,
    value: BodyDiagnosisFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validationResult = useMemo(() => validateApplicationForm(formData), [formData]);

  return {
    formData,
    isFormValid: validationResult.isValid,
    formErrors: validationResult.errors,
    updateField,
  };
}
