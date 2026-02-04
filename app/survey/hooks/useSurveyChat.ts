import { useEffect, useRef, useState } from 'react';
import { surveyQuestions } from '@/lib/survey-data';
import { saveSurveyAnswers } from '@/firebase';
import { useChat } from '@/hooks/useChat';
import type { BodyResultRequest, ChatResponse } from '@/apis/chat';
import { usePostResult } from '@/hooks/usePostResult';
import { useApplyUserInfoStore } from '@/hooks/useApplyUserInfoStore';

export function useSurveyChat() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { gender, height, weight } = useApplyUserInfoStore();
  const [answers, setAnswers] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline'>('online');
  const [lastResponseStatus, setLastResponseStatus] = useState<'success' | 'failed' | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: postResult } = usePostResult();

  const initialMessage = `안녕하세요! 당신만의 완벽한 스타일을 찾아드릴게요 ✨\n\n총 17개의 질문을 통해 당신의 골격 타입을 정확히 분석해드릴게요.\n\n옵션을 선택하거나 자유롭게 대화하듯 답변해주세요.\n\n첫 번째 질문입니다:\n${surveyQuestions[0].question}\n- ${surveyQuestions[0].options[0].label}\n- ${surveyQuestions[0].options[1].label}\n- ${surveyQuestions[0].options[2].label}\n`;

  const { messages, send, addBotMessage, isLoading, lastResponse, error, isError } = useChat(initialMessage);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleOnline = () => setConnectionStatus('online');
    const handleOffline = () => setConnectionStatus('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (lastResponse && !isLoading) {
      handleChatResponse(lastResponse);
    }
  }, [lastResponse, isLoading]);

  useEffect(() => {
    if (isError && error) {
      console.error('Chat error:', error);
      setConnectionStatus('offline');
    } else if (!isError) {
      setConnectionStatus('online');
    }
  }, [isError, error]);

  const handleChatResponse = async (response: ChatResponse) => {
    setIsProcessing(true);

    if (!response.isSuccess) {
      setLastResponseStatus('failed');

      setTimeout(() => {
        setIsProcessing(false);
      }, 1000);

      return;
    }

    setLastResponseStatus('success');
    const newAnswers = [...answers, response.selected];
    setAnswers(newAnswers);

    if (currentQuestion < surveyQuestions.length - 1) {
      const nextIndex = currentQuestion + 1;

      setTimeout(() => {
        setCurrentQuestion(nextIndex);

        const questionText = response.nextQuestion || surveyQuestions[nextIndex].question;

        addBotMessage(`${nextIndex + 1}번째 질문이에요 💕\n\n${questionText}\n\n옵션을 선택하거나 자유롭게 답변해주세요!`);
        setIsProcessing(false);
      }, 1500);
    } else {
      try {
        const authToken = localStorage.getItem('aFfuthToken');
        if (authToken) {
          const token = JSON.parse(authToken);
          await saveSurveyAnswers(token.phone, newAnswers);
        }
      } catch (error) {
        console.error('설문 답변 저장 오류:', error);
      }

      localStorage.setItem('surveyAnswers', JSON.stringify(newAnswers));

      addBotMessage(
        '모든 질문이 완료되었어요! 🎉\n\n지금 당신만의 완벽한 스타일을 분석하고 있어요. 조금만 기다려주세요... ✨\n\n📊 답변이 안전하게 저장되었습니다!',
      );

      const requestData: BodyResultRequest = {
        answers: newAnswers,
        gender: gender,
        height: height,
        weight: weight,
      };

      postResult(requestData);
    }
  };

  const handleSend = () => {
    if (!inputMessage.trim() || isProcessing || isLoading) return;

    const question = surveyQuestions[currentQuestion];
    send(question.question, inputMessage.trim());
    setInputMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return {
    currentQuestion,
    totalQuestions: surveyQuestions.length,
    messages,
    lastResponseStatus,
    connectionStatus,
    isLoading,
    isProcessing,
    inputMessage,
    setInputMessage,
    handleSend,
    handleKeyDown,
    chatEndRef,
    inputRef,
  };
}
