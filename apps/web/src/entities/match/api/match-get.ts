import { api } from '@/shared/lib/ky'
import type { MathResponseDTO } from '../model/match.type'

export const matchGet = {
  getTodayMatches: async (): Promise<MathResponseDTO> => {
    const response = await api.get('match').json<MathResponseDTO>()
    return response
  },
}
