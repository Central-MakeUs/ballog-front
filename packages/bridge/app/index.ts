import { WebView, type WebViewMessageEvent } from 'react-native-webview'
import type {
  PostMessageSchemaObject,
  PostMessageEvent,
  WebMessageEvent,
  AppBridge,
  BridgeMessageSchema,
} from '../types'

// 웹에서 오는 메시지 처리
const handleMessage = (event: WebViewMessageEvent): WebMessageEvent | null => {
  try {
    const message: WebMessageEvent = JSON.parse(event.nativeEvent.data)
    return message
  } catch (error) {
    console.error('RN Bridge message parsing error:', error)
    return null
  }
}

/**
 * RN 브리지 추상화 계층
 * @param webViewRef 웹뷰 참조
 * @returns 브리지 함수들
 * @example
 * const bridge = createAppBridge(webViewRef)
 * bridge.send('test-message', { message: 'Hello from RN' })
 * bridge.handleMessage(event)
 */
export const createAppBridge = <
  T extends PostMessageSchemaObject = BridgeMessageSchema,
>(
  webViewRef: React.RefObject<WebView | null>,
): AppBridge<T> => {
  // 이벤트 핸들러들을 저장할 Map
  const eventHandlers = new Map<
    string,
    (payload: T[keyof T]['payload']) => void
  >()

  // 웹으로 메시지 전송하는 함수
  // PostMessageEvent 타입으로 변환
  // 웹으로 메시지 전송
  const send = <K extends keyof T>(
    eventName: K,
    payload: T[K]['payload'],
  ): void => {
    const message: PostMessageEvent<T> = {
      eventName,
      payload,
    } as PostMessageEvent<T>

    webViewRef.current?.postMessage(JSON.stringify(message))
  }

  // 이벤트 핸들러 등록
  const on = (
    eventName: string,
    handler: (payload?: T[keyof T]['payload']) => void,
  ): void => {
    eventHandlers.set(eventName, handler)
  }

  // 메시지 처리 및 핸들러 실행
  const processMessage = (event: WebViewMessageEvent): void => {
    const message = handleMessage(event)
    if (!message) return

    const handler = eventHandlers.get(message.eventName)
    if (handler) {
      try {
        handler(message.payload)
      } catch (error) {
        console.error(
          `RN Bridge: Handler error for ${message.eventName}:`,
          error,
        )
      }
    } else {
      console.warn(`RN Bridge: No handler registered for ${message.eventName}`)
    }
  }

  return {
    send,
    on, // 이벤트 핸들러 등록
    processMessage,
    handleMessage,
  }
}
