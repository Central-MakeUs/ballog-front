import { useEffect } from 'react'
import { createWebBridge, POST_MESSAGE_EVENT } from '@ballog/bridge'

import { useRecordingImages } from '@/features/record/hooks/useRecordImages'

import { Icon } from './Icon'

export const IconWrapper = () => {
  const bridge = createWebBridge()
  const { hasImage, addImage } = useRecordingImages()

  const handleClick = () => {
    bridge.send(POST_MESSAGE_EVENT.OPEN_CAMERA, { message: 'camera' })
  }

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      try {
        const raw = typeof event.data === 'string' ? event.data : '{}'

        const parsed = JSON.parse(raw) as { type?: string; payload?: string }

        if (parsed.type === 'image' && typeof parsed.payload === 'string') {
          // TODO : base64 이미지 데이터 업로드 후 반환 url addImage 에 담기
          // addImage(parsed.payload)
          window.ReactNativeWebView?.postMessage(
            JSON.stringify({
              from: 'web',
              type: 'echo_log',
              message: parsed.payload.slice(0, 50), // 앞 50글자 테스트용
            }),
          )
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('bridge message parse error:', error)
      }
    }

    window.addEventListener('message', listener)
    return () => window.removeEventListener('message', listener)
  }, [addImage])

  return <Icon state={hasImage ? 'active' : 'default'} onClick={handleClick} />
}
