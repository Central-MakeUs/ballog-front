import { toast } from 'sonner'

import { authPost, authDelete } from '@/entities/auth/api'
import { useFlow } from '@/shared/lib/stackflow'
import { useSessionContext } from '@/shared/contexts/sessionContext'

export const useAuthAction = () => {
  const { replace } = useFlow()
  const { setUser } = useSessionContext()

  const clearSession = () => {
    localStorage.removeItem('accessToken')
    setUser(null)
  }

  const logout = async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) return

    try {
      await authPost.logout(token)
      clearSession()
      replace('Login', {})
    } catch {
      toast.error('로그아웃에 실패했습니다.')
    }
  }

  const deleteUser = async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) return

    try {
      await authDelete.deleteUser(token)
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
