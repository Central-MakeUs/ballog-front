import { POST_MESSAGE_EVENT, type LogoutResponsePayload } from '@ballog/bridge'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'

import { authPost, authDelete } from '@/entities/auth/api'
import { useFlow } from '@/app/routes/stackflow'
import { useBridge } from '@/shared/hooks/bridge/useBridge'
import { useBridgeEvent } from '@/shared/hooks/bridge/useBridgeEvent'
import { useAccessTokenStorage } from '@/shared/hooks/auth/useAccessTokenStorage'
import { authQueries } from '@/entities/auth/api'

export const useAuthAction = () => {
  const { replace } = useFlow()
  const { bridge } = useBridge()
  const { clearSessionStorage } = useAccessTokenStorage()
  const queryClient = useQueryClient()
  const userQueryOptions = authQueries.getUser()

  const clearSession = () => {
    clearSessionStorage()
    queryClient.removeQueries({ queryKey: userQueryOptions.queryKey })
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
