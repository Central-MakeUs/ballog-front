import { WebView } from 'react-native-webview'
import {
  PostMessageSchemaObject,
  PostMessageEvent,
  WebMessageEvent,
} from '../types'

// 웹에서 오는 메시지 처리
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleMessage = (event: any): WebMessageEvent | null => {
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
 *
 * return {
 *   send: (eventName: string, payload: any) => void,
 *   handleMessage: (event: any) => WebMessageEvent | null,
 * }
 */
export const createAppBridge = <
  T extends PostMessageSchemaObject = PostMessageSchemaObject,
>(
  webViewRef: React.RefObject<WebView>,
) => {
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

  return {
    send,
    handleMessage,
  }
}
