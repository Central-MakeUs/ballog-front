import { toast } from 'sonner'
import { POST_MESSAGE_EVENT, type LogoutResponsePayload } from '@ballog/bridge'

import { authPost, authDelete } from '@/entities/auth/api'
import { useFlow } from '@/shared/lib/stackflow'
import { useSessionContext } from '@/shared/contexts/sessionContext'
import { useBridge } from '@/shared/hooks/bridge/useBridge'
import { useBridgeEvent } from '@/shared/hooks/bridge/useBridgeEvent'

export const useAuthAction = () => {
  const { replace } = useFlow()
  const { setUser } = useSessionContext()
  const { bridge } = useBridge()

  const clearSession = () => {
    localStorage.removeItem('accessToken')
    setUser(null)
  }

  // 로그아웃 브릿지 이벤트 핸들러
  useBridgeEvent(
    POST_MESSAGE_EVENT.LOGOUT_RESPONSE,
    (payload: LogoutResponsePayload) => {
      if (payload.status === 'success') {
        window.ReactNativeWebView?.postMessage(
          JSON.stringify({
            eventName: 'SEND_IMAGE_ECHO',
            payload: `성공 페이로드 상태 : ${payload.status}`,
          }),
        )
        clearSession()
        replace('Login', {})
      } else {
          window.ReactNativeWebView?.postMessage(
          JSON.stringify({
            eventName: 'SEND_IMAGE_ECHO',
            payload: `실패 페이로드 상태 : ${payload.status}`,
          }),
        )
        // toast.error('로그아웃에 실패했습니다.')
      }
    },
  )

  const logout = async () => {
    try {
      await authPost.logout()
      bridge.send(POST_MESSAGE_EVENT.LOGOUT, { message: 'logout' })
      clearSession()
      replace('Login', {})
    } catch {
      toast.error('로그아웃에 실패했습니다.')
    }
  }

  const deleteUser = async () => {
    try {
      await authDelete.deleteUser()
      bridge.send(POST_MESSAGE_EVENT.LOGOUT, { message: 'deleteUser' })
      clearSession()
      replace('Login', {})
    } catch {
      toast.error('탈퇴에 실패했습니다.')
    }
  }

  return {
    logout,
    deleteUser,
  }
}
