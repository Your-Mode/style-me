"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Phone, AlertCircle, CheckCircle, Heart } from "lucide-react"
import Link from "next/link"
import { valueExists } from "@/firebase";
import { useMutation } from "@tanstack/react-query";

interface AuthGuardProps {
  children: React.ReactNode
  requiredPage: "complete" | "survey"
}

export default function AuthGuard({ children, requiredPage }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const { mutate } = useMutation({
    mutationFn: () => valueExists("apply", phoneNumber.replace("-", "")),
    onSuccess: () => {
      setIsVerifying(false)
      setShowSuccess(true)
      setTimeout(() => {
        setIsAuthenticated(true)
      }, 1500)
    },
    onError: (error) => {
      console.error(error);
    }
  })

  const checkAuthentication = async () => {
    try {
      const result = await valueExists("apply", phoneNumber.replace("-", ""))
      console.log(result)

      if (result) {
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error("인증 확인 중 오류:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePhoneVerification = async () => {
    /*if (!phoneNumber.trim()) {
      setError("전화번호를 입력해주세요.")
      return
    }

    // 전화번호 형식 검증
    const phoneRegex = /^010-?\d{4}-?\d{4}$/
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ""))) {
      setError("올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)")
      return
    }*/

    setIsVerifying(true)
    setError("")

    try {
      // 저장된 사용자 정보와 비교
      const userInfo = localStorage.getItem("userInfo")
      const result = await valueExists("apply", phoneNumber.replaceAll("-", ""))

      if (!userInfo) {
        if (!result) {
          setError("결제 정보를 찾을 수 없습니다. 먼저 결제를 완료해주세요.")
          setIsVerifying(false)
          return
        }
        return
      }

      const user = JSON.parse(userInfo)
      const normalizedInput = phoneNumber.replace(/[^0-9]/g, "")

      // 시뮬레이션 딜레이
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (normalizedInput) {
        // 인증 토큰 생성
        const authToken = {
          phone: user.phone,
          timestamp: new Date().toISOString(),
          verified: true,
        }

        localStorage.setItem("authToken", JSON.stringify(authToken))

        setShowSuccess(true)
        setTimeout(() => {
          setIsAuthenticated(true)
        }, 1500)
      } else {
        setError("결제 시 입력한 전화번호와 일치하지 않습니다.")
      }
    } catch {
      setError("인증 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handlePhoneVerification()
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">인증 확인 중...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        {/* Header */}
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
              <Link href="/apply" className="text-gray-600 hover:text-rose-500 transition-colors font-medium">
                신청하기
              </Link>
            </nav>
          </div>
        </header>

        {/* Auth Content */}
        <div className="py-8 px-4">
          <div className="container mx-auto max-w-md">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6 shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">접근 인증</h1>
              <p className="text-gray-600">
                {requiredPage === "complete" ? "결제 완료" : "골격진단"} 페이지는 결제를 완료한 고객만 이용할 수
                있습니다.
              </p>
            </div>

            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center text-xl">
                  <Phone className="h-5 w-5 mr-2" />
                  전화번호 인증
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {showSuccess ? (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-green-600 mb-2">인증 완료!</h3>
                    <p className="text-gray-600">잠시 후 페이지로 이동합니다...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="phone" className="text-gray-700 font-medium">
                        결제 시 입력한 전화번호를 입력해주세요
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value)
                          setError("")
                        }}
                        onKeyPress={handleKeyPress}
                        placeholder="010-1234-5678"
                        className="mt-2 text-lg"
                        disabled={isVerifying}
                      />
                    </div>

                    {error && (
                      <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <span className="text-red-600 text-sm">{error}</span>
                      </div>
                    )}

                    <Button
                      onClick={() => mutate()}
                      disabled={isVerifying || !phoneNumber.trim()}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isVerifying ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          인증 중...
                        </div>
                      ) : (
                        "인증하기"
                      )}
                    </Button>

                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-4">아직 결제를 완료하지 않으셨나요?</p>
                      <Link href="/apply">
                        <Button
                          variant="outline"
                          className="border-2 border-pink-400 text-pink-600 hover:bg-pink-50 bg-transparent"
                        >
                          결제하러 가기
                        </Button>
                      </Link>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">💡 도움말</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• 결제 시 입력한 전화번호와 정확히 일치해야 합니다</li>
                        <li>• 인증은 24시간 동안 유효합니다</li>
                        <li>• 문제가 있으시면 고객센터로 문의해주세요</li>
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 mb-2">문의사항이 있으시면 연락주세요</p>
              <div className="flex justify-center space-x-4 text-sm text-gray-600">
                <span>📧 contact@styleme.co.kr</span>
                <span>📞 1588-0000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
