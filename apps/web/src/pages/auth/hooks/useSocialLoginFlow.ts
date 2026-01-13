import { toast } from 'sonner'

import type { ExtendedKyHttpError } from '@/types/api/common'
import { useAccessTokenStorage } from '@/shared/hooks/auth/useAccessTokenStorage'

import { useSocialLogin } from './useSocialLogin'
import { useSocialNavigation } from './useSocialNavigation'

/**
 * 토스트 알림이 포함된 소셜 로그인 훅
 * 에러 처리와 네비게이션을 자동으로 처리
 */
export const useSocialLoginFlow = (social: 'kakao' | 'apple') => {
  const { setAccessTokenInStorage } = useAccessTokenStorage()
  const { handleSignupSuccess, handleLoginSuccess } = useSocialNavigation()

  const { handleLogin, isPending } = useSocialLogin({
    social,
    onSignupSuccess: (response) => {
      setAccessTokenInStorage(response.data.accessToken)
      handleSignupSuccess()
    },
    onLoginSuccess: (response) => {
      setAccessTokenInStorage(response.data.accessToken)
      handleLoginSuccess()
    },
    onError: (error: Error | ExtendedKyHttpError) => {
      if (error && typeof error === 'object' && 'errorData' in error) {
        toast.error(error.errorData?.error || '로그인에 실패했습니다.')
        return
      }

      if (error instanceof Error) {
        toast.error(error.message || '로그인에 실패했습니다.')
        return
      }

      toast.error('알 수 없는 오류가 발생했습니다.')
    },
  })

  return { handleLogin, isPending }
}
