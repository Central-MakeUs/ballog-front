import { api } from '@/shared/lib/ky'
import type { MeResponseDTO } from '@/entities/auth/model/auth.type'

export const authGet = {
  // 닉네임 중복 체크
  getNickname: async (nickname: string) => {
    const response = await api.get(`/auth/nickname/${nickname}`)
    return response.json()
  },
  me: async (): Promise<MeResponseDTO> => {
    const response = await api.get('mypage/user')
    // console.log(response.json())
    return response.json()
  },
}
