import { useEffect, type DependencyList } from 'react'
import type { BridgeMessageSchema } from '@ballog/bridge'

import { useBridge } from './useBridge'

export const useBridgeEvent = <T extends keyof BridgeMessageSchema>(
  eventType: T,
  callback: (payload: BridgeMessageSchema[T]['payload']) => void,
  deps: DependencyList = [],
) => {
  const { bridge } = useBridge()

  useEffect(() => {
    const unsubscribe = bridge.addEventListener(eventType, callback)
    return () => unsubscribe()
  }, [bridge, eventType, ...deps])
}
