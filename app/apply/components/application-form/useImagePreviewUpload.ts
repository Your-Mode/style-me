import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_UPLOAD_IMAGE_COUNT,
  MAX_UPLOAD_IMAGE_SIZE_BYTES,
  MAX_UPLOAD_IMAGE_SIZE_MB,
} from '@/app/apply/components/application-form/application-form.constants';

const isAllowedImageType = (file: File) =>
  ALLOWED_IMAGE_MIME_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_MIME_TYPES)[number]);
const isAllowedImageSize = (file: File) => file.size <= MAX_UPLOAD_IMAGE_SIZE_BYTES;

export function useImagePreviewUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setUploadError(null);

    const validTypeFiles = files.filter(isAllowedImageType);
    const validFiles = validTypeFiles.filter(isAllowedImageSize);

    const hasInvalidTypeFile = validTypeFiles.length !== files.length;
    const hasInvalidSizeFile = validFiles.length !== validTypeFiles.length;

    setUploadedImages((prev) => {
      const remainingCount = MAX_UPLOAD_IMAGE_COUNT - prev.length;
      if (remainingCount <= 0) {
        setUploadError(`사진은 최대 ${MAX_UPLOAD_IMAGE_COUNT}장까지 업로드할 수 있어요.`);
        return prev;
      }

      const nextFiles = validFiles.slice(0, remainingCount);
      const hasTrimmedByLimit = validFiles.length > remainingCount;

      if (hasInvalidTypeFile) {
        setUploadError('JPG, PNG 파일만 업로드할 수 있어요.');
      } else if (hasInvalidSizeFile) {
        setUploadError(`각 파일은 최대 ${MAX_UPLOAD_IMAGE_SIZE_MB}MB까지 업로드할 수 있어요.`);
      } else if (hasTrimmedByLimit) {
        setUploadError(`사진은 최대 ${MAX_UPLOAD_IMAGE_COUNT}장까지 업로드할 수 있어요.`);
      }

      return [...prev, ...nextFiles];
    });

    event.target.value = '';
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, currentIndex) => currentIndex !== index));
  };

  const openImagePicker = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const nextPreviewUrls = uploadedImages.map((file) => URL.createObjectURL(file));
    setPreviewUrls(nextPreviewUrls);

    return () => {
      nextPreviewUrls.forEach((previewUrl) => URL.revokeObjectURL(previewUrl));
    };
  }, [uploadedImages]);

  return {
    fileInputRef,
    previewUrls,
    uploadError,
    handleImageUpload,
    removeImage,
    openImagePicker,
  };
}
