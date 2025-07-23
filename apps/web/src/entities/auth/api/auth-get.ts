import { api } from '@/shared/lib/ky'
import type { UserResponseDTO } from '@/entities/auth/model/auth.type'

export const authGet = {
  // 닉네임 중복 체크
  getNickname: async (nickname: string) => {
    const response = await api.get(`/auth/nickname/${nickname}`)
    return response.json()
  },
  getUser: async (): Promise<UserResponseDTO> => {
    const response = await api.get('mypage/user')
    return response.json()
  },
}
