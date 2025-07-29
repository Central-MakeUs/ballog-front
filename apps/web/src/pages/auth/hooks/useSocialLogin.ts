import { POST_MESSAGE_EVENT } from '@ballog/bridge'
import { useMutation } from '@tanstack/react-query'

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
    { accessToken: string; refreshToken: string }
  >({
    mutationFn: getMutationFn(social),
    onSuccess: () => {
      onSuccess()
    },
    onError: (error) => {
      onError(error)
    },
  })

  const handleLogin = () => {
    if (isRNEnvironment) {
      send(POST_MESSAGE_EVENT.LOGIN, { social })
    } else {
      onSuccess()
    }
  }

  useBridgeEvent(POST_MESSAGE_EVENT.LOGIN_RESPONSE, (payload) => {
    if (payload.status === 'success') {
      const { accessToken, refreshToken } = payload
      socialLogin({
        accessToken: accessToken as string,
        refreshToken: refreshToken as string,
      })
    } else {
      onError(new Error('로그인에 실패했습니다.'))
    }
  })

  return { handleLogin, isPending }
}
