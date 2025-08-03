import { useEffect } from 'react'
import { POST_MESSAGE_EVENT } from '@ballog/bridge'

import { useBridge } from '@/shared/hooks/bridge/useBridge'
import { useBridgeEvent } from '@/shared/hooks/bridge/useBridgeEvent'

export const useFcmToken = () => {
  const { bridge } = useBridge()

  // 1. Web → RN: 토큰 요청
  useEffect(() => {
    if (!bridge.isRNEnvironment()) return

    bridge.send(POST_MESSAGE_EVENT.GET_MY_FCM_TOKEN, { token: '' })
  }, [])

  // 2. RN → Web: 토큰 응답 수신
  useBridgeEvent(POST_MESSAGE_EVENT.GET_MY_FCM_TOKEN, (payload) => {
    // 디버깅용 메시지 echo
    // window.ReactNativeWebView?.postMessage(
    //   JSON.stringify({
    //     eventName: 'SEND_IMAGE_ECHO',
    //     payload: payload.token,
    //   }),
    // )
  })
}
