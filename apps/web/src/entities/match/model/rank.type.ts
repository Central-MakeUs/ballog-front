import type { TeamKey } from '@/shared/constants/teams'

export interface TeamRank {
  teamCode: TeamKey
  rank: number
  updatedAt: string
}

export type TeamRankListResponseDTO = TeamRank[]
