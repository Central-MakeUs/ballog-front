import { useState } from 'react'

const uploadPhotoToServer = async (photoUrl: string): Promise<string> => {
  // TODO: api 나오면 작성
  return 'urlurl'
}

export const useUploadPhoto = () => {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([])

  const uploadPhoto = async (photoUrl: string): Promise<string | null> => {
    try {
      // 실제 API 업로드 호출
      const uploadedUrl = await uploadPhotoToServer(photoUrl)

      // URL을 상태에 추가
      setUploadedUrls((prev) => [...prev, uploadedUrl])

      return uploadedUrl
    } catch (error) {
      console.error('업로드 실패:', error)
      return null
    }
  }

  const clearUploadPhoto = () => {
    setUploadedUrls([])
  }

  return { uploadedUrls, uploadPhoto, clearUploadPhoto }
}
