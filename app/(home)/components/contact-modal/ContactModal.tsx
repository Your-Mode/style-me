import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Send, CircleCheck } from 'lucide-react';
import { submitContactInquiry } from '@/firebase';
import { captureAppError } from '@/lib/error-policy';

const CONTACT_TOPICS = [
  { value: 'service', label: '서비스 문의' },
  { value: 'payment', label: '결제/환불 문의' },
  { value: 'result', label: '진단 결과 문의' },
  { value: 'etc', label: '기타 문의' },
] as const;

type ContactModalProps = {
  isOpen?: boolean;
  setShowContact: () => void;
};

export default function ContactModal({ isOpen, setShowContact }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<(typeof CONTACT_TOPICS)[number]['value']>('service');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFormValid = useMemo(() => {
    return (
      name.trim().length >= 2 &&
      /\S+@\S+\.\S+/.test(email) &&
      message.trim().length >= 10 &&
      message.trim().length <= 1000
    );
  }, [name, email, message]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (honeypot.trim().length > 0) {
      setShowContact();
      return;
    }

    if (!isFormValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactInquiry({
        name: name.trim(),
        email: email.trim(),
        topic,
        message: message.trim(),
        source: 'floating-button',
        userAgent: typeof window === 'undefined' ? '' : window.navigator.userAgent,
      });
      setIsSubmitted(true);
    } catch (error) {
      captureAppError(error, {
        layer: 'ui',
        feature: 'contact',
        action: 'submit-contact-inquiry',
      });
      alert('문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <Card className='w-full max-w-md bg-white border-2 border-rose-200'>
        <CardContent className='p-8'>
          <div className='flex justify-between items-center mb-6'>
            <h3 className='text-xl font-bold text-gray-800'>문의하기</h3>
            <Button variant='ghost' size='sm' onClick={setShowContact} className='text-gray-600'>
              ✕
            </Button>
          </div>

          {isSubmitted ? (
            <div className='rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center'>
              <CircleCheck className='mx-auto h-10 w-10 text-emerald-600' />
              <p className='mt-3 text-lg font-semibold text-emerald-800'>문의가 접수되었습니다</p>
              <p className='mt-2 text-sm text-emerald-700'>
                확인 후 등록하신 이메일로 답변드릴게요.
              </p>
              <Button onClick={setShowContact} className='mt-5 w-full'>
                닫기
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='hidden'>
                <label htmlFor='website'>website</label>
                <input
                  id='website'
                  name='website'
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                  tabIndex={-1}
                  autoComplete='off'
                />
              </div>

              <div>
                <label htmlFor='contact-name' className='mb-1 block text-sm font-medium text-gray-700'>
                  이름
                </label>
                <input
                  id='contact-name'
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder='홍길동'
                  maxLength={40}
                  className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-400 focus:outline-none'
                  required
                />
              </div>

              <div>
                <label htmlFor='contact-email' className='mb-1 block text-sm font-medium text-gray-700'>
                  이메일
                </label>
                <input
                  id='contact-email'
                  type='email'
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder='name@example.com'
                  maxLength={100}
                  className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-400 focus:outline-none'
                  required
                />
              </div>

              <div>
                <label htmlFor='contact-topic' className='mb-1 block text-sm font-medium text-gray-700'>
                  문의 유형
                </label>
                <select
                  id='contact-topic'
                  value={topic}
                  onChange={(event) =>
                    setTopic(event.target.value as (typeof CONTACT_TOPICS)[number]['value'])
                  }
                  className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-400 focus:outline-none'
                >
                  {CONTACT_TOPICS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor='contact-message' className='mb-1 block text-sm font-medium text-gray-700'>
                  문의 내용
                </label>
                <textarea
                  id='contact-message'
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder='문의 내용을 10자 이상 입력해주세요.'
                  minLength={10}
                  maxLength={1000}
                  rows={5}
                  className='w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-400 focus:outline-none'
                  required
                />
                <p className='mt-1 text-right text-xs text-gray-500'>{message.length}/1000</p>
              </div>

              <p className='text-xs leading-relaxed text-gray-500'>
                문의 응대를 위해 입력하신 정보가 저장됩니다. 민감한 개인정보는 입력하지 마세요.
              </p>

              <Button
                type='submit'
                disabled={!isFormValid || isSubmitting}
                className='w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600'
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    전송 중...
                  </>
                ) : (
                  <>
                    <Send className='mr-2 h-4 w-4' />
                    문의 보내기
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
