import { useEffect } from 'react'
import {
  createWebBridge,
  POST_MESSAGE_EVENT,
  type ImageData,
} from '@ballog/bridge'

type MessageHandler = (image: ImageData) => void | Promise<void>

export const useWebViewBridgeListener = (onImageReceived: MessageHandler) => {
  const bridge = createWebBridge()

  useEffect(() => {
    const unsubscribe = bridge.addEventListener(
      POST_MESSAGE_EVENT.CAMERA_SHOT,
      (payload: ImageData) => {
        if (
          payload &&
          payload.base64 &&
          payload.fileName &&
          payload.uri &&
          payload.createdAt
        ) {
          onImageReceived(payload)
        }
      },
    )

    return unsubscribe
  }, [onImageReceived])
}
