"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Bot,
  Send,
  CheckCircle,
  Loader2,
  Heart,
  Wifi,
  WifiOff,
  XCircle,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { surveyQuestions } from "@/lib/survey-data";
import Link from "next/link";
import AuthGuard from "@/components/auth-guard";
import { saveSurveyAnswers } from "@/firebase";
import { useChat } from "@/hooks/useChat";
import { BodyResultRequest, ChatResponse } from "@/apis/chat";
import { usePostResult } from "@/hooks/usePostResult";
import { useApplyUserInfoStore } from "@/hooks/useApplyUserInfoStore";

export default function SurveyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { gender, height, weight } = useApplyUserInfoStore();
  const [answers, setAnswers] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"online" | "offline">("online");
  const [lastResponseStatus, setLastResponseStatus] = useState<"success" | "failed" | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: postResult } = usePostResult();

  // useChat 훅 사용
  const initialMessage = `안녕하세요! 당신만의 완벽한 스타일을 찾아드릴게요 ✨

총 17개의 질문을 통해 당신의 골격 타입을 정확히 분석해드릴게요.

옵션을 선택하거나 자유롭게 대화하듯 답변해주세요.

첫 번째 질문입니다:
${surveyQuestions[0].question}
- ${surveyQuestions[0].options[0].label}
- ${surveyQuestions[0].options[1].label}
- ${surveyQuestions[0].options[2].label}
`;

  const { messages, send, addBotMessage, isLoading, lastResponse, error, isError } = useChat(initialMessage);

  /* ---------------- effects ---------------- */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 네트워크 상태 모니터링
  useEffect(() => {
    const handleOnline = () => setConnectionStatus("online");
    const handleOffline = () => setConnectionStatus("offline");

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // 채팅 응답 처리
  useEffect(() => {
    if (lastResponse && !isLoading) {
      handleChatResponse(lastResponse);
    }
  }, [lastResponse, isLoading]);

  // 에러 처리
  useEffect(() => {
    if (isError && error) {
      console.error("Chat error:", error);
      setConnectionStatus("offline");
    } else if (!isError) {
      setConnectionStatus("online");
    }
  }, [isError, error]);

  /* ---------------- handlers ---------------- */
  const handleChatResponse = async (response: ChatResponse) => {
    setIsProcessing(true);

    // isSuccess 체크
    if (!response.isSuccess) {
      // 실패한 경우: 현재 질문에 머물고 다시 답변 요청
      setLastResponseStatus("failed");

      setTimeout(() => {
        setIsProcessing(false);
      }, 1000);

      return;
    }

    // 성공한 경우: 답변 저장하고 다음 질문으로
    setLastResponseStatus("success");
    const newAnswers = [...answers, response.selected];
    setAnswers(newAnswers);

    // 다음 질문 또는 완료 처리
    if (currentQuestion < surveyQuestions.length - 1) {
      const nextIndex = currentQuestion + 1;

      setTimeout(() => {
        setCurrentQuestion(nextIndex);

        // API에서 제공한 nextQuestion이 있으면 사용, 없으면 기본 질문 사용
        const questionText = response.nextQuestion || surveyQuestions[nextIndex].question;

        addBotMessage(`${nextIndex + 1}번째 질문이에요 💕

${questionText}

옵션을 선택하거나 자유롭게 답변해주세요!`);
        setIsProcessing(false);
      }, 1500);
    } else {
      // 설문 완료
      try {
        const authToken = localStorage.getItem("aFfuthToken");
        if (authToken) {
          const token = JSON.parse(authToken);
          await saveSurveyAnswers(token.userId, token.phone, newAnswers);
        }
      } catch ( error ) {
        console.error("설문 답변 저장 오류:", error);
      }

      localStorage.setItem("surveyAnswers", JSON.stringify(newAnswers));

      addBotMessage(
        "모든 질문이 완료되었어요! 🎉\n\n지금 당신만의 완벽한 스타일을 분석하고 있어요. 조금만 기다려주세요... ✨\n\n📊 답변이 안전하게 저장되었습니다!",
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
    console.log(question);
    send(question.question, inputMessage.trim());
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const progress = ((currentQuestion + 1) / surveyQuestions.length) * 100;

  return (
    <AuthGuard requiredPage="survey">
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        {/* ------- Global Header ------- */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-rose-200/50 shadow-sm">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div
                className="w-10 h-10 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <span
                  className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                  Style Me
                </span>
                <p className="text-xs text-gray-500 font-medium">Personal Styling</p>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-rose-500 transition-colors font-medium">
                홈
              </Link>
              <Link href="/#service" className="text-gray-600 hover:text-rose-500 transition-colors font-medium">
                서비스
              </Link>
              <Link href="/#reviews" className="text-gray-600 hover:text-rose-500 transition-colors font-medium">
                후기
              </Link>
              <Link href="/#faq" className="text-gray-600 hover:text-rose-500 transition-colors font-medium">
                FAQ
              </Link>
            </nav>
          </div>
        </header>
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl md:text-3xl font-bold text-gray-800 flex items-center space-x-2">
                <Heart className="h-6 w-6 text-rose-500" />
                <span>스타일 진단</span>
              </h1>
              <span className="text-lg font-bold text-rose-500">
                {currentQuestion + 1}/{surveyQuestions.length}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          {/* 안내 메시지 */}
          <div className="mb-4 p-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg border border-rose-200">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-lg">⚠️</span>
              <p className="text-rose-600 text-sm font-medium">
                답변 후에는 이전 질문으로 돌아갈 수 없습니다. 신중하게 선택해주세요!
              </p>
            </div>
          </div>
          <div className="">
            {/* 채팅 영역 */}
            <div className="bg-white/90 backdrop-blur-sm shadow-xl flex flex-col h-[70vh]">
              <CardHeader className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-4 rounded-t-lg">
                <CardTitle className="flex items-center text-lg font-bold">
                  <Bot className="h-5 w-5 mr-2" />
                  스타일 AI
                  <div className="ml-auto flex items-center space-x-2">
                    {lastResponseStatus === "success" && <CheckCircle className="h-4 w-4 text-green-200" />}
                    {lastResponseStatus === "failed" && <XCircle className="h-4 w-4 text-red-200" />}
                    {connectionStatus === "offline" ? (
                      <WifiOff className="h-4 w-4 text-red-200" />
                    ) : (
                      <Wifi className="h-4 w-4 text-green-200" />
                    )}
                    {(isLoading || isProcessing) && <Loader2 className="h-4 w-4 animate-spin" />}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
                {/* 메시지 리스트 */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`rounded-xl p-3 text-sm md:text-base max-w-[80%] ${
                          m.type === "bot"
                            ? "bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200"
                            : m.type === "system"
                              ? "bg-blue-50 border border-blue-200 text-blue-600"
                              : "bg-rose-100 border border-rose-200"
                        }`}
                      >
                        <pre className="whitespace-pre-line font-sans">{m.content}</pre>
                        <span className="block text-xs text-right mt-1 text-gray-500">
                          {m.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* 입력 */}
                <div className="mt-3 flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={
                      lastResponseStatus === "failed"
                        ? "더 구체적으로 답변해주세요..."
                        : connectionStatus === "offline"
                          ? "오프라인 모드 (기본 분석)"
                          : "대화로 답변해보세요..."
                    }
                    disabled={isLoading || isProcessing}
                    className="flex-1"
                  />
                  <Button onClick={handleSend} disabled={isLoading || isProcessing || !inputMessage.trim()}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs mt-1 text-gray-500">
                  Enter 로 전송 •{" "}
                  {lastResponseStatus === "failed"
                    ? "답변을 다시 해주세요"
                    : connectionStatus === "offline"
                      ? "오프라인 모드 (기본 분석 사용)"
                      : isLoading || isProcessing
                        ? "처리 중..."
                        : "AI가 답변을 분석해드려요"}
                </p>
              </CardContent>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
