import { useEffect, useState } from 'react'
import { createWebBridge, POST_MESSAGE_EVENT } from '@ballog/bridge'

import type { Image } from '@/entities/record/model/record.type'

interface UseImagePickerProps {
  initialImages?: Image[]
}

interface BridgeImageData {
  fileName: string
  uri: string
  base64: string
  createdAt: string
}

interface WebImageData {
  imageUrl: string
  createdAt: string
}

type ImageData = BridgeImageData | WebImageData

export const useImagePicker = ({
  initialImages = [],
}: UseImagePickerProps = {}) => {
  const [newImages, setNewImages] = useState<ImageData[]>([])
  const bridge = createWebBridge()

  const requestImagePick = () => {
    if (bridge.isRNEnvironment()) {
      // RN 환경에서 이미지 선택 요청
      bridge.send(POST_MESSAGE_EVENT.PICK_IMAGE, { message: 'pick_image' })
    }
  }

  const addImages = (newImages: ImageData[]) => {
    setNewImages(newImages)
  }

  // RN에서 전송된 이미지 데이터 수신
  useEffect(() => {
    if (!bridge.isRNEnvironment()) return

    const unsubscribe = bridge.addEventListener('IMAGE_SELECTED', (data) => {
      const newImages = data.imageDataList
        .filter(
          (imageData: BridgeImageData) =>
            imageData.base64 && imageData.createdAt && imageData.fileName,
        )
        .map((imageData: BridgeImageData) => ({
          fileName: imageData.fileName,
          uri: imageData.uri,
          base64: imageData.base64,
          createdAt: imageData.createdAt,
        }))

      if (newImages.length > 0) {
        addImages(newImages)
      }
    })

    return unsubscribe
  }, [bridge])

  // initialImages가 변경될 때 상태 업데이트
  useEffect(() => {
    setNewImages(initialImages)
  }, [initialImages])

  return {
    addImages,
    requestImagePick,
    newImages,
  }
}
