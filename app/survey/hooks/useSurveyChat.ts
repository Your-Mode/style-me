import { useCallback, useEffect, useRef, useState } from 'react';
import { surveyQuestions } from '@/lib/survey-data';
import { useChat } from '@/hooks/useChat';
import type { ChatResponse } from '@/apis/chat';
import { useConnectionStatus } from './useConnectionStatus';
import { useSurveyCompletion } from './useSurveyCompletion';

const QUESTION_TRANSITION_DELAY_MS = 1500;
const RESPONSE_FAILURE_DELAY_MS = 1000;

export function useSurveyChat() {
  const totalQuestions = surveyQuestions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResponseStatus, setLastResponseStatus] = useState<'success' | 'failed' | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastHandledResponseRef = useRef<ChatResponse | null>(null);
  const { completeSurvey } = useSurveyCompletion();

  const initialMessage = `안녕하세요! 당신만의 완벽한 스타일을 찾아드릴게요 ✨\n\n총 ${totalQuestions}개의 질문을 통해 당신의 골격 타입을 정확히 분석해드릴게요.\n\n옵션을 선택하거나 자유롭게 대화하듯 답변해주세요.\n\n첫 번째 질문입니다:\n${surveyQuestions[0].question}\n- ${surveyQuestions[0].options[0].label}\n- ${surveyQuestions[0].options[1].label}\n- ${surveyQuestions[0].options[2].label}\n`;

  const { messages, send, addBotMessage, isLoading, lastResponse, error, isError } =
    useChat(initialMessage);
  const connectionStatus = useConnectionStatus(isError, error);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleChatResponse = useCallback(
    async (response: ChatResponse) => {
      setIsProcessing(true);

      if (!response.isSuccess) {
        setLastResponseStatus('failed');
        window.setTimeout(() => {
          setIsProcessing(false);
        }, RESPONSE_FAILURE_DELAY_MS);
        return;
      }

      setLastResponseStatus('success');
      const newAnswers = [...answers, response.selected];
      setAnswers(newAnswers);

      if (currentQuestion < totalQuestions - 1) {
        const nextIndex = currentQuestion + 1;

        window.setTimeout(() => {
          setCurrentQuestion(nextIndex);

          const questionText = response.nextQuestion || surveyQuestions[nextIndex].question;

          addBotMessage(
            `${nextIndex + 1}번째 질문이에요 💕\n\n${questionText}\n\n옵션을 선택하거나 자유롭게 답변해주세요!`,
          );
          setIsProcessing(false);
        }, QUESTION_TRANSITION_DELAY_MS);
        return;
      }

      try {
        await completeSurvey({ answers: newAnswers });
      } finally {
        setIsProcessing(false);
      }
    },
    [addBotMessage, answers, completeSurvey, currentQuestion, totalQuestions],
  );

  useEffect(() => {
    if (!lastResponse || isLoading) return;
    if (lastHandledResponseRef.current === lastResponse) return;

    lastHandledResponseRef.current = lastResponse;
    void handleChatResponse(lastResponse);
  }, [handleChatResponse, isLoading, lastResponse]);

  const handleSend = useCallback(() => {
    if (!inputMessage.trim() || isProcessing || isLoading) return;

    const question = surveyQuestions[currentQuestion];
    send(question.question, inputMessage.trim());
    setInputMessage('');
  }, [currentQuestion, inputMessage, isLoading, isProcessing, send]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  return {
    currentQuestion,
    totalQuestions,
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
