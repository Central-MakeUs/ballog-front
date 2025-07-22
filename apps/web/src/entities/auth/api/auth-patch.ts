import { api } from '@/shared/lib/ky'
import type {
  MeResponseDTO,
  SignupRequestDTO,
} from '@/entities/auth/model/auth.type'

export const authPatch = {
  updateUserInfo: async ({ nickname, baseballTeam }: SignupRequestDTO) => {
    return api
      .patch('mypage/user', { json: { baseballTeam, nickname } })
      .json<MeResponseDTO>()
  },
}
