import { useEffect, useState } from 'react'

import type { UserType } from '@/entities/auth/model/auth.type'

export const useSessionStorage = () => {
  const [accessToken, setAccessToken] = useState<string>(
    localStorage.getItem('accessToken') ?? '',
  )
  const [user, setUser] = useState<UserType | null>(null)

  const setAccessTokenInStorage = (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken)
    setAccessToken(accessToken)
  }

  const clearSessionStorage = () => {
    localStorage.removeItem('accessToken')
    setAccessToken('')
    setUser(null)
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      setAccessToken(accessToken)
    }
  }, [])

  return {
    user,
    accessToken,
    setUser,
    setAccessTokenInStorage,
    clearSessionStorage,
  }
}
