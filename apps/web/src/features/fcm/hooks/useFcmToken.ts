import { useEffect } from 'react'
import { POST_MESSAGE_EVENT } from '@ballog/bridge'
import { toast } from 'sonner'

import { useBridge } from '@/shared/hooks/bridge/useBridge'
import { useBridgeEvent } from '@/shared/hooks/bridge/useBridgeEvent'
import { fcmPost } from '@/entities/fcm/api/fcm-post'

/**
 * import type FcmTokenPayload 하니까
 * Unsafe member access .token on an `error` typed value. 뜨는 이슈 (원인 모름)
 *  */
interface FcmTokenPayload {
  token: string
}

export const useFcmToken = () => {
  const { bridge } = useBridge()

  useEffect(() => {
    if (!bridge.isRNEnvironment()) return

    bridge.send(POST_MESSAGE_EVENT.GET_MY_FCM_TOKEN, { token: '' })
  }, [bridge])

  useBridgeEvent(
    POST_MESSAGE_EVENT.GET_MY_FCM_TOKEN,
    async (payload: FcmTokenPayload) => {
      const prevToken = localStorage.getItem('fcmToken')

      if (payload.token && payload.token !== prevToken) {
        try {
          await fcmPost.postFcmToken(payload.token)
          localStorage.setItem('fcmToken', payload.token)
          // 필요하면 toast.success('FCM 토큰 등록 완료') 추가
        } catch {
          toast.error('토큰 전송 실패')
        }
      }

      // 디버깅용 메시지 echo
      // window.ReactNativeWebView?.postMessage(
      //   JSON.stringify({
      //     eventName: 'SEND_IMAGE_ECHO',
      //     payload: payload.token,
      //   }),
      // )
    },
  )
}
