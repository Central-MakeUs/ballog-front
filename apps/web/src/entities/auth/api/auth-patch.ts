import { api } from '@/shared/lib/ky'
import type {
  UserResponseDTO,
  ChangeNicknameRequestDTO,
  ChangeTeamRequestDTO,
} from '@/entities/auth/model/auth.type'

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
