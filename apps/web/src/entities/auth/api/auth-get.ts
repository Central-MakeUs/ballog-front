import { api } from '@/shared/lib/ky'

export const authGet = {
  // 닉네임 중복 체크
  getNickname: async (nickname: string) => {
    const response = await api.get(`/auth/nickname/${nickname}`)
    return response.json()
  },
}
