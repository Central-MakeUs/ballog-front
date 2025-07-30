import { useEffect } from 'react'
import type { ImageData } from '@ballog/bridge/types'

interface WebMessagePayload {
  eventName?: string
  payload?: ImageData
}

type MessageHandler = (image: ImageData) => void

export const useWebViewBridgeListener = (onImageReceived: MessageHandler) => {
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const raw = typeof event.data === 'string' ? event.data : '{}'

      const parsed = JSON.parse(raw) as WebMessagePayload
      if (
        parsed.eventName === 'CAMERA_SHOT' &&
        parsed.payload &&
        parsed.payload.base64 &&
        parsed.payload.fileName &&
        parsed.payload.uri &&
        parsed.payload.createdAt
      ) {
        onImageReceived(parsed.payload)
      }
    }

    window.addEventListener('message', listener)
    return () => window.removeEventListener('message', listener)
  }, [onImageReceived])
}
