import { createWebBridge, POST_MESSAGE_EVENT } from '@ballog/bridge'
import { useEffect } from 'react'
import type { ImageData } from '@ballog/bridge/types'

import { Toast } from '@/shared/lib/toast'
import { RecordingCard } from '@/entities/record/ui/RecordingCard'
import { useRecordingImages } from '@/features/record/hooks/useRecordImages'
import { useWebViewBridgeListener } from '@/features/record/hooks/useWebViewBridgeListener'
import type { RecordingResponse } from '@/entities/record/model/recording.type'
import { TEAMS } from '@/shared/constants/teams'
import { STADIUM } from '@/shared/constants/stadium'
import { useImageUpload } from '@/shared/hooks/image'

export const RecordingCardWithWebBridge = ({
  recordingData,
}: {
  recordingData: RecordingResponse
}) => {
  const bridge = createWebBridge()
  const { hasImage, addImage } = useRecordingImages()
  const { uploadImage, uploadState } = useImageUpload({
    matchRecordId: recordingData.matchRecordId,
  })
  useEffect(() => {
    if (!recordingData.imageList || recordingData.imageList.length === 0) return

    recordingData.imageList.forEach((image) => {
      const newImage: ImageData = {
        uri: image.imageUrl,
        base64: '',
        fileName: '',
        createdAt: image.createdAt,
      }

      addImage(newImage)
    })
  }, [recordingData.imageList])

  const handleClick = () => {
    bridge.send(POST_MESSAGE_EVENT.OPEN_CAMERA, { message: 'camera' })
  }

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
    if (uploadState.isUploading) {
      Toast.info('이미지 업로드 중...')
    }
  }, [uploadState.isUploading])

  useEffect(() => {
    if (!uploadState.isUploading && uploadState.progress === 'complete') {
      Toast.success('업로드 완료!')
    }
  }, [uploadState.isUploading, uploadState.progress])

  useEffect(() => {
    if (uploadState.error) {
      Toast.error(`업로드 실패: ${uploadState.error}`)
    }
  }, [uploadState.error])

  return (
    <RecordingCard.Root className="w-full">
      <RecordingCard.Icon
        state={hasImage ? true : false}
        onClick={handleClick}
      />
      <RecordingCard.Info
        homeTeam={TEAMS[recordingData.homeTeam]}
        awayTeam={TEAMS[recordingData.awayTeam]}
        stadium={STADIUM[recordingData.stadium]}
        date={recordingData.matchDate}
      />
    </RecordingCard.Root>
  )
}
