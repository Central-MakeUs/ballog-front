import { createWebBridge, POST_MESSAGE_EVENT } from '@ballog/bridge'

import { useRecordingImages } from '@/features/record/hooks/useRecordImages'
import { useWebViewBridgeListener } from '@/features/record/hooks/useWebViewBirdgeListener'

import { Icon } from './Icon'

export const IconWrapper = () => {
  const bridge = createWebBridge()
  const { hasImage } = useRecordingImages()

  const handleClick = () => {
    bridge.send(POST_MESSAGE_EVENT.OPEN_CAMERA, { message: 'camera' })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useWebViewBridgeListener((base64) => {
    // TODO: 서버 업로드 후 URL로 addImage(base64) 할 예정
    // addImage(base64)
  })

  return <Icon state={hasImage ? 'active' : 'default'} onClick={handleClick} />
}
