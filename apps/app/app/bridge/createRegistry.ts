import { WebView } from 'react-native-webview'
import { BridgeMessageSchema, createAppBridge } from '@ballog/bridge'
import { createCameraHandler } from './cameraHandler'
import { createImageHandler } from './imageHandler'
import { createLoginHandler } from './loginHandler'

export const createHandlerRegistry = (
  webViewRef: React.RefObject<WebView | null>,
) => {
  const bridge = createAppBridge(webViewRef)

  const handlers = {
    ...createCameraHandler(),
    ...createImageHandler(bridge),
    ...createLoginHandler(bridge),
  }

  const registerHandlers = () => {
    Object.entries(handlers).forEach(([eventName, handler]) => {
      // key-value 타입 추론이 안되는 문제로 any 사용
      // bridge.on("ODNWLOAD_IMAGE",handlers.DOWNLOAD_IMAGE) 하면 타입 추론 잘함
      // 제네릭 타입 추론 문제라고 생각
      bridge.on(eventName as keyof BridgeMessageSchema, handler as any)
      // 아마 key-value쌍의 정확한 대응 관계를 typescript가 못찾아서 그런거 같음
    })
  }

  return {
    bridge,
    handlers,
    registerHandlers,
  }
}
