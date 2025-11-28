import { createContext } from 'react'

import type { UserType } from '../model/auth.type'

interface SessionContextType {
  user: UserType | null
  setUser: (user: UserType | null) => void
  refetchUser: () => Promise<void>
  accessToken: string
  setAccessTokenInStorage: (accessToken: string) => void
}

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined,
)
