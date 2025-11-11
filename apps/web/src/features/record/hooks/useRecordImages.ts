import { useState, useCallback } from 'react'
import type { ImageData } from '@ballog/bridge/types'

/**
 * recording-page 에서 업로드된 이미지를 관리하는 배열
 * hasImage 가 true 이면 감정 기록 중 페이지에서 이미지를 업로드했다는 의미임.
 */
export const useRecordingImages = () => {
  const [images, setImages] = useState<ImageData[]>([])

  const addImage = useCallback((data: ImageData) => {
    setImages((prev) =>
      [...prev, data].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      ),
    )
  }, [])

  const clearImages = () => {
    setImages([])
  }

  return {
    images,
    addImage,
    clearImages,
    hasImage: images.length > 0,
  }
}
