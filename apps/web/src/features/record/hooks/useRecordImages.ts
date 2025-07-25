import { useState } from 'react'

/**
 * recording-page 에서 업로드된 이미지 상태를 관리하는 훅
 * hasImage 가 true 이면 감정 기록 중 페이지에서 이미지를 업로드했다는 의미임.
 */
export const useRecordingImages = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([])

  const addImage = (url: string) => {
    setImageUrls((prev) => [...prev, url])
  }

  const clearImages = () => {
    setImageUrls([])
  }

  return {
    imageUrls,
    addImage,
    clearImages,
    hasImage: imageUrls.length > 0,
  }
}
