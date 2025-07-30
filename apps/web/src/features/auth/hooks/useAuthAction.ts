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

    await authPost.logout(token)
    clearSession()
    replace('Login', {})
  }

  const deleteUser = async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) return

    await authDelete.deleteUser(token)
    clearSession()
    replace('Login', {})
  }

  return {
    logout,
    deleteUser,
  }
}
