import { http, HttpResponse, delay } from 'msw'

import type { TeamRankListResponseDTO } from '@/entities/match/model/rank.type'
import { teamRanks } from '@/mocks/data/rank'

// 백엔드 GET 엔드포인트가 /api/v1/record/rank 에 존재 (MatchRecordController)
const RANK_API_URL = `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/record/rank`

export const rankHandlers = [
  http.get(RANK_API_URL, async () => {
    await delay(teamRanks.delay)

    return HttpResponse.json<TeamRankListResponseDTO>(teamRanks.data, {
      status: 200,
    })
  }),
]
