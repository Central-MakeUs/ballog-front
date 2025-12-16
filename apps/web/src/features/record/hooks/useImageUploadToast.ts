import { useEffect } from 'react'
import { toast } from 'sonner'

interface UploadState {
  isUploading: boolean
  progress: 'presigned' | 'upload' | 'save' | 'complete'
  error: string | null
}

export const useImageUploadToast = (uploadState: UploadState) => {
  useEffect(() => {
    const { isUploading, progress, error } = uploadState

    switch (true) {
      case !!error:
        toast.error(`업로드 실패: ${error}`)
        break

      case isUploading:
        toast.info('이미지 업로드 중...')
        break

      case progress === 'complete':
        toast.success('업로드 완료!')
        break

      default:
        break
    }
  }, [uploadState])
}
