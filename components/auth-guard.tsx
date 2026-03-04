'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { valueExists } from '@/firebase';
import { useMutation } from '@tanstack/react-query';
import SiteHeader from '@/components/common/site-header/site-header';
import PageBackground from '@/components/common/page-background/page-background';
import PageContainer from '@/components/common/page-container/page-container';
import { setStorageJson, STORAGE_KEYS } from '@/lib/client-storage';
import { captureAppError, USER_ERROR_MESSAGES } from '@/lib/error-policy';
import { IS_E2E_TEST_MODE } from '@/lib/e2e-mode';

const AUTH_SUCCESS_REDIRECT_DELAY_MS = IS_E2E_TEST_MODE ? 0 : 1500;

interface AuthGuardProps {
  children: React.ReactNode;
  requiredPage: 'complete' | 'survey';
  showHeader?: boolean;
}

interface AuthFormProps {
  phoneNumber: string;
  error: string;
  isPending: boolean;
  onPhoneChange: (value: string) => void;
  onSubmit: () => void;
  onPhoneKeyDown: (e: React.KeyboardEvent) => void;
}

function AuthSuccessMessage() {
  return (
    <div className='text-center'>
      <div className='inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6'>
        <CheckCircle className='h-8 w-8 text-white' />
      </div>
      <h3 className='text-xl font-bold text-green-600 mb-2'>?몄쬆 ?꾨즺!</h3>
      <p className='text-gray-600'>?좎떆 ???섏씠吏濡??대룞?⑸땲??..</p>
    </div>
  );
}

function AuthPhoneVerificationForm({
  phoneNumber,
  error,
  isPending,
  onPhoneChange,
  onSubmit,
  onPhoneKeyDown,
}: AuthFormProps) {
  return (
    <div className='space-y-6'>
      <div>
        <Label htmlFor='phone' className='text-gray-700 font-medium'>
          결제 시 입력한 전화번호를 입력해주세요
        </Label>
        <Input
          id='phone'
          type='tel'
          value={phoneNumber}
          onChange={(e) => onPhoneChange(e.target.value)}
          onKeyDown={onPhoneKeyDown}
          placeholder='010-1234-5678'
          className='mt-2 text-lg'
          disabled={isPending}
        />
      </div>

      {error && (
        <div className='flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg'>
          <AlertCircle className='h-5 w-5 text-red-500' />
          <span className='text-red-600 text-sm'>{error}</span>
        </div>
      )}

      <Button
        onClick={onSubmit}
        disabled={isPending || !phoneNumber.trim()}
        className='w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300'
      >
        {isPending ? (
          <div className='flex items-center'>
            <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
            ?몄쬆 以?..
          </div>
        ) : (
          '?몄쬆?섍린'
        )}
      </Button>

      <div className='text-center'>
        <p className='text-sm text-gray-500 mb-4'>?꾩쭅 寃곗젣瑜??꾨즺?섏? ?딆쑝?⑤굹??</p>
        <Link href='/apply'>
          <Button
            variant='outline'
            className='border-2 border-pink-400 text-pink-600 hover:bg-pink-50 bg-transparent'
          >
            寃곗젣?섎윭 媛湲?
          </Button>
        </Link>
      </div>

      <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
        <h4 className='font-semibold text-blue-800 mb-2'>꼭 확인하세요</h4>
        <ul className='text-sm text-blue-700 space-y-1'>
          <li>결제 시 입력한 전화번호와 정확히 일치해야 합니다.</li>
          <li>인증은 24시간 동안 유효합니다.</li>
          <li>문제가 있으면 고객센터로 문의해 주세요.</li>
        </ul>
      </div>
    </div>
  );
}

export default function AuthGuard({ children, requiredPage, showHeader = true }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutateAsync: verifyPhoneNumber, isPending } = useMutation({
    mutationFn: (normalizedPhone: string) => valueExists('apply', normalizedPhone),
  });

  const handlePhoneVerification = async () => {
    setError('');
    const normalizedPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');

    if (!normalizedPhoneNumber) {
      setError('전화번호를 입력해주세요.');
      return;
    }

    try {
      const doesPaymentInfoExist = await verifyPhoneNumber(normalizedPhoneNumber);

      if (!doesPaymentInfoExist) {
        setError('결제 정보를 찾을 수 없습니다. 먼저 결제를 완료해주세요.');
        return;
      }

      const authToken = {
        phone: normalizedPhoneNumber,
        timestamp: new Date().toISOString(),
        verified: true,
      };

      setStorageJson(STORAGE_KEYS.AUTH_TOKEN, authToken);
      setShowSuccess(true);

      window.setTimeout(() => {
        setIsAuthenticated(true);
      }, AUTH_SUCCESS_REDIRECT_DELAY_MS);
    } catch (error) {
      captureAppError(error, {
        layer: 'firebase',
        feature: 'auth-guard',
        action: 'verify-phone-number',
      });
      setError(USER_ERROR_MESSAGES.GENERIC_RETRY);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      void handlePhoneVerification();
    }
  };

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
    setError('');
  };

  if (!isAuthenticated) {
    return (
      <PageBackground className='bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50'>
        {showHeader && (
          <SiteHeader
            brandHref='/'
            navItems={[
              { label: '홈', href: '/' },
              { label: '신청하기', href: '/apply' },
              { label: '개인정보처리방침', href: '/privacy' },
              { label: '이용약관', href: '/terms' },
            ]}
          />
        )}

        <div className='py-8 px-4'>
          <PageContainer className='max-w-md'>
            <div className='text-center mb-8'>
              <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6 shadow-lg'>
                <Shield className='h-8 w-8 text-white' />
              </div>
              <h1 className='text-3xl font-bold text-gray-800 mb-4'>?묎렐 ?몄쬆</h1>
              <p className='text-gray-600'>
                {requiredPage === 'complete' ? '결제 완료' : '골격진단'} 페이지는 결제를 완료한
                고객만 이용할 수 있습니다.
              </p>
            </div>

            <Card className='border-0 shadow-xl'>
              <CardHeader className='bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-t-lg'>
                <CardTitle className='flex items-center text-xl'>
                  <Phone className='h-5 w-5 mr-2' />
                  전화번호 인증
                </CardTitle>
              </CardHeader>
              <CardContent className='p-8'>
                {showSuccess ? (
                  <AuthSuccessMessage />
                ) : (
                  <AuthPhoneVerificationForm
                    phoneNumber={phoneNumber}
                    error={error}
                    isPending={isPending}
                    onPhoneChange={handlePhoneNumberChange}
                    onSubmit={() => void handlePhoneVerification()}
                    onPhoneKeyDown={handleKeyDown}
                  />
                )}
              </CardContent>
            </Card>

            <div className='mt-8 text-center'>
              <p className='text-sm text-gray-500 mb-2'>문의사항이 있으면 연락해 주세요.</p>
              <div className='flex justify-center text-sm text-gray-600'>
                <span>✉ yourmode0604@gmail.com</span>
              </div>
            </div>
          </PageContainer>
        </div>
      </PageBackground>
    );
  }

  return <>{children}</>;
}

