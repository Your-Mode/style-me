import type { Metadata } from 'next';
import PageBackground from '@/components/common/page-background/page-background';
import PageContainer from '@/components/common/page-container/page-container';
import {
  CONSENT_NOTICE_VERSION,
  DATA_RETENTION_POLICY,
  PRIVACY_POLICY_VERSION,
  RIGHTS_REQUEST_CHANNEL,
  TERMS_OF_SERVICE_VERSION,
  THIRD_PARTY_NOTICE,
} from '@/lib/privacy-consent';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: 'Style Me 개인정보 처리 기준과 이용자 권리 안내',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <PageBackground className='bg-gradient-to-br from-slate-50 via-white to-rose-50 py-10 px-4'>
      <PageContainer className='max-w-3xl'>
        <main className='bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-5'>
          <h1 className='text-2xl font-bold text-slate-900'>개인정보처리방침</h1>
          <p className='text-sm text-slate-600'>버전: v{PRIVACY_POLICY_VERSION}</p>

          <section className='space-y-2'>
            <h2 className='text-lg font-semibold text-slate-900'>1. 수집 항목</h2>
            <p className='text-sm text-slate-700'>
              이름, 연락처, 이메일, 성별, 키/몸무게, 선택 항목(사진 업로드 동의/마케팅 동의), 결제수단
            </p>
          </section>

          <section className='space-y-2'>
            <h2 className='text-lg font-semibold text-slate-900'>2. 이용 목적</h2>
            <p className='text-sm text-slate-700'>
              골격 진단 서비스 제공, 결과 안내, 서비스 품질 개선, 고객 문의 대응
            </p>
          </section>

          <section className='space-y-2'>
            <h2 className='text-lg font-semibold text-slate-900'>3. 보관 및 파기</h2>
            <p className='text-sm text-slate-700'>{DATA_RETENTION_POLICY}</p>
          </section>

          <section className='space-y-2'>
            <h2 className='text-lg font-semibold text-slate-900'>4. 처리위탁/제3자 관련 안내</h2>
            <p className='text-sm text-slate-700'>{THIRD_PARTY_NOTICE}</p>
          </section>

          <section className='space-y-2'>
            <h2 className='text-lg font-semibold text-slate-900'>5. 이용자 권리 행사</h2>
            <p className='text-sm text-slate-700'>
              열람/정정/삭제 요청은 다음 채널로 접수할 수 있습니다: {RIGHTS_REQUEST_CHANNEL}
            </p>
          </section>

          <section className='space-y-2'>
            <h2 className='text-lg font-semibold text-slate-900'>6. 동의 버전 관리</h2>
            <p className='text-sm text-slate-700'>
              개인정보처리방침 v{PRIVACY_POLICY_VERSION}, 이용약관 v{TERMS_OF_SERVICE_VERSION}, 고지문
              v{CONSENT_NOTICE_VERSION} 기준으로 동의 이력을 저장합니다.
            </p>
          </section>
        </main>
      </PageContainer>
    </PageBackground>
  );
}
