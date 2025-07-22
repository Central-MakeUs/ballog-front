import React, { createContext, useContext, useEffect, useState } from 'react'

import { authGet } from '@/entities/auth/api'
import type { MeType } from '@/entities/auth/model/auth.type'

interface MeContextType {
  me: MeType | null
  setMe: (user: MeType | null) => void
  refetchUser: () => Promise<void>
}

const MeContext = createContext<MeContextType | undefined>(undefined)

export const MeProvider = ({ children }: { children: React.ReactNode }) => {
  const [me, setMe] = useState<MeType | null>(null)

  const refetchUser = async () => {
    try {
      const data = await authGet.me()
      setMe(data.data)
    } catch (error) {
      setMe(null)
      throw error
    }
  }

  useEffect(() => {
    refetchUser()
  }, [])

  return (
    <MeContext.Provider value={{ me, setMe, refetchUser }}>
      {children}
    </MeContext.Provider>
  )
}

export const useMeContext = () => {
  const context = useContext(MeContext)
  if (!context)
    throw new Error('useUserContext must be used within UserProvider')
  return context
}
