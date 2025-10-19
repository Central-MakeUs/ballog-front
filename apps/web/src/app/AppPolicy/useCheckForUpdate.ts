import { useEffect, useState, useCallback } from 'react'
import { POST_MESSAGE_EVENT } from '@ballog/bridge'
import semver from 'semver'

import { useBridge } from '@/shared/hooks/bridge/useBridge'
import { useBridgeEvent } from '@/shared/hooks/bridge/useBridgeEvent'

export const useCheckForUpdate = (latestVersion: string) => {
  const { bridge } = useBridge()
  const [localVersion, setLocalVersion] = useState<string | null>(null)

  const getMyAppVersion = useCallback(() => {
    if (!bridge.isRNEnvironment()) return
    bridge.send(POST_MESSAGE_EVENT.GET_MY_APP_VERSION, { version: '' })
  }, [bridge])

  const storeAppVersion = ({ version }: { version: string }) => {
    setLocalVersion(version)
    localStorage.setItem('APP_VERSION', version)
  }

  useEffect(() => {
    getMyAppVersion()
  }, [getMyAppVersion])

  useBridgeEvent(POST_MESSAGE_EVENT.GET_MY_APP_VERSION, storeAppVersion)

  const needUpdate =
    localVersion && latestVersion
      ? semver.lt(localVersion, latestVersion)
      : false

  return { needUpdate }
}
