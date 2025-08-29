import { useEffect, useState, useCallback } from 'react'

import type { Image } from '@/entities/record/model/record.type'
import { useImagePicker } from '@/features/image-management/hooks/useImagePicker'
import { useImageUpload } from '@/features/image-management/hooks/useImageUpload'
import type { ImageUploadResponse } from '@/entities/image/model/image.type'

interface UseImagePickerWithUploadProps {
  matchRecordId: number
  initialImages?: Image[]
}

export const useImagePickerWithUpload = ({
  matchRecordId,
  initialImages = [],
}: UseImagePickerWithUploadProps) => {
  const [uploadedImages, setUploadedImages] = useState<ImageUploadResponse[]>(
    [],
  )

  const { newImages, requestImagePick } = useImagePicker({
    initialImages,
  })
  const { uploadImage, uploadState } = useImageUpload({ matchRecordId })

  // 새로운 이미지가 선택되면 자동으로 병렬 업로드
  useEffect(() => {
    const handleImageUpload = async () => {
      if (newImages.length > 0) {
        const imagesToUpload = newImages.filter((image) => 'base64' in image)

        if (imagesToUpload.length > 0) {
          // Promise.all로 병렬 처리
          const uploadPromises = imagesToUpload.map((image) =>
            uploadImage(image.base64, image.fileName),
          )

          const results = await Promise.all(uploadPromises)
          const successfulResults = results.filter((result) => result !== null)

          if (successfulResults.length > 0) {
            setUploadedImages(successfulResults)
          }
        }
      }
    }

    handleImageUpload()
  }, [newImages, uploadImage])

  const clearUploadedImages = useCallback(() => {
    setUploadedImages([])
  }, [])

  return {
    // 이미지 선택 관련
    requestImagePick,
    newImages,

    // 업로드 관련
    uploadState,
    uploadedImages,
    clearUploadedImages,
  }
}
