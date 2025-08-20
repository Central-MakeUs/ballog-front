import { Toast } from '@/shared/lib/toast'
import type { ExtendedKyHttpError } from '@/types/api/common'
import type { SocialLoginResponseDTO } from '@/entities/auth/model/auth.type'

import { useSocialLogin } from './useSocialLogin'
import { useSocialNavigation } from './useSocialNavigation'

const setAccessToken = (response: SocialLoginResponseDTO) => {
  const { accessToken: serverAccessToken } = response.data
  localStorage.setItem('accessToken', serverAccessToken)
}

/**
 * 토스트 알림이 포함된 소셜 로그인 훅
 * 에러 처리와 네비게이션을 자동으로 처리
 */
export const useSocialLoginFlow = (social: 'kakao' | 'apple') => {
  const { handleSignupSuccess, handleLoginSuccess } = useSocialNavigation()

  const { handleLogin, isPending } = useSocialLogin({
    social,
    onSignupSuccess: (response) => {
      setAccessToken(response)
      handleSignupSuccess()
    },
    onLoginSuccess: (response) => {
      setAccessToken(response)
      handleLoginSuccess()
    },
    onError: (error: Error | ExtendedKyHttpError) => {
      if (error && typeof error === 'object' && 'errorData' in error) {
        Toast.error(error.errorData?.error || '로그인에 실패했습니다.')
        return
      }

      if (error instanceof Error) {
        Toast.error(error.message || '로그인에 실패했습니다.')
        return
      }

      Toast.error('알 수 없는 오류가 발생했습니다.')
    },
  })

  return { handleLogin, isPending }
}
