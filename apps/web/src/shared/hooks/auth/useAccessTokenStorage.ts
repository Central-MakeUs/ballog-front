import { useEffect, useState } from 'react'

// 로컬스토리지에 accessToken을 관리해 유저 상태를 관리하는 훅
export const useAccessTokenStorage = () => {
  const [accessToken, setAccessToken] = useState<string>(
    localStorage.getItem('accessToken') ?? '',
  )

  const setAccessTokenInStorage = (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken)
    setAccessToken(accessToken)
  }

  const clearSessionStorage = () => {
    localStorage.removeItem('accessToken')
    setAccessToken('')
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      setAccessToken(accessToken)
    }
  }, [])

  return {
    accessToken,
    setAccessTokenInStorage,
    clearSessionStorage,
  }
}
