import { api } from '@/shared/lib/ky'

export const mypage = {
  getMypage: async () => {
    const response = await api.get('/mypage')
    return response.json()
  },
}
