import type { TeamKey } from '@/shared/constants/teams'

export interface TeamRank {
  teamCode: TeamKey
  rank: number
  updatedAt: string
  // TODO: 백엔드 명세 나오면 수정
  emotion: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'
  emotionPercent: number | null
}

export type TeamRankListResponseDTO = TeamRank[]
