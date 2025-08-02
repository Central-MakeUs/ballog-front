import { WebView } from 'react-native-webview'
import { createAppBridge } from '@ballog/bridge'
import { createCameraHandler } from './createCameraHandler'
import { createImageHandler } from './imageHandler'
import { createEchoDebugHandler } from './createEchoDedugHandler'
import { createNotificationHandler } from './createNotificationHandler'

export const createHandlerRegistry = (
  webViewRef: React.RefObject<WebView | null>,
) => {
  const bridge = createAppBridge(webViewRef)

  const handlers = {
    ...createCameraHandler(),
    ...createImageHandler(bridge),
    ...createEchoDebugHandler(),
    ...createNotificationHandler(bridge),
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
