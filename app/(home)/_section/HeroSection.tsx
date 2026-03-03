import { ArrowRight, BadgeCheck, Check, Clock3, LineChart, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className='relative overflow-hidden px-6 py-16 md:py-24'>
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute -top-10 -left-6 h-52 w-52 rounded-full bg-rose-200/50 blur-3xl' />
        <div className='absolute top-1/3 -right-10 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl' />
        <div className='absolute -bottom-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-200/35 blur-3xl' />
      </div>

      <div className='container relative z-10 mx-auto'>
        <div className='grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]'>
          <div>
            <div className='mb-6 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/90 px-4 py-2 shadow-sm backdrop-blur'>
              <Sparkles className='h-4 w-4 text-rose-500' />
              <span className='text-sm font-semibold text-rose-700'>AI 기반 개인 맞춤 스타일링</span>
            </div>

            <h1 className='mb-6 text-4xl font-bold leading-tight text-slate-900 md:text-6xl'>
              결제 후 바로 받는
              <br />
              <span className='bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 bg-clip-text text-transparent'>
                프리미엄 스타일 리포트
              </span>
            </h1>

            <p className='mb-8 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl'>
              골격 진단 결과를 끝내지 않고, 실제 코디에 바로 쓰는 추천/주의/보완 포인트까지 한 번에 제공합니다.
            </p>

            <div className='mb-8 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:items-center'>
              <span className='inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 ring-1 ring-slate-200'>
                <Clock3 className='h-4 w-4 text-rose-500' />
                10분 내 완료
              </span>
              <span className='inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 ring-1 ring-slate-200'>
                <ShieldCheck className='h-4 w-4 text-emerald-500' />
                개인 맞춤 분석
              </span>
              <span className='inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 ring-1 ring-slate-200'>
                <LineChart className='h-4 w-4 text-sky-500' />
                결과 PDF 저장
              </span>
            </div>

            <div className='mb-10 flex flex-col gap-4 sm:flex-row'>
              <Link href='/apply'>
                <Button className='h-12 rounded-xl bg-slate-900 px-8 text-base font-semibold text-white hover:bg-slate-800'>
                  진단 시작하기
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </Link>
              <a
                href='#service'
                className='inline-flex h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-8 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50'
              >
                서비스 살펴보기
              </a>
            </div>

            <div className='grid grid-cols-3 gap-4 sm:max-w-lg'>
              <div className='rounded-xl border border-rose-200/70 bg-white/85 p-4 shadow-sm backdrop-blur'>
                <p className='text-2xl font-bold text-rose-600'>1,000+</p>
                <p className='text-xs font-medium text-slate-500'>누적 진단</p>
              </div>
              <div className='rounded-xl border border-amber-200/70 bg-white/85 p-4 shadow-sm backdrop-blur'>
                <p className='text-2xl font-bold text-amber-600'>99%</p>
                <p className='text-xs font-medium text-slate-500'>만족도</p>
              </div>
              <div className='rounded-xl border border-sky-200/70 bg-white/85 p-4 shadow-sm backdrop-blur'>
                <p className='text-2xl font-bold text-sky-600'>PDF</p>
                <p className='text-xs font-medium text-slate-500'>리포트 제공</p>
              </div>
            </div>
          </div>

          <div className='rounded-3xl border border-slate-200/80 bg-white/85 p-6 shadow-2xl backdrop-blur md:p-7'>
            <div className='mb-4 flex items-center justify-between'>
              <p className='text-sm font-semibold tracking-wide text-slate-500'>RESULT PREVIEW</p>
              <span className='rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700'>
                분석 완료
              </span>
            </div>
            <div className='rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 p-5 text-white'>
              <p className='mb-2 text-sm text-rose-100'>진단 타입</p>
              <p className='text-2xl font-bold'>웨이브 타입</p>
              <p className='mt-2 text-sm text-rose-100'>곡선을 살리는 실루엣이 강점을 극대화합니다.</p>
            </div>

            <div className='mt-5 space-y-3'>
              {[
                '추천: 허리 라인이 보이는 자켓',
                '피해야 할 스타일: 과한 박시 핏 상의',
                '보완 팁: 목선이 열린 상의로 밸런스 조절',
              ].map((item, index) => (
                <div
                  key={index}
                  className='flex items-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700'
                >
                  <Check className='mr-2 h-4 w-4 text-emerald-500' />
                  {item}
                </div>
              ))}
            </div>

            <div className='mt-5 flex items-center gap-2 rounded-xl bg-slate-100/80 px-3 py-2 text-sm text-slate-600'>
              <BadgeCheck className='h-4 w-4 text-slate-700' />
              리포트 PDF로 저장해서 쇼핑할 때 바로 참고
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
