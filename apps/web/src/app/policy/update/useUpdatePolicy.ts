import { useEffect } from 'react'
import { POST_MESSAGE_EVENT } from '@ballog/bridge'

import { useBridge } from '@/shared/hooks/bridge/useBridge'

import { useCheckForUpdate } from './useCheckForUpdate'
import { useUpdateModal } from './useUpdateModal'

// TODO : 버전 api 연동
export const useUpdatePolicy = () => {
  const { openUpdateModal } = useUpdateModal()
  const { bridge } = useBridge()

  const { needUpdate, localVersion } = useCheckForUpdate('1.0.2')
  bridge.send(POST_MESSAGE_EVENT.SEND_IMAGE_ECHO as any, {
    웹에서받은version: localVersion,
  })

  useEffect(() => {
    if (!needUpdate) return
    const timer = setTimeout(() => {
      openUpdateModal({ type: 'optional' })
    }, 3000)
    return () => clearTimeout(timer)
  }, [needUpdate])
}
