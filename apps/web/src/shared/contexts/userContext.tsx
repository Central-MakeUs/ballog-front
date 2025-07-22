import { createContext, useContext, useEffect, useState } from 'react'
import { authGet } from '@/entities/auth/api'
import type { MyPageResponseDTO } from '@/entities/auth/model/auth.type'

interface UserContextType {
  user: MyPageResponseDTO | null
  setUser: (user: MyPageResponseDTO | null) => void
  refetchUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<MyPageResponseDTO | null>(null)

  const refetchUser = async () => {
    try {
      const data = await authGet.me()
      setUser(data.data)
    } catch (e) {
      console.error('유저 정보 가져오기 실패', e)
      setUser(null)
    }
  }

  useEffect(() => {
    refetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, refetchUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUserContext must be used within UserProvider')
  return context
}
