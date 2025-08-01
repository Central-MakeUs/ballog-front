import React, { createContext, useContext } from 'react'

import type { UserType } from '@/entities/auth/model/auth.type'

interface SessionContextType {
  user: UserType | null
  setUser: (user: UserType | null) => void
}

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined,
)

export const useSessionContext = () => {
  const context = useContext(SessionContext)
  if (!context)
    throw new Error('useSessionContext must be used within SessionProvider')
  return context
}

export const TestSessionProvider = ({
  children,
  value,
}: {
  children: React.ReactNode
  value: SessionContextType
}) => (
  <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
)
