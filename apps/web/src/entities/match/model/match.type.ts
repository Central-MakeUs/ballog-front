import { type ApiResponse } from '@/types/api/common'
import { type TeamKey } from '@/shared/constants/teams'
import type { StadiumKey } from '@/shared/constants/stadium'

export interface Match {
  matchesId: number
  matchesDate: string
  matchesTime: string
  homeTeam: TeamKey
  awayTeam: TeamKey
  stadium: StadiumKey
  matchesResult: string | null
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED' // 아직 쓰지 않으므로 일단 이렇게 둠
}

export type MacthResponseDTO = ApiResponse<Match[]>
export type MatchDateMap = Record<string, Match[]>
export type MatchByDateResponseDTO = ApiResponse<MatchDateMap>
