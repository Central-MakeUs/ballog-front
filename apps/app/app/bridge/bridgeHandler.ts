import { WebView } from 'react-native-webview'
import { useEffect } from 'react'
import { createHandlerRegistry } from './createRegistry'

export const useBridge = (webViewRef: React.RefObject<WebView | null>) => {
  const { bridge, registerHandlers } = createHandlerRegistry(webViewRef)

  useEffect(() => {
    registerHandlers()
  }, [registerHandlers])

  return {
    bridge,
  }
}
