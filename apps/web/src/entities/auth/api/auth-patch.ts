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

    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        eventName: 'SEND_IMAGE_ECHO',
        payload: 'response',
      }),
    )
    return response
  },
  patchUserTeam: async ({ baseballTeam }: ChangeTeamRequestDTO) => {
    const response = await api
      .patch('mypage/user', { json: { baseballTeam } })
      .json<UserResponseDTO>()

    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        eventName: 'SEND_IMAGE_ECHO',
        payload: 'response',
      }),
    )
    return response
  },
}
