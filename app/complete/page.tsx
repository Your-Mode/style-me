"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Check, CreditCard, Smartphone, Upload, X, Camera, Heart } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ApplyPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    height: "",
    weight: "",
    agreePrivacy: false,
    agreeService: false,
    paymentMethod: "",
  })
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length > 0) {
      setUploadedImages((prev) => [...prev, ...files].slice(0, 3)) // 최대 3장
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const isFormValid = () => {
    return (
      formData.name &&
      formData.phone &&
      formData.email &&
      formData.gender &&
      formData.height &&
      formData.weight &&
      formData.agreePrivacy &&
      formData.agreeService &&
      formData.paymentMethod
    )
  }

  const handleSubmit = async () => {
    if (!isFormValid()) return

    setIsSubmitting(true)

    // 결제 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 로컬 스토리지에 사용자 정보 저장
    localStorage.setItem("userInfo", JSON.stringify({ ...formData, images: uploadedImages.length }))

    // 인증 토큰 생성 (결제 완료 시)
    const authToken = {
      phone: formData.phone,
      timestamp: new Date().toISOString(),
      verified: true,
    }
    localStorage.setItem("authToken", JSON.stringify(authToken))

    router.push("/complete")
  }

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
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                돌아가기
              </Button>
            </Link>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              골격진단 신청
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Service Info */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8 border-0 shadow-lg bg-gradient-to-br from-pink-100 to-purple-100">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">서비스 안내</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">진단 비용</span>
                    <div className="text-right">
                      <span className="text-lg line-through text-gray-400">30,000원</span>
                      <span className="text-2xl font-bold text-rose-500 ml-2">0원</span>
                      <div className="text-sm text-rose-600 font-medium">🎉 런칭 이벤트</div>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2 text-gray-800">포함 내용</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        AI 기반 17문항 골격 진단
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        개인 맞춤 스타일링 가이드
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        개인 맞춤 패션 제품 추천
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        액세서리 스타일링 팁
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        체형별 코디 가이드
                      </li>
                    </ul>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">소요 시간</span>
                      <span className="font-medium">약 10-15분</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-gray-600">결과 제공</span>
                      <span className="font-medium">즉시 확인</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-2">💡 팁</h5>
                    <p className="text-sm text-gray-600">
                      더 정확한 진단을 위해 체형 사진을 업로드해주세요. (선택사항)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800">신청 정보 입력</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">이름 *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="홍길동"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">연락처 *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="010-1234-5678"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">이메일 *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="example@email.com"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>성별 *</Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) => handleInputChange("gender", value)}
                      className="flex space-x-6 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">여성</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">남성</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="height">키 (cm) *</Label>
                      <Input
                        id="height"
                        value={formData.height}
                        onChange={(e) => handleInputChange("height", e.target.value)}
                        placeholder="165"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">몸무게 (kg) *</Label>
                      <Input
                        id="weight"
                        value={formData.weight}
                        onChange={(e) => handleInputChange("weight", e.target.value)}
                        placeholder="55"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Photo Upload Section */}
                  <div className="space-y-4">
                    <div>
                      <Label>체형 사진 업로드 (선택사항)</Label>
                      <p className="text-sm text-gray-500 mt-1">
                        더 정확한 진단을 위해 전신 사진을 업로드해주세요. (최대 3장)
                      </p>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">사진을 드래그하거나 클릭하여 업로드</p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-transparent"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        사진 선택
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">JPG, PNG 파일만 가능 (최대 5MB)</p>
                    </div>

                    {/* Uploaded Images Preview */}
                    {uploadedImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-4">
                        {uploadedImages.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(file) || "/placeholder.svg"}
                              alt={`업로드된 이미지 ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2 w-6 h-6 p-0"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Privacy Agreement */}
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800">개인정보 수집 및 이용 동의</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="agreePrivacy"
                          checked={formData.agreePrivacy}
                          onCheckedChange={(checked) => handleInputChange("agreePrivacy", checked)}
                        />
                        <Label htmlFor="agreePrivacy" className="text-sm leading-relaxed">
                          개인정보 수집 및 이용에 동의합니다. (필수)
                          <br />
                          <span className="text-gray-500">
                            수집항목: 이름, 연락처, 이메일, 신체정보, 사진(선택) / 이용목적: 골격진단 서비스 제공 /
                            보관기간: 서비스 완료 후 1년
                          </span>
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="agreeService"
                          checked={formData.agreeService}
                          onCheckedChange={(checked) => handleInputChange("agreeService", checked)}
                        />
                        <Label htmlFor="agreeService" className="text-sm">
                          서비스 이용약관에 동의합니다. (필수)
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <Label>결제 수단 선택 *</Label>
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={(value) => handleInputChange("paymentMethod", value)}
                      className="grid md:grid-cols-3 gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="h-5 w-5 text-gray-500" />
                        <Label htmlFor="card">신용카드</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="mobile" id="mobile" />
                        <Smartphone className="h-5 w-5 text-gray-500" />
                        <Label htmlFor="mobile">휴대폰 결제</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="kakao" id="kakao" />
                        <div className="w-5 h-5 bg-yellow-400 rounded"></div>
                        <Label htmlFor="kakao">카카오페이</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      onClick={handleSubmit}
                      disabled={!isFormValid() || isSubmitting}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          신청 진행 중...
                        </div>
                      ) : (
                        `무료로 진단 시작하기 🎉`
                      )}
                    </Button>
                    <p className="text-sm text-gray-500 text-center mt-2">
                      런칭 기념 무료 이벤트! 신청 완료 후 즉시 골격진단을 시작할 수 있습니다.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
