import { useEffect } from 'react'
import { POST_MESSAGE_EVENT } from '@ballog/bridge'
import { toast } from 'sonner'

import { useBridge } from '@/shared/hooks/bridge/useBridge'
import { useBridgeEvent } from '@/shared/hooks/bridge/useBridgeEvent'
import { fcmPost } from '@/entities/fcm/api'

interface FcmTokenPayload {
  token: string
}

export const useFcmToken = () => {
  const { bridge } = useBridge()
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    if (!bridge.isRNEnvironment()) return
    if (!accessToken) return
    bridge.send(POST_MESSAGE_EVENT.GET_MY_FCM_TOKEN, { token: '' })
  }, [bridge])

  useBridgeEvent(
    POST_MESSAGE_EVENT.GET_MY_FCM_TOKEN,
    async (payload: FcmTokenPayload) => {
      const prevToken = localStorage.getItem('fcmToken')
      
      if (payload.token && payload.token !== prevToken) {
        try {
          const response = await fcmPost.postFcmToken(payload.token)

          if (response.ok) {
            localStorage.setItem('fcmToken', payload.token)
          }
        } catch {
          toast.error('토큰 전송 실패')
        }
      }
    },
  )
}
