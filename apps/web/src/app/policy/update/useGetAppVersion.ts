import { useEffect, useState, useCallback } from 'react'
import { POST_MESSAGE_EVENT } from '@ballog/bridge'

import { useBridge } from '@/shared/hooks/bridge/useBridge'
import { useBridgeEvent } from '@/shared/hooks/bridge/useBridgeEvent'

/**
 * 현재 앱 버전(localVersion)을 가져오고, 최신 앱 버전(latestVersion) 을 받아 비교 후
 * 업데이트 필요 여부 (needUpdate) 를 판단하는 훅
 * @returns  로컬 앱 버전
 */
export const useGetAppVersion = () => {
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

  return { localVersion }
}
