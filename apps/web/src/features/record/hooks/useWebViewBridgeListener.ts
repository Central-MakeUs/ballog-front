import { POST_MESSAGE_EVENT, type ImageData } from '@ballog/bridge'

import { useBridgeEvent } from '@/shared/hooks/bridge/useBridgeEvent'

type MessageHandler = (image: ImageData) => void | Promise<void>

export const useWebViewBridgeListener = (onImageReceived: MessageHandler) => {
  useBridgeEvent(POST_MESSAGE_EVENT.CAMERA_SHOT, (payload: ImageData) => {
    onImageReceived(payload)
  })
}
