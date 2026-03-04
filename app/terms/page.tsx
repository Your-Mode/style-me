import type { Metadata } from 'next';
import PageBackground from '@/components/common/page-background/page-background';
import PageContainer from '@/components/common/page-container/page-container';
import { TERMS_OF_SERVICE_VERSION } from '@/lib/privacy-consent';

export const metadata: Metadata = {
  title: '서비스 이용약관',
  description: 'Style Me 서비스 이용약관 안내',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <PageBackground className='bg-gradient-to-br from-slate-50 via-white to-amber-50 py-10 px-4'>
      <PageContainer className='max-w-3xl'>
        <main className='bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-5'>
          <h1 className='text-2xl font-bold text-slate-900'>서비스 이용약관</h1>
          <p className='text-sm text-slate-600'>버전: v{TERMS_OF_SERVICE_VERSION}</p>

          <section className='space-y-2'>
            <h2 className='text-lg font-semibold text-slate-900'>1. 서비스 목적</h2>
            <p className='text-sm text-slate-700'>
              본 서비스는 이용자가 입력한 정보 기반으로 골격 진단 및 스타일링 가이드를 제공합니다.
            </p>
          </section>

          <section className='space-y-2'>
            <h2 className='text-lg font-semibold text-slate-900'>2. 이용자 의무</h2>
            <p className='text-sm text-slate-700'>
              이용자는 본인 정보를 정확히 입력해야 하며, 타인의 정보를 무단으로 입력해서는 안 됩니다.
            </p>
          </section>

          <section className='space-y-2'>
            <h2 className='text-lg font-semibold text-slate-900'>3. 이용 제한</h2>
            <p className='text-sm text-slate-700'>
              비정상적 요청, 시스템 악용, 부정 사용이 확인되는 경우 서비스 이용이 제한될 수 있습니다.
            </p>
          </section>

          <section className='space-y-2'>
            <h2 className='text-lg font-semibold text-slate-900'>4. 약관 변경</h2>
            <p className='text-sm text-slate-700'>
              약관이 변경되는 경우 적용일 전에 공지하며, 변경 버전이 신청 화면 및 정책 문서에 반영됩니다.
            </p>
          </section>
        </main>
      </PageContainer>
    </PageBackground>
  );
}
