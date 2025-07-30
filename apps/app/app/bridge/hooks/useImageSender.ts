import { useEffect } from 'react'
import { POST_MESSAGE_EVENT } from '@ballog/bridge'
import type { AppBridge } from '@ballog/bridge'

export const useImageSender = (
  bridge: AppBridge,
  base64Image: string | null,
  clearBase64Image: () => void,
) => {
  useEffect(() => {
    if (!base64Image) return

    const timeout = setTimeout(() => {
      bridge.send(POST_MESSAGE_EVENT.CAMERA_SHOT, {
        imageUrl: base64Image
      })
      clearBase64Image()
    }, 1500)

    return () => clearTimeout(timeout)
  }, [base64Image])
}
