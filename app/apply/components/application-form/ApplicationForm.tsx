'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Camera, CreditCard, Smartphone, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Checkbox } from '@/components/ui/checkbox';
import { FormField } from '@/components/ui/form-field';
import { useApplicationFormState } from '@/app/apply/components/application-form/useApplicationFormState';
import { useImagePreviewUpload } from '@/app/apply/components/application-form/useImagePreviewUpload';
import { useApplicationSubmit } from '@/app/apply/components/application-form/useApplicationSubmit';

export default function ApplicationForm() {
  const { formData, isFormValid, updateField } = useApplicationFormState();
  const {
    fileInputRef,
    previewUrls,
    uploadError,
    handleImageUpload,
    removeImage,
    openImagePicker,
  } = useImagePreviewUpload();
  const { isSubmitting, submitError, handleSubmit } = useApplicationSubmit({
    formData,
    isFormValid,
  });

  return (
    <div className='lg:col-span-2'>
      <Card className='border-0 shadow-lg'>
        <CardHeader>
          <CardTitle className='text-2xl text-gray-800'>신청 정보 입력</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* Personal Information */}
          <div className='grid md:grid-cols-2 gap-4'>
            <FormField.Root>
              <Label htmlFor='name'>이름 *</Label>
              <Input
                id='name'
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder='홍길동'
                className='mt-1'
              />
            </FormField.Root>
            <FormField.Root>
              <Label htmlFor='phone'>연락처 *</Label>
              <Input
                id='phone'
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder='010-1234-5678'
                className='mt-1'
              />
            </FormField.Root>
          </div>

          <FormField.Root>
            <Label htmlFor='email'>이메일 *</Label>
            <Input
              id='email'
              type='email'
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder='example@email.com'
              className='mt-1'
            />
          </FormField.Root>

          <FormField.Root>
            <Label>성별 *</Label>
            <RadioGroup
              value={formData.gender}
              onValueChange={(value) => updateField('gender', value)}
              className='flex space-x-6 mt-2'
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='female' id='female' />
                <Label htmlFor='female'>여성</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='male' id='male' />
                <Label htmlFor='male'>남성</Label>
              </div>
            </RadioGroup>
          </FormField.Root>

          <div className='grid md:grid-cols-2 gap-4'>
            <FormField.Root>
              <Label htmlFor='height'>키 (cm) *</Label>
              <Input
                id='height'
                value={formData.height}
                onChange={(e) => updateField('height', e.target.value)}
                placeholder='165'
                className='mt-1'
              />
            </FormField.Root>
            <FormField.Root>
              <Label htmlFor='weight'>몸무게 (kg) *</Label>
              <Input
                id='weight'
                value={formData.weight}
                onChange={(e) => updateField('weight', e.target.value)}
                placeholder='55'
                className='mt-1'
              />
            </FormField.Root>
          </div>

          {/* Photo Upload Section */}
          <FormField.Root className='space-y-4'>
            <FormField.Header>
              <Label>체형 사진 업로드 (선택사항)</Label>
              <FormField.Description>
                더 정확한 진단을 위해 전신 사진을 업로드해주세요. (최대 3장)
              </FormField.Description>
            </FormField.Header>

            <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors'>
              <input
                ref={fileInputRef}
                type='file'
                accept='image/jpeg,image/png'
                multiple
                onChange={handleImageUpload}
                className='hidden'
              />
              <Camera className='h-12 w-12 text-gray-400 mx-auto mb-4' />
              <p className='text-gray-600 mb-2'>사진을 드래그하거나 클릭하여 업로드</p>
              <Button
                type='button'
                variant='outline'
                onClick={openImagePicker}
                className='bg-transparent'
              >
                <Upload className='h-4 w-4 mr-2' />
                사진 선택
              </Button>
              <p className='text-xs text-gray-500 mt-2'>JPG, PNG 파일만 가능 (최대 5MB)</p>
            </div>

            {uploadError && <p className='text-sm text-red-600'>{uploadError}</p>}

            {/* Uploaded Images Preview */}
            {previewUrls.length > 0 && (
              <div className='grid grid-cols-3 gap-4'>
                {previewUrls.map((previewUrl, index) => (
                  <div key={index} className='relative'>
                    <Image
                      src={previewUrl}
                      alt={`업로드된 이미지 ${index + 1}`}
                      className='w-full h-32 object-cover rounded-lg'
                      width={128}
                      height={128}
                    />
                    <Button
                      type='button'
                      variant='destructive'
                      size='sm'
                      className='absolute top-2 right-2 w-6 h-6 p-0'
                      onClick={() => removeImage(index)}
                    >
                      <X className='h-3 w-3' />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </FormField.Root>

          {/* Privacy Agreement */}
          <div className='space-y-4 p-4 bg-gray-50 rounded-lg'>
            <h4 className='font-semibold text-gray-800'>개인정보 수집 및 이용 동의</h4>
            <div className='space-y-3'>
              <FormField.CheckItem>
                <Checkbox
                  id='agreePrivacy'
                  checked={formData.agreePrivacy}
                  onCheckedChange={(checked) => updateField('agreePrivacy', checked === true)}
                />
                <Label htmlFor='agreePrivacy' className='text-sm leading-relaxed'>
                  개인정보 수집 및 이용에 동의합니다. (필수)
                  <br />
                  <span className='text-gray-500'>
                    수집항목: 이름, 연락처, 이메일, 신체정보, 사진(선택) / 이용목적: 골격진단 서비스
                    제공 / 보관기간: 서비스 완료 후 1년
                  </span>
                </Label>
              </FormField.CheckItem>
              <FormField.CheckItem>
                <Checkbox
                  id='agreeService'
                  checked={formData.agreeService}
                  onCheckedChange={(checked) => updateField('agreeService', checked === true)}
                />
                <Label htmlFor='agreeService' className='text-sm'>
                  서비스 이용약관에 동의합니다. (필수)
                </Label>
              </FormField.CheckItem>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <Label>결제 수단 선택 *</Label>
            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={(value) => updateField('paymentMethod', value)}
              className='grid md:grid-cols-3 gap-4 mt-2'
            >
              <FormField.OptionCard>
                <RadioGroupItem value='card' id='card' />
                <CreditCard className='h-5 w-5 text-gray-500' />
                <Label htmlFor='card'>신용카드</Label>
              </FormField.OptionCard>
              <FormField.OptionCard>
                <RadioGroupItem value='mobile' id='mobile' />
                <Smartphone className='h-5 w-5 text-gray-500' />
                <Label htmlFor='mobile'>휴대폰 결제</Label>
              </FormField.OptionCard>
              <FormField.OptionCard>
                <RadioGroupItem value='kakao' id='kakao' />
                <div className='w-5 h-5 bg-yellow-400 rounded'></div>
                <Label htmlFor='kakao'>카카오페이</Label>
              </FormField.OptionCard>
            </RadioGroup>
          </div>

          {/* Submit Button */}
          <div className='pt-6'>
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              className='w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300'
            >
              {isSubmitting ? (
                <div className='flex items-center'>
                  <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                  신청 진행 중...
                </div>
              ) : (
                `무료로 진단 시작하기 🎉`
              )}
            </Button>
            {submitError && <p className='text-sm text-red-600 text-center mt-2'>{submitError}</p>}
            <p className='text-sm text-gray-500 text-center mt-2'>
              런칭 기념 무료 이벤트! 신청 완료 후 즉시 골격진단을 시작할 수 있습니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
