import { useCallback, useEffect, useRef } from 'react'
import { POST_MESSAGE_EVENT } from '@ballog/bridge'
import type { ImageData } from '@ballog/bridge/types'
import { CameraIcon } from '@ballog/asset/icons'

import { useModal } from '@/shared/hooks/modal/useModal'
import { useRecordingImages } from '@/features/record/hooks/useRecordImages'
import { useWebViewBridgeListener } from '@/features/record/hooks/useWebViewBridgeListener'
import { useImageUpload } from '@/features/image-management/hooks'
import { useBridge } from '@/shared/hooks/bridge/useBridge'
import RightArrow from '@/assets/RightArrow'
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
  const { images, hasImage, addImage, isFull } = useRecordingImages()
  const { uploadImage, uploadState } = useImageUpload({ matchRecordId })
  const { openVerticalModal } = useModal()

  // 이미지 업로드 상태 토스터
  useImageUploadToast(uploadState)

  // initialImages 변경 시 createdAt 기준으로 중복 없이 동기화
  const seedCreatedAtRef = useRef<Set<string>>(new Set())
  const initializeImages = useCallback(() => {
    if (initialImages.length === 0) return

    initialImages.forEach((image) => {
      if (seedCreatedAtRef.current.has(image.createdAt)) return
      seedCreatedAtRef.current.add(image.createdAt)
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
    if (isFull) {
      return openVerticalModal({
        heading: `최대 등록 가능한\n사진 수를 초과했어요`,
        body: `추가 등록은 관람로그에서 진행해주세요`,

        buttons: [
          {
            label: '확인',
            onClick: () => {
              close()
            },
          },
        ],
      })
    }

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
        'flex items-center justify-center gap-2 rounded-full bg-usage-background-strong text-usage-text-default p-2 mx-auto',
        className,
      )}
    >
      <div className="relative flex items-center justify-center">
        <CameraIcon className="mt-1 w-9 h-9" />
        {hasImage && (
          <span className="absolute top-0.5 -right-0.5 bg-brand-primary-default text-brand-neutral-white text-[10px] rounded-full px-[4px] py-[1px]">
            {images.length}
          </span>
        )}
      </div>
      <span className="text-center body-sm-medium text-usage-text-default">
        사진으로 이 순간 기록
      </span>
      <RightArrow className="w-6 h-6 dark:text-brand-neutral-white light:text-neutral-500" />
    </button>
  )
}
