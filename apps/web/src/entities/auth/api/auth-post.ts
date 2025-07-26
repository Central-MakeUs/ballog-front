import { api } from '@/shared/lib/ky'

import type {
  SignupRequestDTO,
  SignupResponseDTO,
  LogoutResponseDTO,
} from '../model/auth.type'

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
  logout: async (accessToken: string): Promise<LogoutResponseDTO> => {
    const response = await api
      .post('auth/logout', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .json<LogoutResponseDTO>()
    return response
  },
}
