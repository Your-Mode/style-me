'use client';

import { useEffect, useState } from 'react';
import type { BodyDiagnosisFormData } from '@/types/body';
import OrderSummary from '@/app/complete/_section/OrderSummary';
import { getStorageJson, STORAGE_KEYS } from '@/lib/client-storage';

export default function OrderSummaryClient() {
  const [userInfo, setUserInfo] = useState<BodyDiagnosisFormData>();
  const [paymentDateLabel, setPaymentDateLabel] = useState('');

  useEffect(() => {
    const info = getStorageJson<BodyDiagnosisFormData>(STORAGE_KEYS.USER_INFO);
    if (info) setUserInfo(info);
    setPaymentDateLabel(new Date().toLocaleString('ko-KR'));
  }, []);

  return <OrderSummary userInfo={userInfo} paymentDateLabel={paymentDateLabel} />;
}
