import React, { createContext, useContext, useEffect, useState } from 'react'

import { authGet } from '@/entities/auth/api'
import type { UserType } from '@/entities/auth/model/auth.type'

interface SessionContextType {
  user: UserType | null
  setUser: (user: UserType | null) => void
  refetchUser: () => Promise<void>
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export const MeProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null)

  const refetchUser = async () => {
    try {
      const data = await authGet.getUser()
      setUser(data.data)
    } catch (error) {
      setUser(null)
      throw error
    }
  }

  useEffect(() => {
    refetchUser()
  }, [])

  return (
    <SessionContext.Provider value={{ user, setUser, refetchUser }}>
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
