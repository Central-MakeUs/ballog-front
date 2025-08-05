import {
  POST_MESSAGE_EVENT,
  type LoginResponsePayload,
  type AppleLoginResponsePayload,
} from '@ballog/bridge'
import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'

import { useBridge } from '@/shared/hooks/bridge/useBridge'
import { useBridgeEvent } from '@/shared/hooks/bridge/useBridgeEvent'
import { authPost } from '@/entities/auth/api/auth-post'
import type { SocialLoginResponseDTO } from '@/entities/auth/model/auth.type'
import type { ExtendedKyHttpError } from '@/types/api/common'

type SocialLoginVariables =
  | { accessToken: string; refreshToken: string }
  | { authorizationCode: string }

/**
 * 소셜 로그인 훅
 * @param object social, onSuccess, onError
 * @returns handleLogin, isPending
 */
export const useSocialLogin = ({
  social,
  onSuccess,
  onError,
}: {
  social: 'kakao' | 'apple'
  onSuccess: () => void
  onError: (error: Error | ExtendedKyHttpError) => void
}) => {
  const { send, isRNEnvironment } = useBridge()
  const { mutate: socialLogin, isPending } = useMutation<
    SocialLoginResponseDTO,
    ExtendedKyHttpError,
    SocialLoginVariables
  >({
    mutationFn: (variables) => {
      if ('authorizationCode' in variables) {
        return authPost.appleLogin(variables)
      } else {
        return authPost.kakaoLogin(variables)
      }
    },
    onSuccess: () => {
      onSuccess()
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
      onSuccess()
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
    (payload: AppleLoginResponsePayload) => {
      if (payload.status === 'success') {
        const { authorizationCode } = payload

        socialLogin({ authorizationCode })
      } else {
        onError(new Error('로그인에 실패했습니다.'))
      }
    },
    [socialLogin, onError],
  )

  useBridgeEvent(
    POST_MESSAGE_EVENT.LOGIN_RESPONSE_KAKAO,
    handleKakaoLoginResponse,
  )

  useBridgeEvent(
    POST_MESSAGE_EVENT.LOGIN_RESPONSE_APPLE,
    handleAppleLoginResponse,
  )

  return { handleLogin, isPending }
}
