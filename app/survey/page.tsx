"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Bot, Send, CheckCircle, Loader2, MousePointer, Heart } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { surveyQuestions } from "@/lib/survey-data"
import Link from "next/link"
import AuthGuard from "@/components/auth-guard"

interface ChatMessage {
  type: "bot" | "user" | "system"
  content: string
  timestamp: Date
}

export default function SurveyPage() {
  /* ---------------- state & refs ---------------- */
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [detectedAnswer, setDetectedAnswer] = useState<string>("")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [answerMethod, setAnswerMethod] = useState<"option" | "chat" | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  /* ---------------- effects ---------------- */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // 첫 메시지
  useEffect(() => {
    setChatMessages([
      {
        type: "bot",
        content: `안녕하세요! 당신만의 완벽한 스타일을 찾아드릴게요 ✨

총 17개의 질문을 통해 당신의 골격 타입을 정확히 분석해드릴게요.

옵션을 선택하거나 자유롭게 대화하듯 답변해주세요.

첫 번째 질문입니다:
${surveyQuestions[0].question}`,
        timestamp: new Date(),
      },
    ])
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  /* ---------------- helpers ---------------- */
  const analyzeUserInput = async (userInput: string, idx: number): Promise<string> => {
    const q = surveyQuestions[idx]
    const input = userInput.toLowerCase()

    const keywords = {
      A: q.options[0].label.toLowerCase(),
      B: q.options[1].label.toLowerCase(),
      C: q.options[2].label.toLowerCase(),
    }

    let best = "A"
    let scoreMax = 0

    Object.entries(keywords).forEach(([opt, keyStr]) => {
      const keys = keyStr.split(/[,\s]+/)
      let score = 0
      keys.forEach((k) => {
        if (k.length > 2 && input.includes(k)) score += k.length
      })

      // 가중치
      if (opt === "A" && /(두꺼|탄탄|육감|근육|짧|작|단단)/.test(input)) score += 10
      if (opt === "B" && /(부드럽|곡선|여성|평면|자연|둥글|길)/.test(input)) score += 10
      if (opt === "C" && /(뼈|마른|직선|각진|얇|건조|도드라)/.test(input)) score += 10

      if (score > scoreMax) {
        scoreMax = score
        best = opt
      }
    })

    return best
  }

  const nextStep = async (answer: string, method: "option" | "chat", userMsg?: string) => {
    setIsProcessing(true)
    setAnswerMethod(method)

    // 1) 사용자 메시지 push
    if (method === "chat" && userMsg) {
      setChatMessages((prev) => [
        ...prev,
        { type: "user", content: userMsg, timestamp: new Date() },
        { type: "system", content: "스타일 분석 중이에요... 💫", timestamp: new Date() },
      ])
    } else {
      const label = surveyQuestions[currentQuestion].options.find((o) => o.value === answer)?.label
      setChatMessages((prev) => [...prev, { type: "user", content: `${answer}. ${label}`, timestamp: new Date() }])
    }

    // 2) 딜레이 & 봇 응답
    await new Promise((r) => setTimeout(r, method === "chat" ? 2000 : 1000))

    setChatMessages((prev) => {
      const base = prev.filter((m) => m.type !== "system")
      return [
        ...base,
        {
          type: "bot",
          content: surveyQuestions[currentQuestion].chatbotResponse[answer as "A" | "B" | "C"],
          timestamp: new Date(),
        },
      ]
    })

    // 3) 답변 저장
    const newAns = [...answers, answer]
    setAnswers(newAns)
    setSelectedAnswer("")
    setDetectedAnswer("")

    // 4) 다음 질문 or 종료
    if (currentQuestion < surveyQuestions.length - 1) {
      const nxt = currentQuestion + 1
      await new Promise((r) => setTimeout(r, 1500))
      setCurrentQuestion(nxt)
      setChatMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: `${nxt + 1}번째 질문이에요 💕

${surveyQuestions[nxt].question}

옵션을 선택하거나 자유롭게 답변해주세요!`,
          timestamp: new Date(),
        },
      ])
    } else {
      // 완료
      localStorage.setItem("surveyAnswers", JSON.stringify(newAns))
      setChatMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            "모든 질문이 완료되었어요! 🎉\n\n지금 당신만의 완벽한 스타일을 분석하고 있어요. 조금만 기다려주세요... ✨",
          timestamp: new Date(),
        },
      ])
      await new Promise((r) => setTimeout(r, 3000))
      router.push("/result")
    }

    setIsProcessing(false)
  }

  /* ---------------- handlers ---------------- */
  const handleOptionSelect = () => {
    if (!selectedAnswer || isProcessing) return
    nextStep(selectedAnswer, "option")
  }

  const handleSend = async () => {
    if (!inputMessage.trim() || isProcessing) return
    const msg = inputMessage.trim()
    setInputMessage("")
    const ai = await analyzeUserInput(msg, currentQuestion)
    nextStep(ai, "chat", msg)
  }

  const progress = ((currentQuestion + 1) / surveyQuestions.length) * 100

  /* ---------------- JSX ---------------- */
  return (
    <AuthGuard requiredPage="survey">
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        {/* ------- Global Header ------- */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-rose-200/50 shadow-sm">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
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

          <div className="grid lg:grid-cols-2 gap-6">
            {/* 질문 영역 */}
            <Card className="border-2 border-rose-200 bg-white/90 backdrop-blur-sm shadow-xl min-h-[300px]">
              <CardHeader className="bg-gradient-to-r from-rose-400 to-pink-500 text-white p-4 rounded-t-lg">
                <CardTitle className="flex items-center text-lg font-bold">
                  <MousePointer className="h-5 w-5 mr-2" />
                  질문 {currentQuestion + 1}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-800 font-semibold mb-4">{surveyQuestions[currentQuestion].question}</p>

                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} className="space-y-3">
                  {surveyQuestions[currentQuestion].options.map((opt) => (
                    <div
                      key={opt.value}
                      className={`flex items-center space-x-3 border-2 p-3 rounded-xl cursor-pointer transition ${
                        selectedAnswer === opt.value
                          ? "border-rose-400 bg-rose-50"
                          : detectedAnswer === opt.value
                            ? "border-emerald-400 bg-emerald-50"
                            : "border-gray-200 hover:border-rose-300"
                      }`}
                    >
                      <RadioGroupItem value={opt.value} id={opt.value} />
                      <Label htmlFor={opt.value} className="flex-1 cursor-pointer text-sm md:text-base">
                        <span className="font-bold text-rose-500 mr-2">{opt.value}.</span>
                        {opt.label}
                      </Label>
                      {detectedAnswer === opt.value && <CheckCircle className="h-5 w-5 text-emerald-500" />}
                    </div>
                  ))}
                </RadioGroup>

                <Button
                  onClick={handleOptionSelect}
                  disabled={!selectedAnswer || isProcessing}
                  className="w-full mt-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white"
                >
                  {currentQuestion === surveyQuestions.length - 1 ? "완료하기 🎉" : "다음"}
                </Button>
              </CardContent>
            </Card>

            {/* 채팅 영역 */}
            <Card className="border-2 border-pink-200 bg-white/90 backdrop-blur-sm shadow-xl flex flex-col h-[70vh]">
              <CardHeader className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-4 rounded-t-lg">
                <CardTitle className="flex items-center text-lg font-bold">
                  <Bot className="h-5 w-5 mr-2" />
                  스타일 AI
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
                {/* 메시지 리스트 */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                  {chatMessages.map((m, i) => (
                    <div key={i} className={`flex ${m.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`rounded-xl p-3 text-sm md:text-base ${
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleSend()
                      }
                    }}
                    placeholder="대화로 답변해보세요..."
                    disabled={isProcessing}
                    className="flex-1"
                  />
                  <Button onClick={handleSend} disabled={isProcessing || !inputMessage.trim()}>
                    {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs mt-1 text-gray-500">Enter 로 전송</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
