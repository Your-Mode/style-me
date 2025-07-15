"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Shirt, Star, Heart, X, Printer, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useBodyResultStore } from "@/hooks/useBodyResultStore";

export default function ResultPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const { bodyResult: result } = useBodyResultStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // 로딩 애니메이션
    const loadingTimer = setTimeout(() => {
      // 설문 답변 안전 파싱
      let answers: string[] = [];
      try {
        const raw = localStorage.getItem("surveyAnswers");
        answers = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(answers)) answers = [];
      } catch {
        answers = [];
      }
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loadingTimer);
  }, []);

  const generatePDF = async () => {
    if (!result) return;

    setIsGeneratingPDF(true);

    try {
      // 고급 인쇄 스타일 추가
      const printStyle = document.createElement("style");
      printStyle.textContent = `
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          @page {
            margin: 1cm;
            size: A4;
          }
          
          body {
            margin: 0;
            padding: 0;
            background: white !important;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          
          body * {
            visibility: hidden;
          }
          
          .print-content, .print-content * {
            visibility: visible;
          }
          
          .print-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
          }
          
          [data-hide-in-pdf] {
            display: none !important;
          }
          
          /* 그라데이션을 단색으로 변경 */
          .print-gradient-pink {
            background: #ec4899 !important;
            color: white !important;
          }
          
          .print-gradient-purple {
            background: #8b5cf6 !important;
            color: white !important;
          }
          
          .print-gradient-text {
            background: none !important;
            color: #ec4899 !important;
            -webkit-background-clip: unset !important;
            background-clip: unset !important;
          }
          
          /* 카드 스타일 최적화 */
          .print-card {
            border: 2px solid #e5e7eb !important;
            border-radius: 12px !important;
            margin-bottom: 20px !important;
            background: white !important;
            box-shadow: none !important;
            page-break-inside: avoid;
          }
          
          .print-card-header {
            background: #f9fafb !important;
            border-bottom: 1px solid #e5e7eb !important;
            padding: 16px !important;
            border-radius: 10px 10px 0 0 !important;
          }
          
          .print-card-content {
            padding: 20px !important;
          }
          
          /* 텍스트 최적화 */
          .print-title {
            color: #1f2937 !important;
            font-size: 24px !important;
            font-weight: bold !important;
            margin-bottom: 16px !important;
          }
          
          .print-subtitle {
            color: #374151 !important;
            font-size: 18px !important;
            font-weight: 600 !important;
            margin-bottom: 12px !important;
          }
          
          .print-text {
            color: #4b5563 !important;
            font-size: 14px !important;
            line-height: 1.6 !important;
            margin-bottom: 12px !important;
          }
          
          /* 아이콘 색상 */
          .print-icon-pink { color: #ec4899 !important; }
          .print-icon-purple { color: #8b5cf6 !important; }
          .print-icon-green { color: #10b981 !important; }
          .print-icon-red { color: #ef4444 !important; }
          .print-icon-yellow { color: #f59e0b !important; }
          .print-icon-rose { color: #f43f5e !important; }
          
          /* 헤더 최적화 */
          .print-header {
            text-align: center;
            margin-bottom: 30px !important;
            page-break-after: avoid;
          }
          
          .print-header-circle {
            width: 80px !important;
            height: 80px !important;
            background: #ec4899 !important;
            border-radius: 50% !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            margin-bottom: 20px !important;
            font-size: 32px !important;
          }
          
          /* 페이지 나누기 최적화 */
          .page-break-before {
            page-break-before: always;
          }
          
          .page-break-avoid {
            page-break-inside: avoid;
          }
        }
      `;
      document.head.appendChild(printStyle);

      // 인쇄용 클래스 추가
      if (resultRef.current) {
        resultRef.current.classList.add("print-content");

        // 모든 그라데이션 요소에 인쇄용 클래스 추가
        const gradientElements = resultRef.current.querySelectorAll(".bg-gradient-to-r, .bg-gradient-to-br");
        gradientElements.forEach((el) => {
          if (el.textContent?.includes("골격진단") || el.classList.contains("from-pink-500")) {
            el.classList.add("print-gradient-pink");
          } else {
            el.classList.add("print-gradient-purple");
          }
        });

        // 텍스트 그라데이션 처리
        const textGradients = resultRef.current.querySelectorAll(".bg-clip-text");
        textGradients.forEach((el) => {
          el.classList.add("print-gradient-text");
        });

        // 카드 요소들에 인쇄용 클래스 추가
        const cards = resultRef.current.querySelectorAll(".shadow-xl, .shadow-lg");
        cards.forEach((el) => {
          el.classList.add("print-card");
        });

        const cardHeaders = resultRef.current.querySelectorAll("h1, h2, .text-2xl");
        cardHeaders.forEach((el) => {
          if (el.classList.contains("text-4xl") || el.classList.contains("text-5xl")) {
            el.classList.add("print-title");
          } else {
            el.classList.add("print-subtitle");
          }
        });

        const cardContents = resultRef.current.querySelectorAll("p, .prose");
        cardContents.forEach((el) => {
          el.classList.add("print-text");
        });

        // 아이콘 색상 클래스 추가
        const icons = resultRef.current.querySelectorAll("svg");
        icons.forEach((icon) => {
          const parent = icon.closest(".flex");
          if (parent?.textContent?.includes("상세 체형") || parent?.textContent?.includes("골격진단")) {
            icon.classList.add("print-icon-pink");
          } else if (parent?.textContent?.includes("보완")) {
            icon.classList.add("print-icon-purple");
          } else if (parent?.textContent?.includes("추천")) {
            icon.classList.add("print-icon-green");
          } else if (parent?.textContent?.includes("피해")) {
            icon.classList.add("print-icon-red");
          } else if (parent?.textContent?.includes("스타일링")) {
            icon.classList.add("print-icon-yellow");
          } else if (parent?.textContent?.includes("매력")) {
            icon.classList.add("print-icon-rose");
          }
        });
      }

      // 사용자에게 안내 메시지 표시
      const userAgent = navigator.userAgent.toLowerCase();
      let message = "인쇄 대화상자에서 '대상'을 'PDF로 저장'으로 선택해주세요.";

      if (userAgent.includes("chrome")) {
        message = "인쇄 대화상자에서 '대상'을 'PDF로 저장'으로 선택해주세요.";
      } else if (userAgent.includes("safari")) {
        message = "인쇄 대화상자에서 'PDF' 버튼을 클릭해주세요.";
      } else if (userAgent.includes("firefox")) {
        message = "인쇄 대화상자에서 '대상'을 'PDF로 저장'으로 선택해주세요.";
      }

      alert(message);

      // 인쇄 대화상자 열기
      window.print();

      // 정리 (인쇄 후)
      setTimeout(() => {
        document.head.removeChild(printStyle);
        if (resultRef.current) {
          resultRef.current.classList.remove("print-content");

          // 추가된 클래스들 안전하게 제거
          const elementsToClean = resultRef.current.querySelectorAll("[class*='print-']");
          elementsToClean.forEach((el) => {
            try {
              // className이 문자열인지 확인하고 안전하게 처리
              if (el.className && typeof el.className === "string") {
                el.className = el.className.replace(/print-[a-z-]+/g, "").trim();
              } else if (el.classList) {
                // classList를 사용하여 print- 클래스들 제거
                const classesToRemove = Array.from(el.classList).filter((cls) => cls.startsWith("print-"));
                classesToRemove.forEach((cls) => el.classList.remove(cls));
              }
            } catch ( error ) {
              console.warn("클래스 정리 중 오류:", error);
            }
          });
        }
      }, 2000);
    } catch ( error ) {
      console.error("PDF 생성 중 오류:", error);
      alert("PDF 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div
              className="w-32 h-32 border-8 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-8"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-pink-500 animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">진단 결과를 분석하고 있어요</h2>
          <p className="text-gray-600 mb-8">당신만의 완벽한 스타일을 찾고 있습니다...</p>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">결과를 불러올 수 없습니다</h2>
            <p className="text-gray-600 mb-6">설문을 다시 진행해주세요.</p>
            <Link href="/survey">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600">설문 다시하기</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case "natural":
        return "🌿";
      case "wave":
        return "🌸";
      case "straight":
        return "⭐";
      default:
        return "✨";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
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
            <Link href="/survey" className="text-gray-600 hover:text-rose-500 transition-colors font-medium">
              다시 진단
            </Link>
            <Link href="/#service" className="text-gray-600 hover:text-rose-500 transition-colors font-medium">
              서비스
            </Link>
            <Link href="/#faq" className="text-gray-600 hover:text-rose-500 transition-colors font-medium">
              FAQ
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Action Buttons - PDF에서 제외 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8" data-hide-in-pdf>
            <Button
              onClick={generatePDF}
              disabled={isGeneratingPDF}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isGeneratingPDF ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  PDF 준비 중...
                </div>
              ) : (
                <>
                  <Printer className="h-5 w-5 mr-2" />
                  깔끔한 PDF 다운로드
                </>
              )}
            </Button>
          </div>

          {/* PDF로 추출될 영역 */}
          <div ref={resultRef} className="bg-white">
            {/* Header */}
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

            {/* Result Overview */}
            <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-white to-pink-50 mx-4 page-break-avoid">
              <CardContent className="p-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">{result.body_type}</h2>
                  <div className="text-left max-w-4xl mx-auto">
                    <div className="prose prose-lg text-gray-600 leading-relaxed">
                      {result.type_description.split("\n").map((paragraph, index) => (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Characteristics */}
            <Card className="mb-8 border-0 shadow-lg mx-4 page-break-avoid">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-gray-800">
                  <Sparkles className="h-6 w-6 mr-2 text-pink-500" />
                  상세 체형 특징
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg text-gray-700 leading-relaxed">
                  {result.detailed_features.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 매력 포인트 */}
            <Card className="mb-8 border-0 shadow-lg mx-4 page-break-avoid">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-gray-800">
                  <Heart className="h-6 w-6 mr-2 text-rose-500" />
                  매력 포인트
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg text-gray-700 leading-relaxed">
                  {result.attraction_points.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 추천 스타일 */}
            <Card className="mb-8 border-0 shadow-lg mx-4 page-break-before page-break-avoid">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-gray-800">
                  <Shirt className="h-6 w-6 mr-2 text-green-500" />
                  추천 스타일 & 아이템
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg text-gray-700 leading-relaxed">
                  {result.recommended_styles.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 피해야 할 스타일 */}
            <Card className="mb-8 border-0 shadow-lg mx-4 page-break-avoid">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-gray-800">
                  <X className="h-6 w-6 mr-2 text-red-500" />
                  피해야 할 스타일
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg text-gray-700 leading-relaxed">
                  {result.avoid_styles.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 보완 포인트 */}
            <Card className="mb-8 border-0 shadow-lg mx-4 page-break-avoid">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-gray-800">
                  <Sparkles className="h-6 w-6 mr-2 text-purple-500" />
                  보완 포인트
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg text-gray-700 leading-relaxed">
                  {result.styling_fixes.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 스타일링 팁 */}
            <Card className="mb-8 border-0 shadow-lg mx-4 page-break-avoid">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-gray-800">
                  <Star className="h-6 w-6 mr-2 text-yellow-500" />
                  스타일링 팁
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg text-gray-700 leading-relaxed">
                  {result.styling_tips.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-center py-8 text-gray-500 text-sm">
              <p>© 2024 Style Me - 개인 맞춤 스타일링 서비스</p>
              <p className="mt-2">생성일: {new Date().toLocaleDateString("ko-KR")}</p>
            </div>
          </div>

          {/* Additional Actions - PDF에서 제외 */}
          <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-gray-50 to-gray-100" data-hide-in-pdf>
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">💡 PDF 다운로드 안내</h3>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
                <div className="text-left space-y-3 text-gray-700">
                  <p className="font-semibold text-blue-800">📱 브라우저별 PDF 저장 방법:</p>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white p-4 rounded-lg border">
                      <p className="font-bold text-blue-600 mb-2">Chrome</p>
                      <p>대상 → PDF로 저장 선택</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <p className="font-bold text-orange-600 mb-2">Safari</p>
                      <p>하단 PDF 버튼 클릭</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <p className="font-bold text-purple-600 mb-2">Firefox</p>
                      <p>대상 → PDF로 저장 선택</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={generatePDF}
                  disabled={isGeneratingPDF}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {isGeneratingPDF ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      준비 중...
                    </div>
                  ) : (
                    <>
                      <Printer className="h-4 w-4 mr-2" />
                      PDF 다운로드
                    </>
                  )}
                </Button>
                <Link href="/survey">
                  <Button
                    variant="outline"
                    className="border-2 border-gray-400 text-gray-600 hover:bg-gray-50 px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-transparent"
                  >
                    다시 진단하기
                  </Button>
                </Link>
                <div className="flex items-center cursor-pointer">
                  <Button
                    variant="outline"
                    onClick={() => window.open("https://pf.kakao.com/_ZXxedn", "_blank")}
                    className="border-2 border-yellow-400 text-gray-600 hover:bg-gray-50 px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-transparent cursor-pointer"
                  >
                    <MessageCircle className="h-5 w-5 mr-2 " />
                    카카오톡 채널로 가기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
