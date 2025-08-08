import { api } from '@/shared/lib/ky'
import type {
  UserResponseDTO,
  ChangeNicknameRequestDTO,
} from '@/entities/auth/model/auth.type'

export const authPatch = {
  patchUserInfo: async ({
    nickname,
    baseballTeam,
  }: ChangeNicknameRequestDTO) => {
    return api
      .patch('mypage/user', { json: { baseballTeam, nickname } })
      .json<UserResponseDTO>()
  },
}
