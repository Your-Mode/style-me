import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SectionHeader from '@/components/common/section-header/section-header';

export default function ServiceFeaturesSection() {
  return (
    <section id='service' className='py-20 px-6 bg-white/70 backdrop-blur-sm'>
      <div className='container mx-auto'>
        <SectionHeader
          title='스타일링 서비스'
          subtitle='AI 기술과 전문 스타일리스트의 노하우가 만나 당신만의 완벽한 스타일을 완성합니다'
          subtitleClassName='max-w-2xl mx-auto'
        />

        <div className='max-w-4xl mx-auto'>
          <Card className='border-2 border-rose-200 bg-gradient-to-br from-white to-rose-50/50 shadow-xl'>
            <CardHeader className='bg-gradient-to-r from-rose-400 to-pink-500 text-white p-8 rounded-t-lg'>
              <CardTitle className='text-3xl font-bold flex items-center justify-center'>
                <span className='text-4xl mr-4'>💄</span>
                AI 퍼스널 스타일링
              </CardTitle>
            </CardHeader>
            <CardContent className='p-12'>
              <div className='text-center mb-10'>
                <div className='mb-4'>
                  <span className='text-3xl line-through text-gray-400 mr-4'>30,000원</span>
                  <span className='text-5xl font-bold text-rose-500'>0원</span>
                </div>
                <div className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full mb-4'>
                  <span className='text-rose-700 font-bold'>🎉 런칭 기념 무료 이벤트</span>
                </div>
                <p className='text-gray-600 text-lg leading-relaxed'>
                  최신 AI 기술로 정확한 골격 분석을 받고, 전문 스타일리스트가 설계한 맞춤형 스타일링
                  가이드를 무료로 만나보세요!
                </p>
              </div>

              <div className='grid md:grid-cols-2 gap-10'>
                <div>
                  <h4 className='font-bold text-rose-500 mb-6 text-lg flex items-center'>
                    <span className='text-2xl mr-2'>✨</span>
                    포함 서비스
                  </h4>
                  <ul className='space-y-4'>
                    <li className='flex items-center text-gray-700'>
                      <span className='text-xl mr-3'>👗</span>
                      <span>17문항 정밀 골격 진단</span>
                    </li>
                    <li className='flex items-center text-gray-700'>
                      <span className='text-xl mr-3'>🎨</span>
                      <span>개인 맞춤 스타일링 가이드</span>
                    </li>
                    <li className='flex items-center text-gray-700'>
                      <span className='text-xl mr-3'>🛍️</span>
                      <span>개인 맞춤 패션 제품 추천</span>
                    </li>
                    <li className='flex items-center text-gray-700'>
                      <span className='text-xl mr-3'>💎</span>
                      <span>액세서리 스타일링 팁</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className='font-bold text-pink-500 mb-6 text-lg flex items-center'>
                    <span className='text-2xl mr-2'>💎</span>
                    특별 혜택
                  </h4>
                  <ul className='space-y-4'>
                    <li className='flex items-center text-gray-700'>
                      <span className='text-xl mr-3'>⚡</span>
                      <span>즉시 결과 확인 (10분)</span>
                    </li>
                    <li className='flex items-center text-gray-700'>
                      <span className='text-xl mr-3'>📱</span>
                      <span>모바일 최적화 가이드</span>
                    </li>
                    <li className='flex items-center text-gray-700'>
                      <span className='text-xl mr-3'>👔</span>
                      <span>체형별 코디 가이드</span>
                    </li>
                    <li className='flex items-center text-gray-700'>
                      <span className='text-xl mr-3'>♾️</span>
                      <span>평생 활용 가능</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className='mt-10 p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-200'>
                <p className='text-rose-600 text-center font-medium'>
                  <strong>이런 분께 추천:</strong> 나에게 어울리는 스타일을 찾고 싶은 분, 쇼핑할 때
                  확신이 필요한 분, 이미지 변신을 원하는 분
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
