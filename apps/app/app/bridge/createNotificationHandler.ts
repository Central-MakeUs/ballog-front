import { getFcmToken, disableFcmToken } from '@/shared/lib/firebase/messaging'
import type { AppBridge } from '@ballog/bridge'
import { POST_MESSAGE_EVENT } from '@ballog/bridge'

export const createNotificationHandler = (bridge: AppBridge) => ({
  GET_MY_FCM_TOKEN: async () => {
    const token = await getFcmToken()
    if (token) {
      bridge.send(POST_MESSAGE_EVENT.GET_MY_FCM_TOKEN, { token })
    }
  },

  NOTIFICATION_OFF: async () => {
    try {
      await disableFcmToken()
      bridge.send(POST_MESSAGE_EVENT.NOTIFICATION_OFF, {
        message: '토큰삭제 완료',
      })
    } catch {
      bridge.send(POST_MESSAGE_EVENT.NOTIFICATION_OFF, {
        message: '토큰삭제 실패',
      })
    }
  },
})
