'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Camera, CreditCard, Smartphone, Upload, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormField } from '@/components/ui/form-field';
import { useApplicationFormState } from '@/app/apply/components/application-form/useApplicationFormState';
import { useImagePreviewUpload } from '@/app/apply/components/application-form/useImagePreviewUpload';
import { useApplicationSubmit } from '@/app/apply/components/application-form/useApplicationSubmit';
import {
  POLICY_LINKS,
  POLICY_VERSIONS,
  PRIVACY_OPERATION_NOTICE,
  REQUIRED_AGREEMENT_GUIDE_TEXT,
} from '@/app/apply/components/application-form/application-form.constants';

export default function ApplicationForm() {
  const { formData, isFormValid, formErrors, updateField } = useApplicationFormState();
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

  const shouldShowRequiredAgreementError = !formData.agreePrivacy || !formData.agreeService;

  return (
    <div className='lg:col-span-2'>
      <Card className='border-0 shadow-lg'>
        <CardHeader>
          <CardTitle className='text-2xl text-gray-800'>신청 정보 입력</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid md:grid-cols-2 gap-4'>
            <FormField.Root>
              <Label htmlFor='name'>이름 *</Label>
              <Input
                id='name'
                value={formData.name}
                onChange={(event) => updateField('name', event.target.value)}
                placeholder='홍길동'
                className='mt-1'
              />
            </FormField.Root>
            <FormField.Root>
              <Label htmlFor='phone'>연락처 *</Label>
              <Input
                id='phone'
                value={formData.phone}
                onChange={(event) => updateField('phone', event.target.value)}
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
              onChange={(event) => updateField('email', event.target.value)}
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
              <Label htmlFor='height'>키(cm) *</Label>
              <Input
                id='height'
                value={formData.height}
                onChange={(event) => updateField('height', event.target.value)}
                placeholder='165'
                className='mt-1'
              />
            </FormField.Root>
            <FormField.Root>
              <Label htmlFor='weight'>몸무게(kg) *</Label>
              <Input
                id='weight'
                value={formData.weight}
                onChange={(event) => updateField('weight', event.target.value)}
                placeholder='55'
                className='mt-1'
              />
            </FormField.Root>
          </div>

          <FormField.Root className='space-y-4'>
            <FormField.Header>
              <Label>체형 사진 업로드 (선택)</Label>
              <FormField.Description>
                더 정확한 진단을 위해 전신 사진을 업로드할 수 있습니다. (최대 3장)
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
              <p className='text-gray-600 mb-2'>사진을 드래그하거나 클릭해 업로드하세요.</p>
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

            {uploadError ? <p className='text-sm text-red-600'>{uploadError}</p> : null}

            {previewUrls.length > 0 ? (
              <div className='grid grid-cols-3 gap-4'>
                {previewUrls.map((previewUrl, index) => (
                  <div key={previewUrl} className='relative'>
                    <Image
                      src={previewUrl}
                      alt={`업로드한 이미지 ${index + 1}`}
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
            ) : null}
          </FormField.Root>

          <div className='space-y-4 p-4 bg-gray-50 rounded-lg'>
            <h4 className='font-semibold text-gray-800'>개인정보 및 약관 동의</h4>
            <div className='space-y-3'>
              <FormField.CheckItem className='items-start gap-2'>
                <Checkbox
                  id='agreePrivacy'
                  className='shrink-0 mt-0.5'
                  checked={formData.agreePrivacy}
                  onCheckedChange={(checked) => updateField('agreePrivacy', checked === true)}
                />
                <Label htmlFor='agreePrivacy' className='text-sm leading-relaxed min-w-0 whitespace-normal break-keep'>
                  개인정보 수집 및 이용에 동의합니다. (필수)
                  <span className='block text-gray-500 mt-1'>
                    수집 항목: 이름, 연락처, 이메일, 성별, 키/몸무게
                    <br />
                    이용 목적: 골격 진단 서비스 제공 및 결과 안내
                    <br />
                    보관 기간: {PRIVACY_OPERATION_NOTICE.retention}
                  </span>
                </Label>
              </FormField.CheckItem>

              <FormField.CheckItem className='items-start gap-2'>
                <Checkbox
                  id='agreeService'
                  className='shrink-0 mt-0.5'
                  checked={formData.agreeService}
                  onCheckedChange={(checked) => updateField('agreeService', checked === true)}
                />
                <Label htmlFor='agreeService' className='text-sm min-w-0 whitespace-normal break-keep'>
                  서비스 이용약관에 동의합니다. (필수)
                </Label>
              </FormField.CheckItem>

              <FormField.CheckItem className='items-start gap-2'>
                <Checkbox
                  id='agreePhotoProcessing'
                  className='shrink-0 mt-0.5'
                  checked={formData.agreePhotoProcessing}
                  onCheckedChange={(checked) => updateField('agreePhotoProcessing', checked === true)}
                />
                <Label htmlFor='agreePhotoProcessing' className='text-sm min-w-0 whitespace-normal break-keep'>
                  선택 업로드 사진 처리에 동의합니다. (선택)
                </Label>
              </FormField.CheckItem>

              <FormField.CheckItem className='items-start gap-2'>
                <Checkbox
                  id='agreeMarketing'
                  className='shrink-0 mt-0.5'
                  checked={formData.agreeMarketing}
                  onCheckedChange={(checked) => updateField('agreeMarketing', checked === true)}
                />
                <Label htmlFor='agreeMarketing' className='text-sm min-w-0 whitespace-normal break-keep'>
                  이벤트/혜택 안내 수신에 동의합니다. (선택)
                </Label>
              </FormField.CheckItem>
            </div>

            <div className='text-xs text-gray-600 leading-relaxed space-y-1 break-keep'>
              <p>
                필수 문서:
                {' '}
                <Link href={POLICY_LINKS.privacy} className='underline underline-offset-2'>
                  개인정보처리방침
                </Link>
                {' '}
                (v{POLICY_VERSIONS.privacy}),
                {' '}
                <Link href={POLICY_LINKS.terms} className='underline underline-offset-2'>
                  이용약관
                </Link>
                {' '}
                (v{POLICY_VERSIONS.terms})
              </p>
              <p>{PRIVACY_OPERATION_NOTICE.thirdParty}</p>
              <p>권리행사(열람/정정/삭제) 요청: {PRIVACY_OPERATION_NOTICE.rights}</p>
            </div>

            {shouldShowRequiredAgreementError ? (
              <p className='text-sm text-red-600'>
                {formErrors.requiredAgreement ?? REQUIRED_AGREEMENT_GUIDE_TEXT}
              </p>
            ) : null}
          </div>

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
                '무료로 진단 시작하기 🚀'
              )}
            </Button>
            {submitError ? <p className='text-sm text-red-600 text-center mt-2'>{submitError}</p> : null}
            <p className='text-sm text-gray-500 text-center mt-2'>
              이벤트 기간 무료 신청 완료 후 즉시 골격진단이 시작됩니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
