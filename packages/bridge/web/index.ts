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

// 브리지 인스턴스 타입 정의
type BridgeInstance<T extends PostMessageSchemaObject = BridgeMessageSchema> = {
  send: <K extends keyof T>(eventName: K, payload: T[K]['payload']) => void
  isRNEnvironment: () => boolean
  addEventListener: <K extends keyof T>(
    eventName: K,
    callback: (payload: T[K]['payload']) => void,
  ) => () => void
  destroy: () => void
}

/**
 * 웹 브리지 싱글톤 인스턴스 생성/반환
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
export const createWebBridge = (() => {
  // 싱글톤 인스턴스와 상태들을 클로저 내부에서 관리
  let bridgeInstance: BridgeInstance | null = null // any → 제대로 된 타입
  let isGlobalListenerRegistered = false

  // 이벤트 리스너들을 저장할 Map
  const globalEventListeners = new Map<
    string,
    ((
      event: PostMessageSchemaObject[keyof PostMessageSchemaObject]['payload'],
    ) => void)[]
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
        listeners.forEach((listener) => listener(message.payload))
      }
    }
  }

  // 내부 브리지 생성 함수
  const createBridgeInstance = <
    T extends PostMessageSchemaObject = BridgeMessageSchema,
  >() => {
    const isReady = isRNEnvironment()

    // 전역 이벤트 리스너 등록 (한 번만)
    if (isReady && !isGlobalListenerRegistered) {
      window.addEventListener('message', globalMessageHandler)
      document.addEventListener('message', globalMessageHandler)
      isGlobalListenerRegistered = true
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
    const addEventListener = <K extends keyof T>(
      eventName: K,
      callback: (payload: T[K]['payload']) => void,
    ) => {
      const eventNameStr = String(eventName)

      if (!globalEventListeners.has(eventNameStr)) {
        globalEventListeners.set(eventNameStr, [callback])
      }
      // TODO: 여러 callback 함수 추가 시 처리 필요

      // 구독 해제 함수 반환
      return () => {
        const currentListeners = globalEventListeners.get(eventNameStr)
        if (currentListeners) {
          const index = currentListeners.indexOf(callback)
          if (index > -1) {
            currentListeners.splice(index, 1)
          }

          // 배열이 비어있으면 이벤트 자체를 삭제
          if (currentListeners.length === 0) {
            globalEventListeners.delete(eventNameStr)
          }
        }
      }
    }

    const destroy = () => {
      globalEventListeners.clear()
      if (isGlobalListenerRegistered) {
        window.removeEventListener('message', globalMessageHandler)
        document.removeEventListener(
          'message',
          globalMessageHandler as EventListener,
        )
        isGlobalListenerRegistered = false
      }
      bridgeInstance = null
    }

    return {
      send,
      isRNEnvironment: () => isReady,
      addEventListener,
      destroy,
    }
  }

  // 실제 export되는 함수
  return <
    T extends PostMessageSchemaObject = BridgeMessageSchema,
  >(): BridgeInstance<T> => {
    // 이미 인스턴스가 존재하면 기존 인스턴스 반환
    if (bridgeInstance) {
      return bridgeInstance as unknown as BridgeInstance<T>
    }

    // 새 인스턴스 생성 및 저장
    bridgeInstance = createBridgeInstance<T>()
    return bridgeInstance as unknown as BridgeInstance<T>
  }
})()
