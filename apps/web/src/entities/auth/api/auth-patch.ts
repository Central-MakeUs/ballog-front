import { api } from '@/shared/lib/ky'
import type {
  UserResponseDTO,
  SignupRequestDTO,
} from '@/entities/auth/model/auth.type'

export const authPatch = {
  patchUserInfo: async ({ nickname, baseballTeam }: SignupRequestDTO) => {
    return api
      .patch('mypage/user', { json: { baseballTeam, nickname } })
      .json<UserResponseDTO>()
  },
}
