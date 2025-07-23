import { useEffect, useState } from 'react'
import { createWebBridge, POST_MESSAGE_EVENT } from '@ballog/bridge'

import type { Image } from '@/entities/record/model/record.type'

interface UseImagePickerProps {
  initialImages?: Image[]
}

export const useImagePicker = ({
  initialImages = [],
}: UseImagePickerProps = {}) => {
  const [images, setImages] = useState<Image[]>(initialImages)
  const bridge = createWebBridge()

  const requestImagePick = () => {
    if (bridge.isRNEnvironment()) {
      // RN 환경에서 이미지 선택 요청
      bridge.send(POST_MESSAGE_EVENT.PICK_IMAGE, { message: 'pick_image' })
    }
  }

  const addImage = (newImage: Image) => {
    setImages((prevImages) => [...prevImages, newImage])
  }

  // RN에서 전송된 이미지 데이터 수신
  useEffect(() => {
    if (!bridge.isRNEnvironment()) return

    const unsubscribe = bridge.addEventListener('IMAGE_SELECTED', (data) => {
      if (
        data &&
        'imageData' in data &&
        data.imageData.uri &&
        data.imageData.createdAt
      ) {
        const newImage: Image = {
          imageUrl: data.imageData.uri,
          createdAt: data.imageData.createdAt,
        }

        addImage(newImage)
      }
    })

    return unsubscribe
  }, [bridge])

  // initialImages가 변경될 때 상태 업데이트
  useEffect(() => {
    setImages(initialImages)
  }, [initialImages])

  return {
    images,
    addImage,
    requestImagePick,
    setImages,
  }
}
