import { api } from '@/shared/lib/ky'

import type {
  SignupRequestDTO,
  SignupResponseDTO,
  LogoutResponseDTO,
  SocialLoginResponseDTO,
} from '../model/auth.type'

export const authPost = {
  signup: async ({
    baseballTeam,
    nickname,
    termAgree,
  }: SignupRequestDTO): Promise<SignupResponseDTO> => {
    const response = await api
      .post('auth/signup', { json: { baseballTeam, nickname, termAgree } })
      .json<SignupResponseDTO>()
    return response
  },
  kakaoLogin: async ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string
    refreshToken: string
  }): Promise<SocialLoginResponseDTO> => {
    const response = await api
      .post('auth/login/kakao', {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'X-Refresh-Token': refreshToken,
        },
      })
      .json<SocialLoginResponseDTO>()
    return response
  },

  appleLogin: async ({
    authorizationCode,
  }: {
    authorizationCode: string
  }): Promise<SocialLoginResponseDTO> => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        eventName: 'SEND_IMAGE_ECHO',
        payload: '시작 전',
      }),
    )
    try {
      const response = await api
        .post(`auth/login/apple?code=${authorizationCode}`)
        .json<SocialLoginResponseDTO>()

      return response
    } catch (error) {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          eventName: 'SEND_IMAGE_ECHO',
          payload: "에러임",
        }),
      )
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          eventName: 'SEND_IMAGE_ECHO',
          payload: error,
        }),
      )
    }
  },
  logout: async (): Promise<LogoutResponseDTO> => {
    const response = await api.post('auth/logout').json<LogoutResponseDTO>()
    return response
  },
}
