import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { authGet } from '@/entities/auth/api'
import type { UserType } from '@/entities/auth/model/auth.type'
import { useAccessTokenStorage } from '@/shared/hooks/auth/useAccessTokenStorage'

interface SessionContextType {
  user: UserType | null
  setUser: (user: UserType | null) => void
  refetchUser: () => Promise<void>
  accessToken: string
  setAccessTokenInStorage: (accessToken: string) => void
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
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

export const useSessionContext = () => {
  const context = useContext(SessionContext)
  if (!context)
    throw new Error('useSessionContext must be used within SessionProvider')
  return context
}
