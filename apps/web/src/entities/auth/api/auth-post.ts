import { api } from '@/shared/lib/ky'

import type { SignupRequestDTO, SignupResponseDTO } from '../model/auth.type'

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
}
