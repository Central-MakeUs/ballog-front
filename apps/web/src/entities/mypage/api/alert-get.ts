import { api } from '@/shared/lib/ky'
import type { AlertResponseDTO } from '@/entities/mypage/model/alert.type'

export const alertGet = {
  getAlert: async (): Promise<AlertResponseDTO> => {
    const response = await api.get(`mypage/alert`).json<AlertResponseDTO>()
    return response
  },
}
