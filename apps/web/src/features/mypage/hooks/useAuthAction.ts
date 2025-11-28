import { POST_MESSAGE_EVENT, type LogoutResponsePayload } from '@ballog/bridge'
import { toast } from 'sonner'

import { authPost, authDelete } from '@/entities/auth/api'
import { useFlow } from '@/app/routes/stackflow'
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
        clearSession()
        replace('Login', {})
      } else {
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
