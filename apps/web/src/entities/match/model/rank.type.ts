import type { TeamKey } from '@/shared/constants/teams'

export interface TeamRank {
  teamCode: TeamKey
  rank: number
  updatedAt: string
  positiveRate: number
  negativeRate: number
}

export type TeamRankListResponseDTO = TeamRank[]
