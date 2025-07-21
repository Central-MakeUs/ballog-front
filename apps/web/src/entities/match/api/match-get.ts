import { api } from '@/shared/lib/ky'

import type { MacthResponseDTO } from '../model/match.type'

export const matchGet = {
  getTodayMatches: async (): Promise<MacthResponseDTO> => {
    const response = await api.get('match').json<MacthResponseDTO>()
    return response
  },
}
