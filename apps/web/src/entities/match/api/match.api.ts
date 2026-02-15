import { api } from '@/shared/lib/ky'

import type { MatchResponseDTO, MatchByDateResponseDTO } from '../model/match.type'

export const matchGet = {
  getTodayMatches: async (): Promise<MatchResponseDTO> => {
    const response = await api.get('match').json<MatchResponseDTO>()
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
