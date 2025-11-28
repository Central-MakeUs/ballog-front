import { useState, useEffect, type ReactNode } from 'react'
import { toast } from 'sonner'

import type { UserType } from '@/entities/auth/model/auth.type'
import { authGet } from '@/entities/auth/api'
import { useAccessTokenStorage } from '@/shared/hooks/auth/useAccessTokenStorage'
import { SessionContext } from '@/entities/auth/contexts/sessionContext'

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null)
  const { accessToken, setAccessTokenInStorage, clearSessionStorage } =
    useAccessTokenStorage()

  const refetchUser = async () => {
    try {
      const data = await authGet.getUser()
      setUser(data.data)
    } catch (error) {
      setUser(null)
      toast.error('로그인 정보가 만료되었습니다.')
      clearSessionStorage()
      throw error
    }
  }

  useEffect(() => {
    if (accessToken) {
      refetchUser()
    }
  }, [accessToken])

  return (
    <SessionContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessTokenInStorage,
        refetchUser,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}
