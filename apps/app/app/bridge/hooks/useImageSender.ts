import { useEffect } from 'react'
import { POST_MESSAGE_EVENT } from '@ballog/bridge'
import type { AppBridge } from '@ballog/bridge'
import type { ImageData } from '@ballog/bridge/types'

export const useImageSender = (
  bridge: AppBridge,
  imageData: ImageData | null,
  clearImageData: () => void,
) => {
  useEffect(() => {
    if (!imageData) return

    const timeout = setTimeout(() => {
      bridge.send(POST_MESSAGE_EVENT.CAMERA_SHOT, {
        uri: imageData.uri, // 여기는 여전히 base64 값만 전달
        base64: imageData.base64,
        fileName: imageData.fileName,
        createdAt: imageData.createdAt,
      })
      clearImageData()
    }, 1500)

    return () => clearTimeout(timeout)
  }, [imageData])
}
