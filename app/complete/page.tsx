"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Mail, Phone, ArrowRight, Gift, Star, MessageCircle, Heart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BodyDiagnosisFormData } from "@/types/body";

export default function CompletePage() {
  const [userInfo, setUserInfo] = useState<BodyDiagnosisFormData>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const info = localStorage.getItem("userInfo");
    if (info) {
      setUserInfo(JSON.parse(info));
    }
  }, []);


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

      {/* Main Content */}
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">무료 신청이 완료되었습니다! 🎉</h1>
            <p className="text-xl text-gray-600">런칭 기념 무료 골격진단 신청이 성공적으로 접수되었어요</p>
          </div>

          {/* Order Summary */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-xl">주문 정보</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">신청자 정보</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">이름:</span>
                      <span className="font-medium">{userInfo?.name || "홍길동"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">연락처:</span>
                      <span className="font-medium">{userInfo?.phone || "010-1234-5678"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">이메일:</span>
                      <span className="font-medium">{userInfo?.email || "example@email.com"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">성별:</span>
                      <span className="font-medium">{userInfo?.gender === "female" ? "여성" : "남성"}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">결제 정보</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">서비스:</span>
                      <span className="font-medium">골격진단 AI (무료 이벤트)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">원래 가격:</span>
                      <span className="font-medium line-through text-gray-400">30,000원</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">이벤트 할인:</span>
                      <span className="font-medium text-rose-600">-30,000원</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-600 font-bold">최종 금액:</span>
                      <span className="font-bold text-2xl text-rose-600">0원 🎉</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">결제 방법:</span>
                      <span className="font-medium">
                          {userInfo?.paymentMethod === "card" && "신용카드"}
                        {userInfo?.paymentMethod === "mobile" && "휴대폰 결제"}
                        {userInfo?.paymentMethod === "kakao" && "카카오페이"}
                        </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">결제 일시:</span>
                      <span className="font-medium">{new Date().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-800">
                <Clock className="h-6 w-6 mr-2 text-pink-500" />
                다음 단계
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div
                    className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">골격진단 설문 진행</h4>
                    <p className="text-gray-600 mb-3">
                      17개의 질문에 답변하여 정확한 골격 타입을 분석받으세요. 약 10-15분 소요됩니다.
                    </p>
                    <Link href="/survey">
                      <Button
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
                        설문 시작하기
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div
                    className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">진단 결과 확인</h4>
                    <p className="text-gray-600">
                      설문 완료 즉시 당신의 골격 타입과 맞춤형 스타일링 가이드를 확인할 수 있습니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div
                    className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">스타일링 적용</h4>
                    <p className="text-gray-600">
                      제공받은 가이드를 바탕으로 새로운 스타일을 시도해보세요. 평생 활용 가능합니다!
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div
                    className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">카카오톡 상담 (선택)</h4>
                    <p className="text-gray-600 mb-3">
                      추가 궁금한 점이나 개인 맞춤 조언이 필요하시면 카카오톡으로 편하게 상담받으세요. 런칭 기념으로
                      3개월간 무료 상담을 제공해드립니다!
                    </p>
                    <Button
                      onClick={() => window.open("https://pf.kakao.com/_your_channel_id", "_blank")}
                      variant="outline"
                      className="border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                    >
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-yellow-400 rounded mr-2"></div>
                        카카오톡 상담
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-gray-800">
                  <Gift className="h-5 w-5 mr-2 text-pink-500" />
                  제공 서비스
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>개인 맞춤 골격 타입 분석</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>의상 스타일링 가이드</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>개인 맞춤 패션 제품 추천</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>액세서리 스타일링 팁</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>체형별 코디 가이드</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-gray-800">
                  <Star className="h-5 w-5 mr-2 text-yellow-500" />
                  고객 혜택
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-2" />
                    <span>평생 이용 가능한 스타일 가이드</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-2" />
                    <span>추후 업데이트 서비스 할인</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-2" />
                    <span>1:1 문의 지원</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-2" />
                    <span>친구 추천 시 할인 혜택</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-2" />
                    <span>3개월 무료 카카오톡 상담</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Kakao Channel Section */}
          <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardContent className="p-8">
              <div className="text-center">
                <div
                  className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">카카오톡으로 더 편리하게! 💬</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  스타일링 관련 궁금한 점이나 추가 상담이 필요하시면
                  <br />
                  카카오톡 채널로 언제든 편하게 문의해주세요!
                  <br />
                  <span className="text-yellow-600 font-bold text-lg">🎁 런칭 기념 3개월 무료 상담 제공!</span>
                </p>

                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
                  <div className="p-6 bg-white rounded-2xl border-2 border-yellow-200 shadow-lg">
                    <div
                      className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">💬</span>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">실시간 상담</h4>
                    <p className="text-sm text-gray-600">스타일링 관련 궁금한 점을 실시간으로 문의하세요</p>
                  </div>
                  <div className="p-6 bg-white rounded-2xl border-2 border-yellow-200 shadow-lg">
                    <div
                      className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🎁</span>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">3개월 무료 상담</h4>
                    <p className="text-sm text-gray-600">
                      런칭 기념으로 3개월간 무제한 스타일링 상담을 무료로 제공해드려요
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    onClick={() => window.open("https://pf.kakao.com/_your_channel_id", "_blank")}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-8 py-4 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-yellow-500 rounded mr-3"></div>
                      카카오톡 채널 추가
                    </div>
                  </Button>
                  <Button
                    onClick={() => window.open("https://open.kakao.com/o/your_openchat_id", "_blank")}
                    variant="outline"
                    className="border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50 px-8 py-4 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    오픈채팅 참여
                  </Button>
                </div>

                <div
                  className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border border-yellow-200">
                  <p className="text-yellow-700 text-sm font-medium">
                    <strong>💡 TIP:</strong> 카카오톡 채널에서는 3개월간 무료로 개인별 맞춤 스타일링 조언과 시즌별
                    트렌드 정보를 제공해드려요!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-50 to-gray-100">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-800 mb-4 text-center">문의사항이 있으시면 언제든 연락주세요</h3>
              <div
                className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>contact@bodytype.co.kr</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>1588-0000</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 text-center mt-2">평일 09:00 - 18:00 (주말, 공휴일 휴무)</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
