import { api } from '@/shared/lib/ky'

import type {
  MacthResponseDTO,
  MatchByDateResponseDTO,
} from '../model/match.type'

export const matchGet = {
  getTodayMatches: async (): Promise<MacthResponseDTO> => {
    const response = await api.get('match').json<MacthResponseDTO>()
    return response
  },
  getMatchByDate: async (date: string): Promise<MatchByDateResponseDTO> => {
    const response = await api
      .get('match/date', {
        searchParams: { matches_date: date },
      })
      .json<MatchByDateResponseDTO>()
    return response
  },
  getAllMatch: async (): Promise<MatchByDateResponseDTO> => {
    const response = await api.get('match/all').json<MatchByDateResponseDTO>()
    return response
  },
}
