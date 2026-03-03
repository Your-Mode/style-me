import { Card, CardContent } from '@/components/ui/card';
import SectionCard from '@/components/common/section-card/section-card';
import TextParagraphs from '@/components/common/text-paragraphs/text-paragraphs';
import { Sparkles, Shirt, Star, Heart, X, CheckCircle2, TriangleAlert, BadgeCheck } from 'lucide-react';
import type { BodyResultResponse } from '@/apis/chat';
import type { RefObject } from 'react';

interface ResultContentProps {
  result: BodyResultResponse;
  resultRef: RefObject<HTMLDivElement | null>;
  userProfile: {
    gender: string;
    height: number;
    weight: number;
  };
}

const ANALYSIS_VERSION = 'STYLE-ME-RESULT-V1';

const TYPE_LABEL_MAP: Record<string, string> = {
  natural: '내추럴 타입',
  wave: '웨이브 타입',
  straight: '스트레이트 타입',
};

const GENDER_LABEL_MAP: Record<string, string> = {
  male: '남성',
  female: '여성',
};

const getTypeEmoji = (type: string) => {
  switch (type) {
    case 'natural':
      return '🌿';
    case 'wave':
      return '🌸';
    case 'straight':
      return '⭐';
    default:
      return '✨';
  }
};

function splitLines(text: string) {
  return text
    .split('\n')
    .map((line) => line.replace(/^[\-\u2022]\s*/, '').trim())
    .filter((line) => line.length > 0);
}

function getTopLines(text: string, maxCount: number) {
  return splitLines(text).slice(0, maxCount);
}

function formatGender(gender: string) {
  if (!gender) {
    return '미입력';
  }
  return GENDER_LABEL_MAP[gender.toLowerCase()] ?? gender;
}

function formatBodyType(type: string) {
  const normalizedType = type.toLowerCase();
  return TYPE_LABEL_MAP[normalizedType] ?? type;
}

export default function ResultContent({ result, resultRef, userProfile }: ResultContentProps) {
  const recommendedTopLines = getTopLines(result.recommended_styles, 3);
  const avoidTopLines = getTopLines(result.avoid_styles, 3);
  const fixTopLines = getTopLines(result.styling_fixes, 3);
  const attractionTopLine = getTopLines(result.attraction_points, 1)[0] ?? '신체 밸런스 기반 강점이 확인되었습니다.';
  const typeDescriptionTopLine = getTopLines(result.type_description, 1)[0] ?? '';
  const analysisDate = new Date().toLocaleDateString('ko-KR');

  return (
    <div ref={resultRef} className='bg-white'>
      <div className='text-center mb-12 pt-8 print-header'>
        <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6 print-header-circle'>
          <span className='text-4xl'>{getTypeEmoji(result.body_type)}</span>
        </div>
        <h1 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent'>
          골격진단 결과
        </h1>
        <p className='text-xl text-gray-600'>당신의 골격 타입이 분석되었습니다</p>
        <div className='mt-4 text-sm text-gray-500'>Style Me - 개인 맞춤 스타일링 서비스</div>
      </div>

      <Card className='mb-8 border-0 shadow-xl bg-gradient-to-r from-rose-50 via-white to-indigo-50 mx-4 page-break-avoid'>
        <CardContent className='p-8'>
          <div className='grid gap-4 md:grid-cols-3'>
            <div className='rounded-xl bg-white border border-rose-100 p-4'>
              <p className='text-sm text-gray-500 mb-2'>진단 타입</p>
              <p className='text-xl font-semibold text-gray-800'>{formatBodyType(result.body_type)}</p>
              <p className='text-sm text-gray-600 mt-2'>{typeDescriptionTopLine}</p>
            </div>
            <div className='rounded-xl bg-white border border-emerald-100 p-4'>
              <p className='text-sm text-gray-500 mb-2'>핵심 매력 포인트</p>
              <p className='text-base font-medium text-gray-800'>{attractionTopLine}</p>
            </div>
            <div className='rounded-xl bg-white border border-indigo-100 p-4'>
              <p className='text-sm text-gray-500 mb-2'>입력 정보</p>
              <p className='text-base text-gray-800'>
                {formatGender(userProfile.gender)} / {userProfile.height}cm / {userProfile.weight}kg
              </p>
              <p className='text-xs text-gray-500 mt-2'>분석 기준 버전: {ANALYSIS_VERSION}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className='mb-8 border-0 shadow-xl bg-gradient-to-r from-white to-pink-50 mx-4 page-break-avoid'>
        <CardContent className='p-8'>
          <div className='text-center'>
            <h2 className='text-3xl font-bold text-gray-800 mb-6'>{formatBodyType(result.body_type)}</h2>
            <div className='text-left max-w-4xl mx-auto'>
              <div className='prose prose-lg text-gray-600 leading-relaxed'>
                {result.type_description.split('\n').map((paragraph, index) => (
                  <p key={index} className='mb-4'>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <SectionCard
        title='빠른 실행 가이드'
        icon={<BadgeCheck className='h-6 w-6 mr-2 text-indigo-500' />}
        className='page-break-avoid'
      >
        <div className='grid md:grid-cols-3 gap-4'>
          <div className='rounded-xl bg-emerald-50 border border-emerald-200 p-4'>
            <p className='font-semibold text-emerald-800 mb-3 flex items-center'>
              <CheckCircle2 className='h-4 w-4 mr-2' />
              추천 스타일
            </p>
            <ul className='space-y-2 text-sm text-gray-700'>
              {recommendedTopLines.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </div>
          <div className='rounded-xl bg-red-50 border border-red-200 p-4'>
            <p className='font-semibold text-red-700 mb-3 flex items-center'>
              <TriangleAlert className='h-4 w-4 mr-2' />
              피해야 할 스타일
            </p>
            <ul className='space-y-2 text-sm text-gray-700'>
              {avoidTopLines.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </div>
          <div className='rounded-xl bg-violet-50 border border-violet-200 p-4'>
            <p className='font-semibold text-violet-700 mb-3 flex items-center'>
              <Sparkles className='h-4 w-4 mr-2' />
              보완 포인트
            </p>
            <ul className='space-y-2 text-sm text-gray-700'>
              {fixTopLines.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title='상세 체형 특징'
        icon={<Sparkles className='h-6 w-6 mr-2 text-pink-500' />}
      >
        <TextParagraphs text={result.detailed_features} />
      </SectionCard>

      <SectionCard title='매력 포인트' icon={<Heart className='h-6 w-6 mr-2 text-rose-500' />}>
        <TextParagraphs text={result.attraction_points} />
      </SectionCard>

      <SectionCard
        title='추천 스타일 & 아이템'
        icon={<Shirt className='h-6 w-6 mr-2 text-green-500' />}
        className='page-break-before'
      >
        <TextParagraphs text={result.recommended_styles} />
      </SectionCard>

      <SectionCard title='피해야 할 스타일' icon={<X className='h-6 w-6 mr-2 text-red-500' />}>
        <TextParagraphs text={result.avoid_styles} />
      </SectionCard>

      <SectionCard title='보완 포인트' icon={<Sparkles className='h-6 w-6 mr-2 text-purple-500' />}>
        <TextParagraphs text={result.styling_fixes} />
      </SectionCard>

      <SectionCard title='스타일링 팁' icon={<Star className='h-6 w-6 mr-2 text-yellow-500' />}>
        <TextParagraphs text={result.styling_tips} />
      </SectionCard>

      <div className='text-center py-8 text-gray-500 text-sm'>
        <p>© 2024 Style Me - 개인 맞춤 스타일링 서비스</p>
        <p className='mt-2'>생성일: {analysisDate}</p>
        <p className='mt-1'>분석 버전: {ANALYSIS_VERSION}</p>
      </div>
    </div>
  );
}
