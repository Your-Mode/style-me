"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ArrowRight,
  Star,
  Users,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Shield,
  Check,
  Heart,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [showContact, setShowContact] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-rose-200/50 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                Style Me
              </span>
              <p className="text-xs text-gray-500 font-medium">Personal Styling</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#service" className="text-gray-600 hover:text-rose-500 transition-colors font-medium">
              서비스
            </a>
            <a href="#reviews" className="text-gray-600 hover:text-rose-500 transition-colors font-medium">
              후기
            </a>
            <a href="#faq" className="text-gray-600 hover:text-rose-500 transition-colors font-medium">
              FAQ
            </a>
            <a href="#contact" className="text-gray-600 hover:text-rose-500 transition-colors font-medium">
              문의
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-rose-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-purple-200/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full mb-8 shadow-lg border border-rose-200">
              <Sparkles className="h-4 w-4 text-rose-500 mr-2" />
              <span className="text-sm font-medium text-rose-700">AI 기반 개인 맞춤 스타일링</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-gray-800">나만의</span>
              <br />
              <span className="bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                완벽한 스타일
              </span>
              <br />
              <span className="text-gray-800">을 찾아보세요</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
              17가지 정밀한 골격 분석으로 당신에게 가장 잘 어울리는 스타일을 찾아드려요.
              <br />
              전문 스타일리스트의 노하우가 담긴 맞춤형 가이드를 받아보세요.
            </p>

            {/* Service Card */}
            <div className="max-w-lg mx-auto mb-16">
              <Card className="border-2 border-rose-200 bg-white/80 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                <CardContent className="p-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <span className="text-3xl">👗</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-3">AI 골격진단</h3>
                  <p className="text-gray-600 mb-6 font-medium">정확하고 세심한 맞춤 스타일링</p>
                  <div className="text-4xl font-bold mb-6">
                    <span className="line-through text-gray-400 text-2xl mr-2">30,000원</span>
                    <span className="text-rose-500">0원</span>
                    <div className="text-lg font-medium text-rose-600 mt-2">🎉 런칭 이벤트</div>
                  </div>
                  <ul className="text-sm text-gray-700 mb-8 space-y-3 text-left">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-rose-400 mr-3" />
                      17문항 정밀 골격 분석
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-rose-400 mr-3" />
                      개인 맞춤 스타일링 가이드
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-rose-400 mr-3" />
                      개인 맞춤 패션 제품 추천
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-rose-400 mr-3" />
                      액세서리 스타일링 팁
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-rose-400 mr-3" />
                      체형별 코디 가이드
                    </li>
                  </ul>
                  <Link href="/apply">
                    <Button className="w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      스타일링 시작하기
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-rose-500">10,000+</div>
                <div className="text-sm text-gray-600 font-medium">만족한 고객</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-500">99%</div>
                <div className="text-sm text-gray-600 font-medium">만족도</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500">무료</div>
                <div className="text-sm text-gray-600 font-medium">이벤트 중</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section id="service" className="py-20 px-6 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">스타일링 서비스</h2>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              AI 기술과 전문 스타일리스트의 노하우가 만나 당신만의 완벽한 스타일을 완성합니다
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-rose-200 bg-gradient-to-br from-white to-rose-50/50 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-rose-400 to-pink-500 text-white p-8 rounded-t-lg">
                <CardTitle className="text-3xl font-bold flex items-center justify-center">
                  <span className="text-4xl mr-4">💄</span>
                  AI 퍼스널 스타일링
                </CardTitle>
              </CardHeader>
              <CardContent className="p-12">
                <div className="text-center mb-10">
                  <div className="mb-4">
                    <span className="text-3xl line-through text-gray-400 mr-4">30,000원</span>
                    <span className="text-5xl font-bold text-rose-500">0원</span>
                  </div>
                  <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full mb-4">
                    <span className="text-rose-700 font-bold">🎉 런칭 기념 무료 이벤트</span>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    최신 AI 기술로 정확한 골격 분석을 받고, 전문 스타일리스트가 설계한 맞춤형 스타일링 가이드를 무료로
                    만나보세요!
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="font-bold text-rose-500 mb-6 text-lg flex items-center">
                      <span className="text-2xl mr-2">✨</span>
                      포함 서비스
                    </h4>
                    <ul className="space-y-4">
                      <li className="flex items-center text-gray-700">
                        <span className="text-xl mr-3">👗</span>
                        <span>17문항 정밀 골격 진단</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="text-xl mr-3">🎨</span>
                        <span>개인 맞춤 스타일링 가이드</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="text-xl mr-3">🛍️</span>
                        <span>개인 맞춤 패션 제품 추천</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="text-xl mr-3">💎</span>
                        <span>액세서리 스타일링 팁</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-pink-500 mb-6 text-lg flex items-center">
                      <span className="text-2xl mr-2">💎</span>
                      특별 혜택
                    </h4>
                    <ul className="space-y-4">
                      <li className="flex items-center text-gray-700">
                        <span className="text-xl mr-3">⚡</span>
                        <span>즉시 결과 확인 (10분)</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="text-xl mr-3">📱</span>
                        <span>모바일 최적화 가이드</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="text-xl mr-3">👔</span>
                        <span>체형별 코디 가이드</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="text-xl mr-3">♾️</span>
                        <span>평생 활용 가능</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-10 p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-200">
                  <p className="text-rose-600 text-center font-medium">
                    <strong>이런 분께 추천:</strong> 나에게 어울리는 스타일을 찾고 싶은 분, 쇼핑할 때 확신이 필요한 분,
                    이미지 변신을 원하는 분
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 px-6 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">고객 후기</h2>
            <p className="text-xl text-gray-600 font-light">5,000명 이상이 경험한 스타일 변화</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "김민지",
                age: "20대 직장인",
                review:
                  "정말 신기해요! 제가 몰랐던 제 매력을 발견했어요. 이제 옷 쇼핑이 훨씬 재미있고 확신을 가지고 할 수 있게 되었어요.",
                rating: 5,
                type: "웨이브",
                emoji: "🌸",
              },
              {
                name: "박서연",
                age: "30대 마케터",
                review:
                  "AI 분석이 정말 정확해요! 무료 이벤트라니 믿을 수 없어요. 스타일링 가이드 덕분에 매일 코디가 즐거워요.",
                rating: 5,
                type: "스트레이트",
                emoji: "⭐",
              },
              {
                name: "이지은",
                age: "20대 대학생",
                review:
                  "평생 써먹을 수 있는 스타일 바이블을 얻었어요! 특히 컬러 추천이 정말 도움이 되었고, 친구들도 스타일이 좋아졌다고 해요.",
                rating: 5,
                type: "내추럴",
                emoji: "🌿",
              },
              {
                name: "최유진",
                age: "40대 주부",
                review:
                  "나이가 들면서 어떤 옷을 입어야 할지 고민이 많았는데, 이제 확신을 가지고 쇼핑할 수 있어요. 정말 추천합니다!",
                rating: 5,
                type: "웨이브",
                emoji: "🌸",
              },
              {
                name: "정하늘",
                age: "30대 창업가",
                review:
                  "비즈니스 미팅에서 어떤 스타일이 좋을지 몰랐는데, 진단 결과로 완전히 이미지가 바뀌었어요. 자신감이 생겼습니다!",
                rating: 5,
                type: "스트레이트",
                emoji: "⭐",
              },
              {
                name: "한소희",
                age: "20대 인플루언서",
                review: "친구 추천으로 했는데 정말 만족해요. 특히 브랜드 추천이 정확해서 이제 쇼핑할 때 헤매지 않아요!",
                rating: 5,
                type: "내추럴",
                emoji: "🌿",
              },
            ].map((review, index) => (
              <Card
                key={index}
                className="border-2 border-rose-200 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                      <span className="text-white font-bold text-lg">{review.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-lg">{review.name}</p>
                      <p className="text-sm text-gray-600 font-medium">{review.age}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-rose-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed font-medium">`{review.review}`</p>
                  <div className="text-right">
                    <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-sm font-bold rounded-full border border-rose-200">
                      <span className="mr-2">{review.emoji}</span>
                      {review.type}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">자주 묻는 질문</h2>
            <p className="text-xl text-gray-600 font-light">궁금한 점들을 미리 확인해보세요</p>
          </div>

          <Accordion type="single" collapsible className="space-y-6">
            <AccordionItem value="item-1" className="bg-white rounded-2xl shadow-lg border-2 border-rose-200">
              <AccordionTrigger className="px-8 py-6 text-left font-bold text-gray-800 hover:text-rose-500 text-lg">
                <div className="flex items-center">
                  <Clock className="h-6 w-6 mr-4 text-rose-400" />
                  진단에 얼마나 시간이 걸리나요?
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 leading-relaxed">
                총 17개의 질문에 답변하는데 약 10-15분 정도 소요됩니다. 각 질문은 선택형으로 되어있어 빠르게 진행할 수
                있으며, 결제 완료 후 즉시 진단을 시작할 수 있습니다. 진단 결과는 설문 완료 즉시 확인 가능합니다.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-2xl shadow-lg border-2 border-rose-200">
              <AccordionTrigger className="px-8 py-6 text-left font-bold text-gray-800 hover:text-rose-500 text-lg">
                <div className="flex items-center">
                  <span className="text-2xl mr-4">🎨</span>
                  어떤 스타일링 가이드를 받을 수 있나요?
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 leading-relaxed">
                골격 타입에 따른 맞춤형 의상 추천, 체형별 코디 가이드, 액세서리 스타일링 팁, 개인 맞춤 패션 제품 추천 등
                종합적인 스타일링 가이드를 제공합니다. 모든 가이드는 당신의 골격 타입에 최적화되어 있어요.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-2xl shadow-lg border-2 border-rose-200">
              <AccordionTrigger className="px-8 py-6 text-left font-bold text-gray-800 hover:text-rose-500 text-lg">
                <div className="flex items-center">
                  <span className="text-2xl mr-4">👔</span>
                  어떤 체형별 코디 가이드를 받을 수 있나요?
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 leading-relaxed">
                골격 타입에 따른 맞춤형 의상 추천, 체형별 최적의 핏과 실루엣 가이드, 액세서리 스타일링 팁, 개인 맞춤
                패션 제품 추천 등을 제공합니다. 각 골격 타입의 특성을 살린 구체적인 코디 방법을 안내해드려요.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-2xl shadow-lg border-2 border-rose-200">
              <AccordionTrigger className="px-8 py-6 text-left font-bold text-gray-800 hover:text-rose-500 text-lg">
                <div className="flex items-center">
                  <Shield className="h-6 w-6 mr-4 text-rose-400" />
                  환불 정책은 어떻게 되나요?
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 text-gray-600 leading-relaxed">
                결제 후 진단을 시작하기 전까지는 100% 환불이 가능합니다. 진단 완료 후에는 디지털 콘텐츠 특성상 환불이
                어려우나, 기술적 오류나 서비스 불만족 시 고객센터로 연락주시면 개별 검토 후 처리해드립니다.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">나만의 스타일을 무료로 찾아보세요</h2>
          <p className="text-xl text-rose-100 mb-12 font-light max-w-2xl mx-auto">
            런칭 기념 무료 이벤트! 평생 써먹을 수 있는 나만의 스타일 가이드를 지금 받아보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/apply">
              <Button
                size="lg"
                className="bg-white text-rose-500 hover:bg-rose-50 px-12 py-6 text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              >
                스타일링 시작하기
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <div className="flex items-center text-rose-100">
              <Clock className="h-5 w-5 mr-2" />
              <span className="font-medium">10분 만에 완료</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-white">Style Me</span>
                  <p className="text-xs text-gray-400">Personal Styling</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                AI 기반 개인 맞춤 스타일링으로 당신만의 완벽한 스타일을 찾아보세요. 전문 스타일리스트가 설계한 정확한
                진단과 맞춤형 가이드를 제공합니다.
              </p>
              <div className="flex space-x-6">
                <div className="flex items-center text-gray-400">
                  <Star className="h-5 w-5 text-rose-400 mr-2" />
                  <span>4.9/5 평점</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Users className="h-5 w-5 text-rose-400 mr-2" />
                  <span>5,000+ 고객</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-rose-400">서비스</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#service" className="hover:text-rose-400 transition-colors">
                    골격진단
                  </a>
                </li>
                <li>
                  <a href="#service" className="hover:text-rose-400 transition-colors">
                    스타일링 가이드
                  </a>
                </li>
                <li>
                  <a href="#service" className="hover:text-rose-400 transition-colors">
                    컬러 분석
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-rose-400 transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-rose-400">문의</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3" />
                  <span>contact@styleme.co.kr</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3" />
                  <span>1588-0000</span>
                </div>
                <div className="text-sm">
                  <p>평일 09:00 - 18:00</p>
                  <p>(주말, 공휴일 휴무)</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Style Me. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white border-2 border-rose-200">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">문의하기</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowContact(false)} className="text-gray-600">
                  ✕
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-rose-50 rounded-xl border border-rose-200">
                  <Mail className="h-6 w-6 text-rose-500 mr-4" />
                  <span className="text-gray-800">contact@styleme.co.kr</span>
                </div>
                <div className="flex items-center p-4 bg-rose-50 rounded-xl border border-rose-200">
                  <Phone className="h-6 w-6 text-rose-500 mr-4" />
                  <span className="text-gray-800">1588-0000</span>
                </div>
                <p className="text-sm text-gray-600 text-center">평일 09:00 - 18:00 (주말, 공휴일 휴무)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col space-y-4 z-50">
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 shadow-2xl text-white"
        >
          ↑
        </Button>
        <Button
          onClick={() => setShowContact(!showContact)}
          className="w-14 h-14 rounded-full bg-white hover:bg-rose-50 shadow-2xl border-2 border-rose-200"
        >
          <MessageCircle className="h-6 w-6 text-rose-500" />
        </Button>
      </div>
    </div>
  )
}
