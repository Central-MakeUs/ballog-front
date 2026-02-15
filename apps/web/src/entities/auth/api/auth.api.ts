import { api } from '@/shared/lib/ky'

import type {
  ChangeNicknameRequestDTO,
  ChangeTeamRequestDTO,
  LogoutResponseDTO,
  SignupRequestDTO,
  SignupResponseDTO,
  SocialLoginResponseDTO,
  UserResponseDTO,
  WithDrawResponseDTO,
} from '../model/auth.type'

export const authGet = {
  getNickname: async (nickname: string) => {
    const response = await api.get(`/auth/nickname/${nickname}`)
    return response.json()
  },
  getUser: async (): Promise<UserResponseDTO> => {
    const response = await api.get('mypage/user')
    return response.json()
  },
}

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
    if (localStorage.getItem('accessToken')) {
      localStorage.removeItem('accessToken')
    }
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
    const response = await api
      .post(`auth/login/apple?code=${authorizationCode}`)
      .json<SocialLoginResponseDTO>()

    return response
  },
  logout: async (): Promise<LogoutResponseDTO> => {
    const response = await api.post('auth/logout').json<LogoutResponseDTO>()
    return response
  },
}

export const authPatch = {
  patchUserInfo: async ({
    nickname,
    baseballTeam,
  }: ChangeNicknameRequestDTO) => {
    const response = await api
      .patch('mypage/user', { json: { baseballTeam, nickname } })
      .json<UserResponseDTO>()
    return response
  },
  patchUserTeam: async ({ baseballTeam }: ChangeTeamRequestDTO) => {
    const response = await api
      .patch('mypage/user', { json: { baseballTeam } })
      .json<UserResponseDTO>()
    return response
  },
}

export const authDelete = {
  deleteUser: async (): Promise<WithDrawResponseDTO> => {
    const response = await api.delete('auth/withdraw').json<WithDrawResponseDTO>()

    return response
  },
}
