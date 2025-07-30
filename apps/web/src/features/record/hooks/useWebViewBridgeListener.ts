// hooks/useWebViewBridgeListener.ts
import { useEffect } from 'react'

type MessageHandler = (payload: string) => void

export const useWebViewBridgeListener = (onImageReceived: MessageHandler) => {
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const raw = typeof event.data === 'string' ? event.data : '{}'
      const parsed = JSON.parse(raw) as { type?: string; payload?: string }

      if (parsed.type === 'image' && typeof parsed.payload === 'string') {
        onImageReceived(parsed.payload)

        // 디버깅용 echo
        window.ReactNativeWebView?.postMessage(
          JSON.stringify({
            from: 'web',
            type: 'SEND_IMAGE_ECHO',
            message: parsed.payload.slice(0, 50),
          }),
        )
      }
    }

    window.addEventListener('message', listener)
    return () => window.removeEventListener('message', listener)
  }, [onImageReceived])
}
