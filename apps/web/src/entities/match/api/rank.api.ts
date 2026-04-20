import { api } from '@/shared/lib/ky'

import type { TeamRankListResponseDTO } from '../model/rank.type'

export const rankGet = {
  getTeamRanks: async (): Promise<TeamRankListResponseDTO> => {
    const response = await api
      .get('record/rank')
      .json<TeamRankListResponseDTO>()
    return response
  },
}
