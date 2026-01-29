import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Clock, Shield } from 'lucide-react';

export default function FAQSection() {
  return (
    <section id='faq' className='py-20 px-6 bg-white/70 backdrop-blur-sm'>
      <div className='container mx-auto max-w-4xl'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-gray-800 mb-6'>자주 묻는 질문</h2>
          <p className='text-xl text-gray-600 font-light'>궁금한 점들을 미리 확인해보세요</p>
        </div>

        <Accordion type='single' collapsible className='space-y-6'>
          <AccordionItem
            value='item-1'
            className='bg-white rounded-2xl shadow-lg border-2 border-rose-200'
          >
            <AccordionTrigger className='px-8 py-6 text-left font-bold text-gray-800 hover:text-rose-500 text-lg'>
              <div className='flex items-center'>
                <Clock className='h-6 w-6 mr-4 text-rose-400' />
                진단에 얼마나 시간이 걸리나요?
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-8 pb-6 text-gray-600 leading-relaxed'>
              총 17개의 질문에 답변하는데 약 10-15분 정도 소요됩니다. 각 질문은 선택형으로 되어있어
              빠르게 진행할 수 있으며, 결제 완료 후 즉시 진단을 시작할 수 있습니다. 진단 결과는 설문
              완료 즉시 확인 가능합니다.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value='item-2'
            className='bg-white rounded-2xl shadow-lg border-2 border-rose-200'
          >
            <AccordionTrigger className='px-8 py-6 text-left font-bold text-gray-800 hover:text-rose-500 text-lg'>
              <div className='flex items-center'>
                <span className='text-2xl mr-4'>🎨</span>
                어떤 스타일링 가이드를 받을 수 있나요?
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-8 pb-6 text-gray-600 leading-relaxed'>
              골격 타입에 따른 맞춤형 의상 추천, 체형별 코디 가이드, 액세서리 스타일링 팁, 개인 맞춤
              패션 제품 추천 등 종합적인 스타일링 가이드를 제공합니다. 모든 가이드는 당신의 골격
              타입에 최적화되어 있어요.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value='item-3'
            className='bg-white rounded-2xl shadow-lg border-2 border-rose-200'
          >
            <AccordionTrigger className='px-8 py-6 text-left font-bold text-gray-800 hover:text-rose-500 text-lg'>
              <div className='flex items-center'>
                <span className='text-2xl mr-4'>👔</span>
                어떤 체형별 코디 가이드를 받을 수 있나요?
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-8 pb-6 text-gray-600 leading-relaxed'>
              골격 타입에 따른 맞춤형 의상 추천, 체형별 최적의 핏과 실루엣 가이드, 액세서리 스타일링
              팁, 개인 맞춤 패션 제품 추천 등을 제공합니다. 각 골격 타입의 특성을 살린 구체적인 코디
              방법을 안내해드려요.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value='item-4'
            className='bg-white rounded-2xl shadow-lg border-2 border-rose-200'
          >
            <AccordionTrigger className='px-8 py-6 text-left font-bold text-gray-800 hover:text-rose-500 text-lg'>
              <div className='flex items-center'>
                <Shield className='h-6 w-6 mr-4 text-rose-400' />
                환불 정책은 어떻게 되나요?
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-8 pb-6 text-gray-600 leading-relaxed'>
              결제 후 진단을 시작하기 전까지는 100% 환불이 가능합니다. 진단 완료 후에는 디지털
              콘텐츠 특성상 환불이 어려우나, 기술적 오류나 서비스 불만족 시 고객센터로 연락주시면
              개별 검토 후 처리해드립니다.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
