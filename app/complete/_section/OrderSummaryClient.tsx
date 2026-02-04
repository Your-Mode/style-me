'use client';

import { useEffect, useState } from 'react';
import type { BodyDiagnosisFormData } from '@/types/body';
import OrderSummary from '@/app/complete/_section/OrderSummary';

export default function OrderSummaryClient() {
  const [userInfo, setUserInfo] = useState<BodyDiagnosisFormData>();
  const [paymentDateLabel, setPaymentDateLabel] = useState('');

  useEffect(() => {
    const info = localStorage.getItem('userInfo');
    if (info) {
      setUserInfo(JSON.parse(info));
    }
    setPaymentDateLabel(new Date().toLocaleString('ko-KR'));
  }, []);

  return <OrderSummary userInfo={userInfo} paymentDateLabel={paymentDateLabel} />;
}
