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
  | { type: 'kakao'; accessToken: string; refreshToken: string }
  | { type: 'apple'; authorizationCode: string }

const getMutationFn = (variables: SocialLoginVariables) => {
  const social = variables.type
  // window.ReactNativeWebView?.postMessage(
  //   JSON.stringify({
  //     eventName: 'SEND_IMAGE_ECHO',
  //     payload: `이거 ${social}`,
  //   }),
  // )
  switch (social) {
    case 'kakao':
      return authPost.kakaoLogin(variables)
    case 'apple':
      return authPost.appleLogin(variables)
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
    SocialLoginVariables
  >({
    mutationFn: (variables) => getMutationFn(variables),
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
          window.ReactNativeWebView?.postMessage(
            JSON.stringify({
              eventName: 'SEND_IMAGE_ECHO',
              payload: social,
            }),
          )
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

        socialLogin({ type: 'kakao', accessToken, refreshToken })
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

        socialLogin({ type: 'apple', authorizationCode })
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
