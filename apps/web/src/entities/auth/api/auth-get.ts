import { api } from '@/shared/lib/ky'
import type { MyPageResponseDTO } from '@/entities/auth/model/auth.type'

export const authGet = {
  // 닉네임 중복 체크
  getNickname: async (nickname: string) => {
    const response = await api.get(`/auth/nickname/${nickname}`)
    return response.json()
  },
  me: async (): Promise<MyPageResponseDTO> => {
    const response = await api.get('/api/v1/user/mypage')
    return response.json()
  },
}
