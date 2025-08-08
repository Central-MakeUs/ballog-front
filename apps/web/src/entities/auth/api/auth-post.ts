import { api } from '@/shared/lib/ky'

import type {
  SignupRequestDTO,
  SignupResponseDTO,
  LogoutResponseDTO,
  SocialLoginResponseDTO,
} from '../model/auth.type'

const setAccessToken = (response: SocialLoginResponseDTO) => {
  const { accessToken: serverAccessToken } = response.data
  localStorage.setItem('accessToken', serverAccessToken)
}

export const authPost = {
  signup: async ({
    baseballTeam,
    nickname,
  }: SignupRequestDTO): Promise<SignupResponseDTO> => {
    const response = await api
      .post('auth/signup', { json: { baseballTeam, nickname } })
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
    setAccessToken(response)
    return response
  },

  appleLogin: async ({
    authorizationCode,
  }: {
    authorizationCode: string
  }): Promise<SocialLoginResponseDTO> => {
    try {
      const response = await api
        .post(`auth/login/apple?code=${authorizationCode}`)
        .json<SocialLoginResponseDTO>()
      setAccessToken(response)
      return response
    } catch (error) {
      // 에러 콘솔 출력
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          eventName: 'SEND_IMAGE_ECHO',
          payload: error,
        }),
      )
      throw error
    }
  },
  logout: async (): Promise<LogoutResponseDTO> => {
    const response = await api.post('auth/logout').json<LogoutResponseDTO>()
    return response
  },
}
