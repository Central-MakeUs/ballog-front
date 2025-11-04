import { useCallback, useEffect } from 'react'
import { POST_MESSAGE_EVENT } from '@ballog/bridge'
import type { ImageData } from '@ballog/bridge/types'

import { useRecordingImages } from '@/features/record/hooks/useRecordImages'
import { useWebViewBridgeListener } from '@/features/record/hooks/useWebViewBridgeListener'
import { useImageUpload } from '@/features/image-management/hooks'
import { useBridge } from '@/shared/hooks/bridge/useBridge'
import CameraIcon from '@/assets/cameraIcon.svg?react'
import RightArrow from '@/assets/rightArrow.svg?react'
import { cn } from '@/shared/lib/classnames'

import { useImageUploadToast } from '../hooks/useImageUploadToast'

interface RecordCameraButtonProps {
  matchRecordId: number
  initialImages?: { imageUrl: string; createdAt: string }[]
  className: string
}

export const RecordCameraButton = ({
  matchRecordId,
  initialImages = [],
  className,
}: RecordCameraButtonProps) => {
  const { send } = useBridge()
  const { images, hasImage, addImage } = useRecordingImages()
  const { uploadImage, uploadState } = useImageUpload({ matchRecordId })

  // 이미지 업로드 상태 토스터
  useImageUploadToast(uploadState)

  // 마운트 시 초기 이미지 배열 세팅
  const initializeImages = useCallback(() => {
    if (!initializeImages || initialImages.length === 0) return

    initialImages.forEach((image) => {
      const newImage: ImageData = {
        uri: image.imageUrl,
        base64: '',
        fileName: '',
        createdAt: image.createdAt,
      }
      addImage(newImage)
    })
  }, [initialImages, addImage])

  // 카메라 열기
  const goToCamera = () => {
    send(POST_MESSAGE_EVENT.OPEN_CAMERA, { message: 'camera' })
  }

  // 웹뷰 → 이미지 수신 후 업로드
  useWebViewBridgeListener(async (image) => {
    const uploaded = await uploadImage(
      image.base64,
      image.fileName || 'upload.jpg',
    )
    if (uploaded) {
      addImage({
        uri: uploaded.imageUrl,
        base64: '',
        fileName: image.fileName,
        createdAt: uploaded.createdAt,
      })
    }
  })

  useEffect(() => {
    initializeImages()
  }, [initializeImages])

  return (
    <button
      onClick={goToCamera}
      className={cn(
        'flex items-center justify-center gap-2 rounded-full bg-usage-background-default text-white p-4 mx-auto',
        className,
      )}
    >
      <div className="relative flex items-center justify-center">
        <CameraIcon className="w-8 h-8 mt-1" />
        {hasImage && (
          <span className="absolute top-0.5 -right-0.5 bg-brand-primary-default text-[10px] rounded-full px-[4px] py-[1px]">
            {images.length}
          </span>
        )}
      </div>
      <span className="body-sm-medium text-usage-text-default">
        사진으로 이 순간 기록
      </span>
      <RightArrow className="w-6 h-6" />
    </button>
  )
}
