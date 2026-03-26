'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Star } from 'lucide-react';
import { submitReview } from '@/firebase';
import { captureAppError } from '@/lib/error-policy';

interface ReviewModalProps {
  isOpen?: boolean;
  onClose: () => void;
  bodyType?: string;
}

export default function ReviewModal({ isOpen, onClose, bodyType }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const canSubmit = useMemo(() => rating >= 1 && !isSubmitting, [rating, isSubmitting]);

  const handleSubmit = async () => {
    if (!canSubmit) {
      return;
    }

    setIsSubmitting(true);
    try {
      await submitReview({
        rating,
        comment: comment.trim(),
        source: 'pdf-download',
        bodyType,
      });
      setIsSubmitted(true);
    } catch (error) {
      captureAppError(error, {
        layer: 'ui',
        feature: 'review',
        action: 'submit-review',
      });
      alert('리뷰 저장에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <Card className='w-full max-w-md border border-slate-200 bg-white'>
        <CardContent className='p-6'>
          {isSubmitted ? (
            <div className='space-y-4 text-center'>
              <h3 className='text-xl font-bold text-slate-900'>리뷰 감사합니다</h3>
              <p className='text-sm text-slate-600'>
                남겨주신 의견은 더 나은 결과 리포트를 만드는 데 활용됩니다.
              </p>
              <Button onClick={onClose} className='w-full'>
                닫기
              </Button>
            </div>
          ) : (
            <>
              <div className='mb-4 flex items-start justify-between gap-4'>
                <div>
                  <h3 className='text-xl font-bold text-slate-900'>결과가 도움이 되었나요?</h3>
                  <p className='mt-1 text-sm text-slate-600'>
                    별점과 한 줄 리뷰를 남겨주시면 품질 개선에 큰 도움이 됩니다.
                  </p>
                </div>
                <button
                  type='button'
                  onClick={onClose}
                  className='rounded-md px-2 py-1 text-sm text-slate-500 hover:bg-slate-100'
                >
                  닫기
                </button>
              </div>

              <div className='mb-4'>
                <p className='mb-2 text-sm font-medium text-slate-700'>별점</p>
                <div className='flex items-center gap-1'>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type='button'
                      onClick={() => setRating(value)}
                      className='rounded-md p-1 transition-colors hover:bg-amber-50'
                      aria-label={`${value}점`}
                    >
                      <Star
                        className={`h-7 w-7 ${
                          value <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className='mb-5'>
                <label htmlFor='review-comment' className='mb-2 block text-sm font-medium text-slate-700'>
                  한 줄 리뷰 (선택)
                </label>
                <textarea
                  id='review-comment'
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  maxLength={300}
                  rows={4}
                  placeholder='예: 추천 스타일이 구체적이라 바로 옷 고르기 쉬웠어요.'
                  className='w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-rose-400 focus:outline-none'
                />
                <p className='mt-1 text-right text-xs text-slate-500'>{comment.length}/300</p>
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={onClose}
                  className='border-slate-300 text-slate-700'
                >
                  건너뛰기
                </Button>
                <Button
                  type='button'
                  onClick={() => void handleSubmit()}
                  disabled={!canSubmit}
                  className='bg-slate-900 text-white hover:bg-slate-800'
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      저장 중
                    </>
                  ) : (
                    '리뷰 남기기'
                  )}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
