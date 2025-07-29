import { createWebBridge } from '@ballog/bridge'

export const useBridge = () => {
  const bridge = createWebBridge()

  return {
    bridge,
    isRNEnvironment: bridge.isRNEnvironment(),
    send: bridge.send,
  }
}
