import { useEffect } from 'react'
import { toast } from 'sonner'

interface UploadState {
  isUploading: boolean
  progress: 'presigned' | 'upload' | 'save' | 'complete'
  error: string | null
}

export const useImageUploadToast = (uploadState: UploadState) => {
  useEffect(() => {
    if (uploadState.isUploading) {
      toast.info('이미지 업로드 중...')
    }
  }, [uploadState.isUploading])

  useEffect(() => {
    if (!uploadState.isUploading && uploadState.progress === 'complete') {
      toast.success('업로드 완료!')
    }
  }, [uploadState.isUploading, uploadState.progress])

  useEffect(() => {
    if (uploadState.error) {
      toast.error(`업로드 실패: ${uploadState.error}`)
    }
  }, [uploadState.error])
}
