import { useState, useCallback } from 'react'

import {
  getPresignedUrl,
  uploadToS3,
  saveImageToServer,
} from '@/entities/image/api'
import { base64ToFile, getMimeTypeFromBase64 } from '@/shared/lib/image-utils'
import type { ImageUploadResponse } from '@/entities/image/model/image.type'

interface UseImageUploadOptions {
  matchRecordId: number
}

interface UploadState {
  isUploading: boolean
  progress: 'presigned' | 'upload' | 'save' | 'complete'
  error: string | null
}

export const useImageUpload = ({ matchRecordId }: UseImageUploadOptions) => {
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 'presigned',
    error: null,
  })

  const uploadImage = useCallback(
    async (
      base64Image: string,
      fileName: string,
    ): Promise<ImageUploadResponse | null> => {
      try {
        setUploadState({
          isUploading: true,
          progress: 'presigned',
          error: null,
        })

        // 1. base64에서 MIME 타입 추출
        const mimeType = getMimeTypeFromBase64(base64Image)

        // 2. presigned URL 요청
        const presignedData = await getPresignedUrl(fileName)

        setUploadState((prev) => ({ ...prev, progress: 'upload' }))

        // 3. base64를 File 객체로 변환
        const file = base64ToFile(base64Image, fileName, mimeType)

        // 4. S3에 파일 업로드
        await uploadToS3(presignedData.presignedUrl, file)

        setUploadState((prev) => ({ ...prev, progress: 'save' }))

        // 5. 업로드된 파일의 최종 URL 생성 (S3 URL)
        const imageUrl = presignedData.presignedUrl.split('?')[0]

        // 6. 서버에 이미지 정보 저장
        const { data: imageData } = await saveImageToServer({
          matchRecordId,
          imageUrl,
        })

        setUploadState({
          isUploading: false,
          progress: 'complete',
          error: null,
        })
        return imageData
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : '업로드 중 오류가 발생했습니다.'

        alert(errorMessage)
        setUploadState({
          isUploading: false,
          progress: 'presigned',
          error: errorMessage,
        })

        return null
      }
    },
    [matchRecordId],
  )

  const resetUploadState = useCallback(() => {
    setUploadState({
      isUploading: false,
      progress: 'presigned',
      error: null,
    })
  }, [])

  return {
    uploadImage,
    uploadState,
    resetUploadState,
  }
}
