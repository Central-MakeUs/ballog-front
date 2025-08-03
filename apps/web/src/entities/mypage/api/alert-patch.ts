import { api } from '@/shared/lib/ky'

export const alertPatch = {
  patchAlert: async () => {
    const response = await api.patch('/mypage/alert')
    return response.json()
  },
}
