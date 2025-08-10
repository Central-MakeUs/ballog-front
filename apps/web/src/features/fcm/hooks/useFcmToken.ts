import { useEffect } from 'react'
import { POST_MESSAGE_EVENT } from '@ballog/bridge'
import { toast } from 'sonner'

import { useBridge } from '@/shared/hooks/bridge/useBridge'
import { useBridgeEvent } from '@/shared/hooks/bridge/useBridgeEvent'
import { fcmPost } from '@/entities/fcm/api/fcm-post'

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
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          eventName: 'SEND_IMAGE_ECHO',
          payload: `기존 FCM 토큰 ${prevToken}`,
        }),
      )
      // localStorage.removeItem('fcmToken')
      if (payload.token && payload.token !== prevToken) {
        window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          eventName: 'SEND_IMAGE_ECHO',
          payload: `보냅니다`,
        }),
      )
        try {
          const response = await fcmPost.postFcmToken(payload.token)
          window.ReactNativeWebView?.postMessage(
            JSON.stringify({
              eventName: 'SEND_IMAGE_ECHO',
              payload: response,
            }),
          )
          // 필요하면 toast.success('FCM 토큰 등록 완료') 추가
        } catch {
          toast.error('토큰 전송 실패')
        }
      }
    },
  )
}
