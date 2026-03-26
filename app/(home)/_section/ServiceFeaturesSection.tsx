import { Card, CardContent } from '@/components/ui/card';
import SectionHeader from '@/components/common/section-header/section-header';
import { Brain, Palette, Shirt } from 'lucide-react';

export default function ServiceFeaturesSection() {
  return (
    <section id='service' className='px-6 py-20'>
      <div className='container mx-auto'>
        <SectionHeader
          title='스타일링 서비스'
          subtitle='분석에서 끝나지 않고, 바로 입을 수 있는 스타일 제안까지 전달합니다'
          subtitleClassName='max-w-2xl mx-auto'
        />

        <div className='mx-auto grid max-w-5xl gap-6 md:grid-cols-3'>
          {[
            {
              title: '정밀 골격 분석',
              description: '설문 기반으로 체형 강점과 실루엣 특성을 분류합니다.',
              icon: <Brain className='h-5 w-5 text-rose-600' />,
              tone: 'border-rose-200 bg-rose-50/70',
            },
            {
              title: '개인화 스타일 가이드',
              description: '추천/주의/보완 포인트를 실행 가능한 문장으로 제공합니다.',
              icon: <Palette className='h-5 w-5 text-amber-600' />,
              tone: 'border-amber-200 bg-amber-50/70',
            },
            {
              title: '코디 중심 결과물',
              description: '쇼핑과 코디에 바로 쓸 수 있는 요약형 PDF를 생성합니다.',
              icon: <Shirt className='h-5 w-5 text-sky-600' />,
              tone: 'border-sky-200 bg-sky-50/70',
            },
          ].map((feature) => (
            <Card key={feature.title} className={`border shadow-sm ${feature.tone}`}>
              <CardContent className='p-6'>
                <div className='mb-3 inline-flex rounded-lg bg-white p-2 shadow-sm'>{feature.icon}</div>
                <h3 className='mb-2 text-lg font-bold text-slate-900'>{feature.title}</h3>
                <p className='text-sm leading-relaxed text-slate-600'>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='mx-auto mt-8 max-w-5xl'>
          <Card className='border border-slate-200 bg-white/85 shadow-lg backdrop-blur'>
            <CardContent className='p-7'>
              <div className='mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
                <div>
                  <p className='text-sm font-semibold tracking-wide text-slate-500'>현재 제공 범위</p>
                  <h3 className='text-2xl font-bold text-slate-900'>AI 퍼스널 스타일링 리포트</h3>
                </div>
                <div className='text-right'>
                  <p className='text-sm text-slate-400 line-through'>정가 30,000원</p>
                  <p className='text-3xl font-bold text-rose-600'>런칭 이벤트 0원</p>
                </div>
              </div>

              <div className='grid gap-4 sm:grid-cols-2'>
                <div className='rounded-xl border border-slate-200 bg-slate-50 p-4'>
                  <p className='text-sm font-semibold text-slate-700'>포함 항목</p>
                  <ul className='mt-3 space-y-2 text-sm text-slate-600'>
                    <li>15문항 정밀 골격 진단</li>
                    <li>개인 맞춤 스타일링 가이드</li>
                    <li>패션 제품 및 액세서리 추천</li>
                  </ul>
                </div>
                <div className='rounded-xl border border-slate-200 bg-slate-50 p-4'>
                  <p className='text-sm font-semibold text-slate-700'>이런 분께 추천</p>
                  <ul className='mt-3 space-y-2 text-sm text-slate-600'>
                    <li>옷을 살 때 확신이 필요한 분</li>
                    <li>체형에 맞는 실루엣이 궁금한 분</li>
                    <li>빠르게 스타일 방향을 잡고 싶은 분</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

