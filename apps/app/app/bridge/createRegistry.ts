import { WebView } from 'react-native-webview'
import { createAppBridge } from '@ballog/bridge'
import { createCameraHandler } from './cameraHandler'
import { createImageHandler } from './imageHandler'

export const createHandlerRegistry = (
  webViewRef: React.RefObject<WebView | null>,
) => {
  const bridge = createAppBridge(webViewRef)

  const handlers = {
    ...createCameraHandler(),
    ...createImageHandler(bridge),
  }

  const registerHandlers = () => {
    Object.entries(handlers).forEach(([eventName, handler]) => {
      bridge.on(eventName, handler)
    })
  }

  return {
    bridge,
    handlers,
    registerHandlers,
  }
}
