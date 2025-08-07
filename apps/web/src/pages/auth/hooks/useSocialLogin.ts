import { POST_MESSAGE_EVENT, type LoginResponsePayload } from '@ballog/bridge'
import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'

import { useBridge } from '@/shared/hooks/bridge/useBridge'
import { useBridgeEvent } from '@/shared/hooks/bridge/useBridgeEvent'
import { authPost } from '@/entities/auth/api/auth-post'
import type { SocialLoginResponseDTO } from '@/entities/auth/model/auth.type'
import type { ExtendedKyHttpError } from '@/types/api/common'

const getMutationFn = (social: 'kakao' | 'apple') => {
  switch (social) {
    case 'kakao':
      return authPost.kakaoLogin
    case 'apple':
      return authPost.appleLogin
  }
}

/**
 * 소셜 로그인 훅
 * @param object social, onSuccess, onError
 * @returns handleLogin, isPending
 */
export const useSocialLogin = ({
  social,
  onSignupSuccess,
  onLoginSuccess,
  onError,
}: {
  social: 'kakao' | 'apple'
  onSignupSuccess: (response: SocialLoginResponseDTO) => void
  onLoginSuccess: (response: SocialLoginResponseDTO) => void
  onError: (error: Error | ExtendedKyHttpError) => void
}) => {
  const { send, isRNEnvironment } = useBridge()
  const { mutate: socialLogin, isPending } = useMutation<
    SocialLoginResponseDTO,
    ExtendedKyHttpError,
    { accessToken: string; refreshToken: string }
  >({
    mutationFn: getMutationFn(social),
    onSuccess: (response) => {
      if (response.success.includes('회원가입')) {
        onSignupSuccess(response)
      } else {
        onLoginSuccess(response)
      }
    },
    onError: (error) => {
      onError(error)
    },
  })

  const handleLogin = () => {
    if (isRNEnvironment) {
      switch (social) {
        case 'kakao':
          send(POST_MESSAGE_EVENT.LOGIN_KAKAO, { social })
          break
        case 'apple':
          send(POST_MESSAGE_EVENT.LOGIN_APPLE, { social })
          break
      }
    } else {
      onSignupSuccess({
        status: 200,
        message: '로그인 성공',
        success: '로그인 성공',
        data: {
          accessToken: '_example_access_token_',
          refreshToken: '_example_refresh_token_',
        },
      })
    }
  }

  const handleKakaoLoginResponse = useCallback(
    (payload: LoginResponsePayload) => {
      if (payload.status === 'success') {
        const { accessToken, refreshToken } = payload
        socialLogin({
          accessToken,
          refreshToken,
        })
      } else {
        onError(new Error('로그인에 실패했습니다.'))
      }
    },
    [socialLogin, onError],
  )

  const handleAppleLoginResponse = useCallback(
    (payload: LoginResponsePayload) => {
      if (payload.status === 'success') {
        const { accessToken, refreshToken } = payload
        socialLogin({
          accessToken,
          refreshToken,
        })
      } else {
        onError(new Error('로그인에 실패했습니다.'))
      }
    },
    [onError, socialLogin],
  )

  useBridgeEvent(
    POST_MESSAGE_EVENT.LOGIN_RESPONSE_KAKAO,
    handleKakaoLoginResponse,
  )
  // app에 카카오 로그인 로직이 등록되어있음. 수정필요
  useBridgeEvent(
    POST_MESSAGE_EVENT.LOGIN_RESPONSE_APPLE,
    handleAppleLoginResponse,
  )

  return { handleLogin, isPending }
}
