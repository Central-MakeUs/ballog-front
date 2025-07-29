import type {
  PostMessageEvent,
  PostMessageSchemaObject,
  WebMessageEvent,
  BridgeMessageSchema,
} from '../types'

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void
    }
  }
  interface Document {
    addEventListener(
      type: 'message',
      listener: (this: Document, ev: MessageEvent) => void,
      options?: boolean | AddEventListenerOptions,
    ): void
  }
}

// 이벤트 리스너들을 저장할 Map
// eventName, callback이 key, value로 저장
// 이 중에서 addEventListener에서 추가한 이벤트 리스너만 호출
// 전역 상태로 두어 bridge instance들이 공유하도록 함
const globalEventListeners = new Map<
  string,
  (
    event: PostMessageSchemaObject[keyof PostMessageSchemaObject]['payload'],
  ) => void
>()

// RN 환경 여부를 확인하는 함수
const isRNEnvironment = (): boolean => {
  return !!window.ReactNativeWebView
}

// data를 WebMessageEvent 타입으로 변환
const handleMessage = (data: string): WebMessageEvent | null => {
  try {
    const message: WebMessageEvent = JSON.parse(data)
    return message
  } catch (error) {
    console.error('Web Bridge message parsing error:', error)
    return null
  }
}

// 전역 메시지 핸들러
const globalMessageHandler = (event: MessageEvent) => {
  const message = handleMessage(event.data)
  if (message) {
    // 이벤트 이름에 해당하는 핸들러 함수 호출
    const listeners = globalEventListeners.get(message.eventName)
    if (listeners) {
      // 있으면 핸들러 함수 호출
      listeners(message.payload)
    }
  }
}
/**
 * 웹 브리지 추상화 계층
 * @returns 웹 브리지 함수들
 * @example
 * const bridge = createWebBridge()
 * bridge.send('test-message', { message: 'Hello from Web' })
 * // 여기서 data는 payload에 담긴 데이터
 * bridge.addEventListener('test-message', (data) => {
 *   alert(data)
 * })
 *
 * return {
 *   send: (eventName: string, payload: T[keyof T]['payload']) => void,
 *   addEventListener: (eventName: string, callback: (data: T[keyof T]['payload']) => void) => void,
 *   isRNEnvironment: () => boolean,
 * }
 */
export const createWebBridge = <
  T extends PostMessageSchemaObject = BridgeMessageSchema,
>() => {
  const isReady = isRNEnvironment()

  // 전역 이벤트 리스너 등록 (한 번만)
  if (isReady) {
    window.addEventListener('message', globalMessageHandler)
    document.addEventListener('message', globalMessageHandler as EventListener)
  }

  // RN으로 메시지 전송하는 함수
  const send = <K extends keyof T>(
    eventName: K,
    payload: T[K]['payload'],
  ): void => {
    if (!isReady) {
      console.warn('WebBridge: RN environment not detected')
      return
    }

    const message: PostMessageEvent<T> = {
      eventName,
      payload,
    }

    window.ReactNativeWebView!.postMessage(JSON.stringify(message))
  }

  // 이벤트 리스너 추가
  // 추가 시, eventName에 해당하는 callback 함수 호출
  const addEventListener = <K extends keyof T>(
    eventName: K,
    callback: (payload: T[K]['payload']) => void,
  ) => {
    const eventNameStr = String(eventName)

    if (!globalEventListeners.has(eventNameStr)) {
      globalEventListeners.set(eventNameStr, callback)
    }

    // 구독 해제 함수 반환
    return () => {
      const currentListeners = globalEventListeners.get(eventNameStr)
      if (currentListeners) {
        globalEventListeners.delete(eventNameStr)
      }
    }
  }

  const destroy = () => {
    globalEventListeners.clear()
    window.removeEventListener('message', globalMessageHandler)
    document.removeEventListener(
      'message',
      globalMessageHandler as EventListener,
    )
  }

  return {
    send,
    isRNEnvironment: () => isReady,
    addEventListener,
    destroy,
  }
}
