import { createWebBridge } from '@ballog/bridge'

/**
 * 브릿지 훅
 * @returns bridge, isRNEnvironment, send
 */
export const useBridge = () => {
  const bridge = createWebBridge()

  return {
    bridge,
    isRNEnvironment: bridge.isRNEnvironment(),
    send: bridge.send,
  }
}
