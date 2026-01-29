import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Shirt, Star, Heart, X } from 'lucide-react';
import type { BodyResultResponse } from '@/apis/chat';
import type { RefObject } from 'react';

interface ResultContentProps {
  result: BodyResultResponse;
  resultRef: RefObject<HTMLDivElement | null>;
}

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

export default function ResultContent({ result, resultRef }: ResultContentProps) {
  return (
    <div ref={resultRef} className="bg-white">
      <div className="text-center mb-12 pt-8 print-header">
        <div
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6 print-header-circle">
          <span className="text-4xl">{getTypeEmoji(result.body_type)}</span>
        </div>
        <h1
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          골격진단 결과
        </h1>
        <p className="text-xl text-gray-600">당신의 골격 타입이 분석되었습니다</p>
        <div className="mt-4 text-sm text-gray-500">Style Me - 개인 맞춤 스타일링 서비스</div>
      </div>

      <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-white to-pink-50 mx-4 page-break-avoid">
        <CardContent className="p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{result.body_type}</h2>
            <div className="text-left max-w-4xl mx-auto">
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                {result.type_description.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border-0 shadow-lg mx-4 page-break-avoid">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-gray-800">
            <Sparkles className="h-6 w-6 mr-2 text-pink-500" />
            상세 체형 특징
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg text-gray-700 leading-relaxed">
            {result.detailed_features.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border-0 shadow-lg mx-4 page-break-avoid">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-gray-800">
            <Heart className="h-6 w-6 mr-2 text-rose-500" />
            매력 포인트
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg text-gray-700 leading-relaxed">
            {result.attraction_points.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border-0 shadow-lg mx-4 page-break-before page-break-avoid">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-gray-800">
            <Shirt className="h-6 w-6 mr-2 text-green-500" />
            추천 스타일 & 아이템
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg text-gray-700 leading-relaxed">
            {result.recommended_styles.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border-0 shadow-lg mx-4 page-break-avoid">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-gray-800">
            <X className="h-6 w-6 mr-2 text-red-500" />
            피해야 할 스타일
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg text-gray-700 leading-relaxed">
            {result.avoid_styles.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border-0 shadow-lg mx-4 page-break-avoid">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-gray-800">
            <Sparkles className="h-6 w-6 mr-2 text-purple-500" />
            보완 포인트
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg text-gray-700 leading-relaxed">
            {result.styling_fixes.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border-0 shadow-lg mx-4 page-break-avoid">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-gray-800">
            <Star className="h-6 w-6 mr-2 text-yellow-500" />
            스타일링 팁
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg text-gray-700 leading-relaxed">
            {result.styling_tips.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center py-8 text-gray-500 text-sm">
        <p>© 2024 Style Me - 개인 맞춤 스타일링 서비스</p>
        <p className="mt-2">생성일: {new Date().toLocaleDateString('ko-KR')}</p>
      </div>
    </div>
  );
}
